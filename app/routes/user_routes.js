const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const sanitiser = require('../helpers/sanitise_inputs');
const authModel = require('../models/auth_model');
let userModel = require('../models/user_model');

module.exports = (router) => {
    router.use((req, res, next) => {
        authModel.check(req.headers['authorization'])
        .then(count => {
            if (count) {
                next();
            } else {
                res.send('Authentication Error. Please check your credentials');
            }
        })
        .catch(err => {
            res.send(err);
        });
    });

    router.route('/users')
    .get((req, res) => {
        userModel.find((err, users) => {
            if (err) throw err;
            res.json(users)
        });
    })
    .post(urlencodedParser, (req, res) => {
        userModel.create({
            email: req.body.email,
            givenName: req.body.givenName,
            familyName: req.body.familyName,
            created: new Date()
        }, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send('You successfuly added a user with id ' + data._id);
            }
        });
    })
    
    router.route('/users/:user_id')
    .delete((req, res, next) => {
        if (req.params.user_id) {
            userModel.findByIdAndDelete(req.params.user_id, (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send('Deleted document: ' + data);
                }
            });
        }else {
            res.send('Something went wrong. Please check did you send the right parameter');
        }
    })
    .put(urlencodedParser, (req, res, next) => {
        if (req.params.user_id) {
            userModel.findByIdAndUpdate(req.params.user_id, {
                givenName: req.body.givenName,
                familyName: req.body.familyName,
            }, (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send('User ' + data._id + ' updated successfully');
                }
                
            });
        } else {
            res.send('Something went wrong. Please check did you send the right parameter');
        }
    });
};
