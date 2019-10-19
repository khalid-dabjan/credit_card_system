process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Card = require('../models/Card');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
chai.use(chaiHttp);
describe('Cards', () => {

    beforeEach((done) => { //Before each test we empty the database
        Card.remove({}, (err) => {
            done();
        });
    });

    it('it should GET all the books', (done) => {
        chai.request(app)
            .get('/api/cards')
            .end((err, res) => {
                res.should.have.status(200);
                done();
                // res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
                // done();
            });
    });
});