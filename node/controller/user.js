/**
 * Created by ParkJunHo on 19/05/2017.
 */

exports.createUser = (req, res) =>{
    // send to DataBase
    res.send('created user');
};

exports.readUser = (req, res) =>{
    res.send('read user');
};

exports.updateUser = (req, res) =>{
    res.send('updated user');
};

exports.deleteUser = (req, res) =>{
    res.send('deleted user');
};