/**
 * Created by ParkJunHo on 19/05/2017.
 */

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

/**
 * 비밀번호를 통해 인증하는 방법
 * Access Token 으로 인증하는 방법
 * 오늘은 비밀번호로 인증해본다
 */

passport.use(new BasicStrategy(
    (id, pwd, callback) => {
    // access DB, get id, pwd and check
        if(id === 'admin' && pwd === '1234'){
            callback(null, id);
        } else {
            callback(null, false);
        }
    }
));

exports.isBasicAuthenticated = passport.authenticate('basic', {session: false})