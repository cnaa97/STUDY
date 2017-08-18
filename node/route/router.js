/**
 * Created by ParkJunHo on 19/05/2017.
 */

const express = require('express');
const route = express.Router();

const user = require('../controller/user');
const auth = require('../auth/auth');

// route.get('/user', (err, res) =>{
//     res.send('confirm');
// });
// 더 깔끔하게
route.route('/user')
    .post(user.createUser)
    .get(auth.isBasicAuthenticated, user.readUser) // 요청하기 전 인증, 데이터를 해킹 당하는 경우가 있음
    .put(auth.isBasicAuthenticated, user.updateUser)
    .delete(auth.isBasicAuthenticated, user.deleteUser);

route.route('/test')
    .get((req, res)=>{
        console.log(req.query);
        res.send('confirm')
    })
    .post((req, res)=>{
        console.log(req.body);
        res.send('method - POST');
    });


module.exports = route;