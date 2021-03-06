const db = require("./db/models");
const { User } = db;

const loginUser = (req, res, user) => {
    req.session.auth = {
        userId: user.id
    }
    req.session.save(()=> res.redirect('/'));
};

const restoreUser = async (req, res, next) => {
    console.log("restoreUser fn", req.session);
    if (req.session.auth) {
        const { userId } = req.session.auth;
        try {
            const user = await User.findByPk(userId);
            if (user) {
                res.locals.authenticated = true;
                res.locals.user = user;
                next();
            }
        }
        catch (err) {
            res.locals.authenticated = false;
            next(err);
        }
    }
    else {
        res.locals.authetnticated = false;
        next();
    }
};

const userLogout = (req, res) => {
    delete req.session.auth;
    req.session.save(()=> res.redirect('/'));
};

const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.redirect('/users/login');
    }
    return next();
};

const checkPermissionsUsersRoute = (item, currentUser) => {
    if (item.id !== currentUser.id) {
        const err = new Error('You are not authorized to perform this operation.');
        err.status = 403;
        throw err;
    }
}

const checkPermissionsRecipesRoute = (item, currentUser) => {
    if (item.userId !== currentUser.id) {
        const err = new Error('You are not authorized to perform this operation.');
        err.status = 403;
        throw err;
    }
}

const checkPermissionsRoute = (item, currentUser) => {
    if (item.userId !== currentUser.id) {
        const err = new Error('You are not authorized to perform this operation.');
        err.status = 403;
        throw err;
    }
}

module.exports = {
    loginUser,
    restoreUser,
    userLogout,
    requireAuth,
    checkPermissionsUsersRoute,
    checkPermissionsRecipesRoute,
    checkPermissionsRoute
};
