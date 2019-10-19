const {check, validationResult} = require('express-validator');

module.exports = (req, res, next) => {
    check('name').
    next();
};


// const {validate, generateResponse} = require('../utils.validation');
// module.exports = (req, res, next) => {
//     let rules = [
//         {
//             field: 'name',
//             rules: 'required'
//         },
//         {
//             field: 'limit',
//             rules: 'required|numeric'
//         },
//     ];
//     let validationArray = validate(rules, req.body);
//     res.send(generateResponse(validationArray));
//
//     // let nameValidation = validate.required(req.body.name, 'name');
//     // let limitValidation = validate.required(req.body.name, 'name');
//     // if (nameValidation !== true) {
//     //     return res.status(422).send(nameValidation);
//     // }
//
//     next();
// };