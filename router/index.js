const router = require('express').Router()
const Controller = require('../controllers/controller')
const userController = require('../controllers/auth-controller')
const { isAdmin, isOwner } = require('../middleware/auth-js')

// untuk global middleware
// router.use(function (req, res, next) {
//     if(!req.session.userId && req.session.userId !== `owner`.toLowerCase()){
//         const error = `please login first`
//         res.redirect(`/login?error=${error}`)
//     } else {
//         next()
//     }
// }) 

router.get('/', Controller.home)

// =============================================

router.get('/login', userController.loginUser)
router.post('/login', userController.postLogin)
router.get('/logout', userController.getLogOut)
router.get('/register', isOwner, userController.registerForm)
router.post('/register', isOwner, userController.postRegister)

//==============OWNER============================

router.get('/owner', Controller.owner)
router.get('/employee', Controller.employee)
router.get('/employee/:id/edit', Controller.editEmployee)
router.post('/employee/:id/edit', Controller.editEmployeePost)
router.get('/employee/:id/delete', Controller.deleteEmployee)

// ==============CASHIER=========================
router.get('/products', Controller.products)
router.get('/products/checkout', Controller.checkout)
router.get('/products/cart/purchase', Controller.purchase)
router.get('/products/:id/detail', Controller.productDetail)
router.get('/products/:id/cart/delete', Controller.cartDelete)
router.get('/products/:id/buy', Controller.buyProduct)

// ==============WAREHOUSE=========================
router.get('/warehouse', Controller.warehouse)
router.get('/warehouse/add/product', Controller.addProduct)
router.post('/warehouse/add/product', Controller.addProductPost)
router.get('/warehouse/add/category', Controller.addCategory)
router.post('/warehouse/add/category', Controller.addCategoryPost)
router.get('/warehouse/:id/product/edit', Controller.editProduct)
router.post('/warehouse/:id/product/edit', Controller.editProductPost)
router.get('/warehouse/:id/product/delete', Controller.deleteProduct)




module.exports = router
