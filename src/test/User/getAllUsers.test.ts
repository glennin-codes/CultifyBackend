import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import app from '../../app.js';
import User from '../../models/User.js';

describe('Get All Users Endpoint', function() {
  let findStub: sinon.SinonStub;

  before(function() {
    // Mock User.find
    findStub = sinon.stub(User, 'find');
  });

  after(function() {
    // Restore original functionality
    findStub.restore();
  });

  it('GET /api/users should return all users', function(done) {
    const mockUsers = [
      { _id: '60d21b4667d0d8992e610c85', name: 'User One', email: 'userone@example.com' },
      { _id: '60d21b4667d0d8992e610c86', name: 'User Two', email: 'usertwo@example.com' }
    ];

    findStub.resolves(mockUsers);

    request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(2);
        expect(res.body[0]).to.include({ name: 'User One', email: 'userone@example.com' });
        expect(res.body[1]).to.include({ name: 'User Two', email: 'usertwo@example.com' });
        done();
      });
  });

  it('GET /api/users should return 500 if there is a server error', function(done) {
    findStub.rejects(new Error('server error'));

    request(app)
      .get('/api/users')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'server error');
        done();
      });
  });
});
