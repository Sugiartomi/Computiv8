let { User, Category, Item } = require('../models')

class Controller {
    static login(req, res) {
        res.render('login')
    }
    static loginPost(req, res) {
        let input = req.body
        let role;
        let id
        User.findAll()
            .then(data => {
                data.forEach(e => {
                    if (e.email == input.email && e.password == input.password) {
                        role = e.role
                        id = e.id
                    }
                });

                if(!role) throw "input yang anda masukan salah"
                else res.redirect(`/${role}/${id}`)
            })
            .catch(err => res.send(err))
    }



    static owner(req, res) {
        res.send("holla, masuk sbg owner")
    }


    static cashier(req, res) {
        let foundId = req.params.id
        let cashier;
        User.findAll({where : {id : foundId}})
        .then(data => {
            cashier = data
            return Item.findAll()
        })
        .then(item => res.render('store',{item, cashier}))
        .catch(err => res.send(err))
    }
    static detailItem(req, res){
        let cashierId = req.params.cashierId
        let itemId = req.params.itemId

        Item.findOne({where : {id : itemId }})
        .then(data => res.render('detailItem', { data, cashierId }))
        .catch(err => res.send(err))
    }


    static warehouse(req, res) {
        res.send("holla, masuk sebagai warehouse")
    }
}

module.exports = Controller