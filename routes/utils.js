const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => {
    return (res, req, next) => {
        return handler(res, req, next).catch(next);
    }
};

module.exports = {
    csrfProtection,
    asyncHandler
}
