validate = (validationSchemes, requestData) => {
    return validationSchemes.map(validationScheme => {
        let rules = validationScheme.rules.split('|');
        return {
            [validationScheme.field]: rules.map(rule => {
                let isPassed;
                console.log(rule);
                switch (rule) {
                    case 'required':
                        isPassed = required(requestData[validationScheme.field]);
                        break;
                    case 'numeric':
                        isPassed = numeric(requestData[validationScheme.field]);
                        break;
                }
                return {[rule]: isPassed};
            })
        };
    });
};

generateResponse = (validationArray) => {
    validationArray.map(validationObject => {
    });
};

function required(value) {
    return value !== '' && value !== null && value !== undefined;
}

function numeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

// const validate = {
//     required(value, field) {
//         if (value !== '' && value !== null && value !== undefined) {
//             return true;
//         }
//         return {[field]: `${field} is required`};
//     }
// };


module.exports = {validate, generateResponse};