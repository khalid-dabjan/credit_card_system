const {check, validationResult} = require('express-validator');
const Card = require('../models/Card');


module.exports = app => {
    app.get('/api/cards', async (req, res) => {
        const cards = await Card.find();

        res.send(cards);
    });

    app.post('/api/cards', [
        check('name').isLength({min: 1}).withMessage('Name is required'),
        check('cardNumber').isNumeric().withMessage('Card number must be a number'),
        check('cardNumber').custom(value => { //Luhn check
            let length = value.length;
            let isEven = length % 2;
            let sum = 0;
            for (let i = length - 1; i >= 0; i--) {
                let currentDigit = parseInt(value[i]);
                if (i % 2 == isEven) {
                    currentDigit *= 2
                }
                if (currentDigit > 9) {
                    currentDigit -= 9
                }
                sum += currentDigit;
            }
            return sum % 10 === 0;
        }).withMessage('Card number is not a valid credit card number'),
        check('limit').isNumeric().withMessage('Limit must be a number')
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        const {name, cardNumber, limit} = req.body;

        const card = new Card({
            name,
            cardNumber,
            limit,
        });

        try {
            await card.save();

            res.send(card);
        } catch (err) {
            res.status(500).send(err);
        }
    });
};