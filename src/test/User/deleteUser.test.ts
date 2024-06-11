import request from 'supertest';
import { expect } from 'chai';
import sinon from 'sinon';
import app from '../../app.js';
import User from '../../models/User.js';

describe('Delete User Endpoint', function() {
  let findOneStub: sinon.SinonStub;
  let deleteOneStub: sinon.SinonStub;

  before(function() {
    // Mock User.findOne
    findOneStub = sinon.stub(User, 'findOne');
    // Mock User.deleteOne
    deleteOneStub = sinon.stub(User, 'deleteOne');
  });

  after(function() {
    // Restore original functionality
    findOneStub.restore();
    deleteOneStub.restore();
  });

  it('DELETE /api/users/:id should delete a user', function(done) {
    const mockUser = { _id: '60d21b4667d0d8992e610c85' };

    findOneStub.resolves(mockUser);
    deleteOneStub.resolves({ deletedCount: 1 });

    request(app)
      .delete('/api/users/663b39ee217ac819ffd25003')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'User and associated data deleted successfully');
        expect(findOneStub.calledOnceWith({ _id: '663b39ee217ac819ffd25003' })).to.be.true;
        expect(deleteOneStub.calledOnceWith({ _id: '663b39ee217ac819ffd25003' })).to.be.true;
        done();
      });
  });

  it('DELETE /api/users/:id should return 404 if user not found', function(done) {
    findOneStub.resolves(null);

    request(app)
      .delete('/api/users/60d21b4667d0d8992e610c85')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'User not found');
        expect(findOneStub.calledOnceWith({ _id: '663b39ee217ac819ffd25003' })).to.be.false;
        done();
      });
  });

  it('DELETE /api/users/:id should return 500 on server error', function(done) {
    findOneStub.throws(new Error('Server error'));

    request(app)
      .delete('/api/users/60d21b4667d0d8992e610c85')
      .expect('Content-Type', /json/)
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('error',"Server error");
        done();
      })
})

});
