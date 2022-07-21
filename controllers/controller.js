let { User, Category, Product, Profile } = require('../models')

class Controller {
 static loginOwner(req, res) {
    res.render('loginOwner')
 }

 static loginOwnerPost(req,res) {
    let {email, password} = req.body
    User.findAll()
    .then(data => {
        data.forEach(el => {
            if(el.email == email && el.password == password){
                res.render('owner')
            } else throw "invalid email or password"
        });

    })
    .catch(err => res.send(err))
 }
}

module.exports = Controller