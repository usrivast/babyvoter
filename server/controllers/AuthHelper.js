module.exports =
{
    ensureAuthorized: function (req, res, next)
    {
        var bearerToken;
        if (req) {
            if (req.path === '/authenticate') {
                next();
            } else {
                var bearerHeader = req.headers["authorization"];
                if (typeof bearerHeader !== 'undefined') {
                    var bearer = bearerHeader.split(" ");
                    bearerToken = bearer[1];
                    req.token = bearerToken;
                    next();
                } else {
                    res.status(401).send({ error: 'Something failed!' });
                }
            }
        }
    }

}