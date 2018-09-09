function validateEmail(val) {
    let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regExp.test(val);
}

function checkExistence(params) {
    if (params && Object.prototype.toString.call(params).indexOf('Array') > -1) {
        for (let i = 0, len = params.length; i < len; i++) {
            const element = params[i];            
            if (typeof element === 'undefined') {
                return false
            }
        }
        return true;
    }
    return false;
}

module.exports = {
    email: validateEmail,
    exists: checkExistence
};