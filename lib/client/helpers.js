/* eslint-disable max-params */
/**
 * Continuously checks the status of a job using intervals and invokes a callback when the job status changes.
 *
 * @param {Object} options - Options object.
 * @param {string} options.stores.defaults.store - The store to use.
 * @param {string} jobID - The ID of the job to monitor.
 * @param {number} [interval=500] - The interval in milliseconds at which to check the job status.
 * @param {number} [maxAttempts=5] - The maximum number of attempts to check the job status.
 * @param {function(Error, Object, Object): void} cb - Callback function to be invoked when the job status changes.
 */
function getJobStatuses(options, jobID, interval, maxAttempts, cb) {
  let attempts = 0;
  const client = require('../client').createClient(
    options.stores.defaults.store,
  );
  // Interval handle
  const nIntervId = setInterval(() => getJobStatus(jobID), interval || 500);

  function getJobStatus(id) {
    client.jobstatuses.show(id, function (error, request, result) {
      if (error && error.statusCode === 404 && attempts < (maxAttempts || 5)) {
        ++attempts;
        console.log('Waiting for job to become available...[' + attempts + ']');
      } else {
        if (error) {
          clearInterval(nIntervId);
          return cb(error);
        } // Error

        if (
          result.job_status.status === 'completed' ||
          result.job_status.status === 'failed' ||
          result.job_status.status === 'killed'
        ) {
          stopGetJobStatus();
          console.log('Job ' + id + ' completed!');
          return cb(null, request, result);
        }

        console.log(
          'Job prgress: ' +
            result.job_status.progress +
            ' out of ' +
            result.job_status.total,
        );
      }
    });
  }

  function stopGetJobStatus() {
    clearInterval(nIntervId);
  }
}

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

function assembleUrl(self, uri) {
  const isObject = (value) =>
    typeof value === 'object' && !Array.isArray(value);
  const isQueryString = (value) =>
    typeof value === 'string' && value.startsWith('?');

  const remoteUri = self.options.get('remoteUri');
  const sideLoadParameter =
    self.sideLoad.length > 0 ? `include=${self.sideLoad.join(',')}` : '';

  const buildUrl = (base, segments, queryParameters = '') => {
    const joinedSegments = segments.join('/');
    return `${base}/${joinedSegments}.json${queryParameters}`;
  };

  if (Array.isArray(uri)) {
    const lastElement = uri.pop();

    if (lastElement) {
      if (isObject(lastElement)) {
        lastElement.include = sideLoadParameter;
        return buildUrl(
          remoteUri,
          uri,
          '?' + new URLSearchParams(lastElement).toString(),
        );
      }

      if (isQueryString(lastElement)) {
        const queryParameters = sideLoadParameter
          ? `${lastElement}&${sideLoadParameter}`
          : lastElement;
        return buildUrl(remoteUri, uri, queryParameters);
      }

      uri.push(lastElement);
    }

    return buildUrl(remoteUri, uri);
  }

  if (typeof uri === 'string' && !uri.includes(remoteUri)) {
    return buildUrl(remoteUri, [uri]);
  }

  return uri;
}

module.exports = {
  flatten,
  populateFields,
  getJobStatuses,
  assembleUrl,
};
