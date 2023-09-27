const failCodes = {
  400: 'Bad Request',
  401: 'Not Authorized',
  403: 'Forbidden',
  404: 'Item not found',
  405: 'Method not Allowed',
  409: 'Conflict',
  422: 'Unprocessable Entity', // Zendesk sends this one back when you re-use an organization name
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
};

/**
 * Flattens a nested array to a single-level array.
 *
 * @param {Array} array - The array to be flattened.
 * @returns {Array} - A new array containing all elements from the input array,
 *                   with any nested arrays recursively flattened to a single level.
 */
function flatten(array) {
  // eslint-disable-next-line unicorn/no-array-reduce
  return array.reduce(
    (acc, element) =>
      // eslint-disable-next-line unicorn/prefer-spread
      acc.concat(Array.isArray(element) ? flatten(element) : element),
    [],
  );
}

/**
 * Populates specified fields in the given data records using response data based on a mapping.
 *
 * @param {Object|Array} data - The data record(s) to be populated.
 * @param {Object} response - The response data containing datasets.
 * @param {Array} map - An array of mapping objects specifying how to populate fields.
 * @returns {Object|Array} - The data record(s) with populated fields.
 */
function populateFields(data, response, map) {
  const datasetCache = new Map();

  const findAllRecordsById = (data, key, id) =>
    data.filter((datum) => datum[key] === id);

  const findOneRecordById = (data, key, id) =>
    data.find((datum) => datum[key] === id) || null;

  const populateRecord = (record) => {
    for (const {field, name, dataset, all, dataKey, array} of map) {
      if (Object.hasOwnProperty.call(record, field)) {
        const responseDataset = datasetCache.get(dataset) || response[dataset];
        datasetCache.set(dataset, responseDataset);

        if (responseDataset) {
          const key = dataKey || 'id';
          record[name] = all
            ? responseDataset
            : array
            ? findAllRecordsById(responseDataset, key, record[field])
            : findOneRecordById(responseDataset, key, record[field]);
        }
      }
    }
  };

  if (Array.isArray(data)) {
    for (const record of data) populateRecord(record);
  } else {
    populateRecord(data);
  }

  return data;
}

/**
 * Constructs a URL based on the provided `method`, `uri`, and pre-defined settings within the context.
 *
 * The function prioritizes query parameters from `self.options.get('query')` over other sources.
 * If `uri` is an array, the last element can be an object representing query parameters or a query string.
 * If the `uri` is a string, it's treated as the URL's endpoint path.
 *
 * The function also utilizes `self.sideLoad` to include side-loaded resources if available.
 * Any conflict in query parameters is resolved with `query` taking the highest priority, followed by `sideLoad`, and then the provided `uri`.
 *
 * @param {Object} self - The context containing options and side-loading settings.
 *   @property {Map} options - A map-like object with settings. Specifically used to retrieve 'endpointUri' and 'query'.
 *   @property {Array<string>} [sideLoad] - An array of resources to side-load. It gets converted into a query parameter format.
 *
 * @param {string} method - The HTTP method. Can be "GET", "PATCH", "POST", "PUT", or "DELETE".
 * @param {Array<string|Object>} [uri] - An array representing the URL segments. The last element can be an object of query parameters or a query string.
 * @returns {string} The assembled URL.
 *
 * @example
 * const context = {
 *   options: new Map([['endpointUri', 'http://api.example.com'], ['query', { page: { size: 100 } }]]),
 *   sideLoad: ['comments', 'likes']
 * };
 * assembleUrl(context, 'GET', ['users', 'list', '?foo=bar']);
 * // Expected: "http://api.example.com/users/list.json?foo=bar&include=comments,likes&page[size]=100"
 *
 * @throws Will throw an error if `self.options` does not implement the 'get' method.
 */
function assembleUrl(self, method, uri) {
  // Helper functions
  const isObject = (value) =>
    typeof value === 'object' && !Array.isArray(value);

  const mergeQueryParameters = (baseParameters, ...additionalParameters) => {
    const merged = new URLSearchParams(baseParameters);
    for (const parameters of additionalParameters) {
      const temporary = new URLSearchParams(parameters);
      for (const [key, value] of temporary.entries()) {
        merged.set(key, value); // Overwrite if key exists
      }
    }

    return merged.toString();
  };

  // Base information
  const endpointUri = self.options.get('endpointUri');
  const sideLoadParameter =
    self.sideLoad?.length > 0 ? `include=${self.sideLoad.join(',')}` : '';
  const defaultQueryParameters = serialize(self.options.get('query') || {});

  // Process uri
  let segments = [];
  let queryString = '';

  if (Array.isArray(uri)) {
    const lastElement = uri.pop();

    if (isObject(lastElement)) {
      queryString = serialize(lastElement);
    } else if (typeof lastElement === 'string' && lastElement.startsWith('?')) {
      queryString = lastElement.slice(1);
    } else if (lastElement !== undefined && lastElement !== '') {
      uri.push(lastElement); // Check for undefined and empty strings
    }

    segments = uri;
  } else if (typeof uri === 'string') {
    if (uri.includes(endpointUri)) {
      return uri; // Return the uri unchanged if it already contains endpointUri
    }

    segments = [uri];
  }

  let paginationParameters = '';

  if (
    method === 'GET' &&
    self.endpointChecker.supportsCursorPagination(segments.join('/'))
  ) {
    paginationParameters = serialize({page: {size: 100}});
  }

  queryString = mergeQueryParameters(
    queryString,
    paginationParameters,
    sideLoadParameter,
    defaultQueryParameters,
  );

  // Construct the URL
  const basePath = `${endpointUri}/${segments
    .filter((segment) => segment !== undefined && segment !== '')
    .join('/')}.json`;
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Serializes a JavaScript object into a query string format.
 *
 * Supports nested objects and arrays:
 * - For non-object values, it encodes them with the provided prefix.
 * - For array values, it encodes them as comma-separated lists without indexing.
 * - For objects, it recursively encodes each nested key-value pair using a bracket notation.
 *
 * @example
 * serialize({ a: 1 })                // "a=1"
 * serialize({ a: { b: 2 } })        // "a[b]=2"
 * serialize({ ids: [1,2,3,4] })     // "ids=1,2,3,4"
 * serialize('test', 'key')          // "key=test"
 *
 * @param {Object|string|number} object - The object to serialize.
 * @param {string} [prefix=''] - The prefix for the current serialization level. Useful for handling nested objects.
 * @returns {string} The serialized query string.
 */
const serialize = (object, prefix = '') => {
  // Base condition: non-object values
  if (object === null || typeof object !== 'object') {
    return `${encodeURIComponent(prefix)}=${encodeURIComponent(object)}`;
  }

  // Handle arrays differently: join with commas
  if (Array.isArray(object)) {
    return `${encodeURIComponent(prefix)}=${encodeURIComponent(
      object.join(','),
    )}`;
  }

  // Recursive serialization for object values
  return Object.entries(object)
    .map(([key, value]) => {
      // Construct the nested key structure
      const nestedKey = prefix ? `${prefix}[${key}]` : key;
      return serialize(value, nestedKey);
    })
    .join('&');
};

function createError(message, statusCode, result = null) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.result = result;
  return error;
}

function checkRequestResponse(response, result) {
  if (!result) {
    return createError('Zendesk returned an empty result', 204);
  }

  // The following occurs on delete requests
  if (
    response.status === 204 &&
    (response.statusText ?? 'No Content') === 'No Content'
  ) {
    return createError('No Content', response.status);
  }

  let statusCode;
  try {
    statusCode = response.status;
  } catch (error) {
    return {
      exception: error,
      code: statusCode,
      result,
    };
  }

  const retryAfter = response.headers.get('retry-after');
  if (retryAfter) {
    return createError(
      'Zendesk rate limits 200 requests per minute',
      429,
      result,
    );
  }

  const failMessage = failCodes[statusCode];
  if (failMessage) {
    throw createError(
      `Zendesk Error (${statusCode}): ${failMessage}`,
      statusCode,
      result,
    );
  }

  return result;
}

function findBody(result_, self) {
  if (!result_) {
    return '';
  }

  if (self.jsonAPINames) {
    const apiName = self.jsonAPINames.find((api) =>
      Object.hasOwnProperty.call(result_, api),
    );
    if (apiName) {
      return result_[apiName];
    }
  }

  return result_;
}

function processResponseBody(result_, self) {
  let body = findBody(result_, self);

  if (self.sideLoadMap) {
    body = populateFields(body, result_, self.sideLoadMap);
  }

  return body;
}

function generateUserAgent() {
  const {version} = require('../../package.json');
  return `node-zendesk/${version} (node/${
    require('node:process').versions.node
  })`;
}

module.exports = {
  flatten,
  assembleUrl,
  checkRequestResponse,
  processResponseBody,
  generateUserAgent,
};
