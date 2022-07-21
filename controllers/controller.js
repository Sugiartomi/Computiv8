let { User, Category, Product, Profile, Cart } = require('../models')

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
                res.render('home')
            } else throw "invalid email or password"
        });
    })
    .catch(err => res.send(err))
 }

 // =======================================================

 static home(req,res){
    res.render('home')
 }


    // ==================CASHIER=======================

    static products(req, res) {
        let data;
        Product.findAll()
            .then(temp => {
                data = temp
                return Cart.findAll()
            })
            .then(result => {
                let total = result.length
                res.render('products', { data, total })
            })
            .catch(err => res.send(err))
    }
    static productDetail(req, res) {
        Product.findOne({ where: { id: req.params.id }, include: Category })
            .then(data => res.render('detail', { data }))
            .catch(err => res.send(err))
    }
    static buyProduct(req, res) {
        let foundId = req.params.id
        Product.findOne({ where: { id: foundId } })
            .then(data => {
                let { id, name, price } = data
                return Cart.create({ ProductId: id, name, price, createdAt: new Date(), updatedAt: new Date() })
            })
            .then(() => res.redirect('/products'))
            .catch(err => res.send(err))
    }
    static checkout(req, res) {
        Cart.findAll()
            .then(data => res.render('checkout', { data }))
            .catch(err => res.send(err))
    }
    static cartDelete(req, res) {
        Cart.destroy({ where: { id: req.params.id } })
            .then(() => res.redirect('/products/checkout'))
            .catch(err => res.send(err))
    }
    static purchase(req, res) {
        let tempId = []
        Cart.findAll()
            .then(data => {
                data.forEach(e => { tempId.push(e.ProductId) })
                tempId.forEach(el => {
                    Product.decrement('stock', { by: 1, where: { id: el } })
                })
                return
            })
            .then(() => {
                return Cart.destroy({
                    where: {},
                    truncate: true
                })
            })
            .then(() => res.redirect('/products'))
            .catch(err => res.send(err))
    }



    // ==================WAREHOUSE=======================
    static warehouse(req, res) {
        Product.findAll({ include: Category })
            // .then( data => res.send(data))
            .then(data => res.render('warehouse', { data }))
            .then(err => res.send(err))
    }
    static addCategory(req, res) {
        res.render('addCategory')
    }
    static addCategoryPost(req, res) {
        let { category } = req.body
        Category.create({ category, createdAt: new Date(), updatedAt: new Date() })
            .then(() => res.redirect('/warehouse'))
            .catch(err => res.send(err))
    }
    static addProduct(req, res) {
        Category.findAll()
            .then(data => res.render('addProduct', { data }))
            .catch(err => res.send(err))
    }
    static addProductPost(req, res) {
        let { name, brand, imageUrl, price, stock, CategoryId, description } = req.body
        Product.create({
            name, brand, imageUrl, price, stock, CategoryId, description,
            createdAt: new Date(), updatedAt: new Date()
        })
            .then(() => res.redirect('/warehouse'))
            .catch(err => res.send(err))

    }
    static editProduct(req, res) {
        let data;
        let foundId = req.params.id
        Product.findOne({ where: { id: foundId } })
            .then(temp => {
                data = temp
                return Category.findAll()
            })
            .then(category => res.render('editProduct', { data, category }))
    }
    static editProductPost(req, res) {
        let { name, brand, imageUrl, price, stock, CategoryId, description } = req.body
        Product.findOne({where : {id : req.params.id} })
        .then( product => {
            console.log(product);
            return product.update({
                name, brand, imageUrl, price, stock, CategoryId, description,
                createdAt: new Date(), updatedAt: new Date()})
        })
        .then(() => res.redirect('/warehouse'))
        .catch(err => res.send(err))
    }
    static deleteProduct(req, res) {
        Product.destroy({where : {id : req.params.id}})
        .then( () => res.redirect('/warehouse'))
        .catch(err => res.send(err))
    }
}

module.exports = Controller