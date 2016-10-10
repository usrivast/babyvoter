/**
 * Created by nru278 on 9/11/16.
 */
module.exports = {
    '/api/vote': require('./controllers/VoteController'),
    '/api/user': require('./controllers/UserController'),
    '/api/me': require('./controllers/AuthController')
}
