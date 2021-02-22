const { verifyJwt } = require('../helpers/jwt')

const authentication = (req, res, next) => {
    try {
        // req.headers access_token ini nanti di taruh di headers
        const decode = verifyJwt(req.headers.access_token);

        req.user = decode;

        next()
    } catch {
        res.status(401).json({ message: 'You need to login' })
    }
};

module.exports = { authentication };