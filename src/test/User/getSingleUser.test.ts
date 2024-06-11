import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import app from '../../app.js';
import User from '../../models/User.js';

describe('Get Single User Endpoint', function() {
  let findOneStub: sinon.SinonStub;
  let findByIdStub: sinon.SinonStub;

  before(function() {
    // Mock User.findOne and User.findById
    findOneStub = sinon.stub(User, 'findOne');
    findByIdStub = sinon.stub(User, 'findById');
  });

  after(function() {
    // Restore original functionality
    findOneStub.restore();
    findByIdStub.restore();
  });

  it('GET /api/users/:id should return a user by ID', function(done) {
    const mockUser = { _id: '60d21b4667d0d8992e610c85', name: 'User One', email: 'userone@example.com' };

    findByIdStub.resolves(mockUser);

    request(app)
      .get('/api/users/60d21b4667d0d8992e610c85')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.include({ name: 'User One', email: 'userone@example.com' });
        done();
      });
  });

  it('GET /api/users/:id should return a user by email', function(done) {
    const mockUser = { _id: '60d21b4667d0d8992e610c85', name: 'User One', email: 'userone@example.com' };

    findOneStub.resolves(mockUser);

    request(app)
      .get('/api/users/userone@example.com')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.include({ name: 'User One', email: 'userone@example.com' });
        done();
      });
  });

  it('GET /api/users/:id should return 404 if user not found by ID', function(done) {
    findByIdStub.resolves(null);

    request(app)
      .get('/api/users/60d21b4667d0d8992e610c85')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'User not found');
        done();
      });
  });

  it('GET /api/users/:id should return 404 if user not found by email', function(done) {
    findOneStub.resolves(null);

    request(app)
      .get('/api/users/nonexistent@example.com')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'User not found');
        done();
      });
  });

  it('GET /api/users/:id should return 500 if there is a server error', function(done) {
    findByIdStub.rejects(new Error('server error'));

    request(app)
      .get('/api/users/60d21b4667d0d8992e610c85')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'server error');
        done();
      });
  });
});
