var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);


describe('Api', function() {
  it('should list all github repos on /api/1.0/github/repo GET', function(done) {
	  chai.request(server)
	    .get('/api/1.0/github/repo')
	    .end(function(err, res){
	      expect(res).to.have.status(200);
	      expect(res).to.be.json;
	      expect(res.body).to.be.a('array');
	      done();
	    });
	});
  it('should list 3 github repos on /api/1.0/github/repo?limit=3 GET', function(done) {
	  chai.request(server)
	    .get('/api/1.0/github/repo?limit=3')
	    .end(function(err, res){
	      expect(res).to.have.status(200);
	      expect(res).to.be.json;
	      expect(res.body).to.be.a('array');
	      expect(res.body.length).to.equal(3);
	      done();
	    });
	});
  it('should list 1 github repos on /api/1.0/github/repo?limit=1 GET', function(done) {
	  chai.request(server)
	    .get('/api/1.0/github/repo?limit=1')
	    .end(function(err, res){
	      expect(res).to.have.status(200);
	      expect(res).to.be.json;
	      expect(res.body).to.be.a('array');
	      expect(res.body.length).to.equal(1);
	      done();
	    });
	});
  it('should list my profile infos on /api/1.0/treehouse/profile GET', function(done) {
	  chai.request(server)
	    .get('/api/1.0/treehouse/profile')
	    .end(function(err, res){
	      expect(res).to.have.status(200);
	      expect(res).to.be.json;
	      expect(res.body).to.be.a('object');
	      expect(res.body).to.have.property('name');
	      done();
	    });
	});
  it('should send an email on /api/1.0/email/send', function(done) {
	  chai.request(server)
	    .post('/api/1.0/email/send')
	    .end(function(err, res){
	      expect(res).to.have.status(200);
	      done();
	    });
	});
});
