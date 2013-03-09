//
// ### function defaultUser (appName)
// #### @appName {String} App name
//
// A helper to prepend a default username.
// needs 'this' to be able to options.get('username').
//
exports.defaultUser = function (appName) {
  if (appName.search('/') === -1) {
    appName = this.options.get('username') + '/' + appName;
  }

  return appName;
};

exports.getJobStatuses = function(options, jobID, interval, maxAttempts, cb) {
  var nIntervId, // Interval handle
      attempts = 0,
      client = require('../client').createClient(options);
  nIntervId = setInterval(function getJobStatusUntilComplete() { getJobStatus(jobID); },( interval||500));


  function getJobStatus(id) {
    client.jobstatuses.show(id, function(err, req, result) {
      if(err && err.statusCode === 404 && attempts < (maxAttempts || 5)){
        ++attempts;
        console.log("Waiting for job to become available...["+attempts+"]");
      } else {
        if(err){clearInterval(nIntervId); return cb(err);}// Error

        if(result["job_status"].status === "completed"){
          stopGetJobStatus();
          console.log('Job '+id+' completed!');
          return cb(null, req, result);
        } else {
          console.log('Job prgress: ' + result["job_status"].progress + ' out of ' + result["job_status"].total);
        }
      }
    });
  }
  function stopGetJobStatus() {
    clearInterval(nIntervId);
  }
};