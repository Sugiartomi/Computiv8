let { User } = require('../models')

class Controller {
    static login(req, res) {
        res.render('login')
    }

    static loginPost(req, res) {
        let input = req.body
        let role;
        User.findAll()
            .then(data => {
                data.forEach(e => {
                    if (e.email == input.email && e.password == input.password) {
                        role = e.role
                    }
                });

                if(!role) throw "input yang anda masukan salah"
                else res.redirect(`/${role}`)
            })
            .catch(err => res.send(err))
    }

    static owner(req, res) {
        res.send("holla, masuk sbg owner")
    }

    static cashier(req, res) {
        res.send("holla, masuk sebagai cashier")
    }

    static warehouse(req, res) {
        res.send("holla, masuk sebagai warehouse")
    }
}

module.exports = Controller