// Votes.js: Client for the zendesk help center API.
const {Client} = require('../client');
const {ApiTypes} = require('../../constants');

class Votes extends Client {
  constructor(options) {
    super(options, ApiTypes.helpcenter);
    this.jsonAPINames = ['votes', 'vote'];
  }

  // Listing Votes By User
  async listByUser(userID) {
    return this.get(['users', userID, 'votes']);
  }

  // Listing Votes By Article
  async listByArticle(articleID) {
    return this.get(['articles', articleID, 'votes']);
  }

  // Viewing Votes
  async show(voteID) {
    return this.get(['votes', voteID]);
  }

  // Vote Up For Article
  async createUpVoteForArticle(articleID) {
    return this.post(['articles', articleID, 'up']);
  }

  // Vote Down For Article
  async createDownVoteForArticle(articleID) {
    return this.post(['articles', articleID, 'down']);
  }

  // Vote Up For Question
  async createUpVoteForQuestion(questionID) {
    return this.post(['questions', questionID, 'up']);
  }

  // Vote Down For Question
  async createDownVoteForQuestion(questionID) {
    return this.post(['questions', questionID, 'down']);
  }

  // Vote Up For Answer
  async createUpVoteForAnswer(answerID) {
    return this.post(['answers', answerID, 'up']);
  }

  // Vote Down For Answer
  async createDownVoteForAnswer(answerID) {
    return this.post(['answers', answerID, 'down']);
  }

  // Deleting Votes
  async delete(voteID) {
    return super.delete(['votes', voteID]);
  }
}

exports.Votes = Votes;
