import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import app from '../app.js';
import User from '../models/User.js';

describe('Prediction Endpoint', function() {
  let userStub: sinon.SinonStub;

  before(function() {
    // Mock User.findById
    userStub = sinon.stub(User, 'findById');
  });

  after(function() {
    // Restore original functionality
    userStub.restore();
  });

  it('PATCH /api/predict/:id should save prediction', function(done) {
    const mockUser = {
      _id: '60d21b4667d0d8992e610c85',
      predictions: [],
      save: sinon.stub().resolves()
    };

    userStub.resolves(mockUser);

    request(app)
      .patch('/api/predict/60d21b4667d0d8992e610c85')
      .send({ diseaseName: 'Tomato Blight' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'saved successfuly');
        expect(mockUser.save.calledOnce).to.be.true;
        expect(mockUser.predictions).to.have.lengthOf(1);
        expect(mockUser.predictions[0]).to.include({ diseaseName: 'Tomato Blight' });
        done();
      });
  });

  it('PATCH /api/predict/:id should return 404 if user not found', function(done) {
    userStub.resolves(null);

    request(app)
      .patch('/api/predict/60d21b4667d0d8992e610c85')
      .send({ diseaseName: 'Tomato Blight' })
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'user not found');
        done();
      });
  });
});
