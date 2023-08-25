// Votes.js: Client for the zendesk help center API.
const {Client} = require('../client');

class Votes extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['votes', 'vote'];
  }

  // Listing Votes By User
  listByUser(userID, cb) {
    return this.get(['users', userID, 'votes'], cb);
  }

  // Listing Votes By Article
  listByArticle(articleID, cb) {
    return this.get(['articles', articleID, 'votes'], cb);
  }

  // Viewing Votes
  show(voteID, cb) {
    return this.get(['votes', voteID], cb);
  }

  // Vote Up For Article
  createUpVoteForArticle(articleID, cb) {
    return this.post(['articles', articleID, 'up'], cb);
  }

  // Vote Down For Article
  createDownVoteForArticle(articleID, cb) {
    return this.post(['articles', articleID, 'down'], cb);
  }

  // Vote Up For Question
  createUpVoteForQuestion(questionID, cb) {
    return this.post(['questions', questionID, 'up'], cb);
  }

  // Vote Down For Question
  createDownVoteForQuestion(questionID, cb) {
    return this.post(['questions', questionID, 'down'], cb);
  }

  // Vote Up For Answer
  createUpVoteForAnswer(answerID, cb) {
    return this.post(['answers', answerID, 'up'], cb);
  }

  // Vote Down For Answer
  createDownVoteForAnswer(answerID, cb) {
    return this.post(['answers', answerID, 'down'], cb);
  }

  // Deleting Votes
  delete(voteID, cb) {
    return this.delete(['votes', voteID], cb);
  }
}

exports.Votes = Votes;
