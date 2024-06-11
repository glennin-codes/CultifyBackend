import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js'; // Adjust the path as necessary

describe('Auth Endpoints', function() {
    // it('POST /api/auth/signup should register a user', function(done) {
    //     request(app)
    //         .post('/api/auth/signup')
    //         .send({ firstName:"james",lastName:"simpson", email:"glennin2002@gmail.com", phoneNumber:"+254713322025", password: 'password123' })
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) return done(err);
    //             expect(res.body).to.have.property('message', 'verification sent');
    //             done();
    //         });
    // });

    it('POST /api/auth/login should log in a user', function(done) {
        request(app)
            .post('/api/auth/login')
            .send({ email: 'omare@students.uonbi.ac.ke', password: '123456' })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body).to.have.property('token');
                done();
            });
    });

  
});
