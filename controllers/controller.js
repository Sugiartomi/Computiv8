let { User, Category, Product, Profile, Cart } = require('../models')
const { Op } = require("sequelize")

class Controller {

    // =======================================================

    static home(req, res) {
        res.render('home')
    }
    static owner(req,res) {
        res.render('owner')
    }
    static employee(req,res){
        User.findAll({where : {role: ["warehouse", "products"]}, include : Profile})
        // .then(data => res.send(data))
        .then(data => res.render('employee',{data}))
    }
    static editEmployee(req,res){
        Profile.findOne({where : {id : req.params.id}, include : User})
        .then(data => res.render('editEmployee',{data}))
        .catch(err => res.send(err))
    }
    static editEmployeePost(req,res){
        let {firstName, lastName, dateOfBirth, education, email, role} = req.body

        User.findOne({where :{id:req.params.id}})
        .then( result => result.update({email,role}))
        .then(() => Profile.findOne({where :{id:req.params.id}}))
        .then(result => result.update({firstName, lastName, dateOfBirth, education}))
        .then(() => res.redirect('/employee'))
        .catch(err => res.send(err))
    }
    static deleteEmployee(req,res){
        Profile.destroy({where : {id : req.params.id}})
        .then(() => User.destroy({where : {id : req.params.id}}))
        .then(()=> res.redirect('/employee'))
        .catch(err => res.send(err))
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
        Product.findOne({ where: { id: req.params.id } })
            .then(product => {
                console.log(product);
                return product.update({
                    name, brand, imageUrl, price, stock, CategoryId, description,
                    createdAt: new Date(), updatedAt: new Date()
                })
            })
            .then(() => res.redirect('/warehouse'))
            .catch(err => res.send(err))
    }
    static deleteProduct(req, res) {
        Product.destroy({ where: { id: req.params.id } })
            .then(() => res.redirect('/warehouse'))
            .catch(err => res.send(err))
    }
}

module.exports = Controller