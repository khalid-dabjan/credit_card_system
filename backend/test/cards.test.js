process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Card = require('../models/Card');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);
describe('Cards', () => {

    beforeEach((done) => { //Before each test we empty the database
        Card.remove({}, (err) => {
            done();
        });
    });

    it('it should GET all the cards', (done) => {
        chai.request(app)
            .get('/api/cards')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });

    it('it should creat a cards', (done) => {
        chai.request(app)
            .post('/api/cards')
            .set('content-type', 'application/json')
            .send({
                name: 'Test Card',
                cardNumber: '12345674',
                limit: 5
            }).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');

            // verify one card is indeed created
            chai.request(app)
                .get('/api/cards')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });

        });
    });

    it('it passes Luhn 10 check', (done) => {
        let validCardNumber = '12345674';
        let invalidCardNumber = '4344564533';
        chai.request(app)
            .post('/api/cards')
            .set('content-type', 'application/json')
            .send({
                name: 'Test Card invalid number',
                cardNumber: invalidCardNumber,
                limit: 5
            }).end((err, res) => {
            res.should.have.status(422);
            chai.request(app)
                .post('/api/cards')
                .set('content-type', 'application/json')
                .send({
                    name: 'Test Card invalid number',
                    cardNumber: validCardNumber,
                    limit: 5
                }).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

    });


    it('it stores the balance as 0 by default', (done) => {
        chai.request(app)
            .post('/api/cards')
            .set('content-type', 'application/json')
            .send({
                name: 'Test Card invalid number',
                cardNumber: '12345674',
                limit: 5
            }).end(() => {
            chai.request(app)
                .get('/api/cards')
                .end((err, res) => {
                    expect(res.body[0].balance).to.equal(0);
                    done();
                });
        });
    });
});