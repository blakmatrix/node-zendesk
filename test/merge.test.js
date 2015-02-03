

describe('Zendesk tests', function(){

	
	var client;
	before(function(){
		var config = require('./config');
		client = require('./../lib/client').createClient({
	        username:  config.username,
	        token:     config.token,
	        remoteUri: config.remoteUri
    	});
	});

	describe('#mergeTickets', function(){

        it('Should insert a new ticket into zendesk', function(done){
            this.timeout(14000);
            var mergedTicket = {
            	'ids' : [1533],
            	"target_comment": "Closing in favor of #1541",
				"source_comment": "Combining with #1533"
            }
            client.tickets.merge(1541, mergedTicket,function(err, req, response){
            	if (err) {
            		console.log(err);
            		done(err);
            	}
            	else {
            		console.log(response);
            		done();
            	}
            });
        });
    });

});