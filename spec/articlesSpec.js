var client = require('../lib/client');
var article = require('../lib/client/articles');
var request = require('request');

describe('#articles', function() {
  var zendesk;
  var REMOTE_URI = 'https://remote.zendesk.com/api/v2';

  beforeEach(function() {
    if (!zendesk) {
      zendesk = client.createClient(
      {
        username:  'fake@email.com',
        token:     'fake-token-for-testing',
        remoteUri: REMOTE_URI
      });
    }
  });

  describe('#show', function() {
    it('Should call request with the expected values', function() {
      var args;
      spyOn(zendesk.articles, '_request');
      zendesk.articles.show(12345, function() {});

      args = zendesk.articles._request.mostRecentCall.args[0];
      expect(zendesk.articles._request).wasCalled();
      expect(args.uri).toBe(REMOTE_URI + '/help_center/articles/12345.json');
    });

    it('Should call request the correct values', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback();
      });

      zendesk.articles.show(12345, function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('GET');
        expect(args[1]).toEqual(['help_center', 'articles', 12345]);
      });
    });

    it('Should call the callback with error if there is a problem making the request', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback('Error');
      });

      zendesk.articles.show(12345, function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('GET');
        expect(args[1]).toEqual(['help_center', 'articles', 12345]);
        expect(err).toBe(err);
      });
    });
  });

  describe('#showTranslations', function() {
    it('Should call request with the expected values', function() {
      var args;
      spyOn(zendesk.articles, '_request');
      zendesk.articles.showTranslation(12345, 'en-us', function() {});

      args = zendesk.articles._request.mostRecentCall.args[0];
      expect(zendesk.articles._request).wasCalled();
      expect(args.uri).toBe(REMOTE_URI + '/help_center/articles/12345/translations/en-us.json');
    });

    it('Should call request with the correct values', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback();
      });

      zendesk.articles.showTranslation(12345, 'en-us', function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('GET');
        expect(args[1]).toEqual(['help_center', 'articles', 12345, 'translations', 'en-us']);
      });
    });

    it('Should call the callback with an error if the is a problem making the request', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback('Error');
      });

      zendesk.articles.showTranslation(12345, 'en-us', function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('GET');
        expect(args[1]).toEqual(['help_center', 'articles', 12345, 'translations', 'en-us']);
        expect(err).toBe(err);
      });
    });
  });

  describe('#list', function() {
    it('Should call request with the expected values', function() {
      var args;
      spyOn(zendesk.articles, '_request');
      zendesk.articles.list(function() {});

      args = zendesk.articles._request.mostRecentCall.args[0];
      expect(zendesk.articles._request).wasCalled();
      expect(args.uri).toBe(REMOTE_URI + '/help_center/articles.json');
    });

    it('Should call request the correct values', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback();
      });

      zendesk.articles.list(function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('GET');
        expect(args[1]).toEqual(['help_center', 'articles']);
      });
    });

    it('Should call the callback with error if there is a problem making the request', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback('Error');
      });

      zendesk.articles.list(function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('GET');
        expect(args[1]).toEqual(['help_center', 'articles']);
        expect(err).toBe(err);
      });
    });
  });

  describe('#listArticlesInSection', function() {
    it('Should call request with the expected values', function() {
      var args;
      spyOn(zendesk.articles, '_request');
      zendesk.articles.listArticlesInSection(3, function() {});

      args = zendesk.articles._request.mostRecentCall.args[0];
      expect(zendesk.articles._request).wasCalled();
      expect(args.uri).toBe(REMOTE_URI + '/help_center/sections/3/articles.json');
    });

    it('Should call request the correct values', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback();
      });

      zendesk.articles.listArticlesInSection(3, function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('GET');
        expect(args[1]).toEqual(['help_center', 'sections', 3, 'articles']);
      });
    });

    it('Should call the callback with error if there is a problem making the request', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback('Error');
      });

      zendesk.articles.listArticlesInSection(3, function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('GET');
        expect(args[1]).toEqual(['help_center', 'sections', 3, 'articles']);
        expect(err).toBe(err);
      });
    });
  });

  describe('#listArticlesForAgent', function() {

    it('Should call request with the expected values', function() {
      var args;
      spyOn(zendesk.articles, '_request');
      zendesk.articles.listArticlesForAgent(3, function() {});

      args = zendesk.articles._request.mostRecentCall.args[0];
      expect(zendesk.articles._request).wasCalled();
      expect(args.uri).toBe(REMOTE_URI + '/help_center/users/3/articles.json');
    });

    it('Should call request with the correct values', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback();
      });

      zendesk.articles.listArticlesForAgent(3, function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('GET');
        expect(args[1]).toEqual(['help_center', 'users', 3, 'articles']);
      });
    });

    it('Should call the callback with error if there is a problem making the request', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback('Error');
      });

      zendesk.articles.listArticlesForAgent(3, function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('GET');
        expect(args[1]).toEqual(['help_center', 'users', 3, 'articles']);
        expect(err).toBe(err);
      });
    });
  });

  describe('#search', function() {

    it('Should call request with the expected values', function() {
      var args;
      spyOn(zendesk.articles, '_request');
      zendesk.articles.search('bodhi tree', function() {});

      args = zendesk.articles._request.mostRecentCall.args[0];
      expect(zendesk.articles._request).wasCalled();
      expect(args.uri).toBe(REMOTE_URI + '/help_center/articles/search.json?query=bodhi%20tree');
    });

    it('Should call request with the correct values', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback();
      });

      zendesk.articles.search('bodhi tree', function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('GET');
        expect(args[1]).toEqual(['help_center', 'articles', 'search', {query: 'bodhi tree'}]);
      });
    });

    it('Should call the callback with error if there is a problem making the request', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback('Error');
      });

      zendesk.articles.search('bodhi tree', function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('GET');
        expect(args[1]).toEqual(['help_center', 'articles', 'search', {query: 'bodhi tree'}]);
        expect(err).toBe(err);
      });
    });
  });

  describe('#delete', function() {

    it('Should call request with the expected values', function() {
      var args;
      spyOn(zendesk.articles, '_request');
      zendesk.articles.delete(12345, function() {});

      args = zendesk.articles._request.mostRecentCall.args[0];
      expect(zendesk.articles._request).wasCalled();
      expect(args.uri).toBe(REMOTE_URI + '/help_center/articles/12345.json');
    });

    it('Should call request with the correct values', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback();
      });

      zendesk.articles.delete(12345, function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('DELETE');
        expect(args[1]).toEqual(['help_center', 'articles', 12345]);
      });
    });

    it('Should call the callback with error if there is a problem making the request', function() {
      spyOn(zendesk.articles, 'request').andCallFake(function(type, uri, callback) {
        callback('Error');
      });

      zendesk.articles.delete(12345, function(err, status, data) {
        var args = zendesk.articles.request.mostRecentCall.args;
        expect(zendesk.articles.request).wasCalled();
        expect(args[0]).toBe('DELETE');
        expect(args[1]).toEqual(['help_center', 'articles', 12345]);
        expect(err).toBe(err);
      });
    });
  });
});
