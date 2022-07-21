const router = require('express').Router()
const Controller = require('../controllers/controller')
const userController = require('../controllers/auth-controller')

router.get('/', (req,res)=>{
    res.render('home')
})
router.get('/login-owner', Controller.loginOwner)
router.post('/login-owner', Controller.loginOwnerPost)

router.get('/products', Controller.products)
router.get('/products/checkout', Controller.checkout)
router.get('/products/cart/purchase', Controller.purchase)
// router.get('/products/:id/detail', Controller.productDetail)
router.get('/products/:id/cart/delete', Controller.cartDelete)
router.get('/products/:id/buy', Controller.buyProduct)


router.get('/register', userController.registerForm)
router.post('/register', userController.postRegister)
// router.get('/owner/addUser', Controller.xxx) //done
// router.post('/owner/addUser', Controller.xxx) // done
router.get('/login', userController.loginUser)
router.post('/login', userController.postLogin)
// router.get('/owner/editUser', Controller.xxx) 
// router.post('/owner/editUser', Controller.xxx)
// router.get('/owner/deleteUser', Controller.xxx)

// //MWowner

// router.get('/cashier/:id', Controller.xxx)
// router.get('/cashier/:cahierId/detail/:ProductId', Controller.xxx)
// router.get('/cashier/:cahierId/buy/:ProductId', Controller.xxx)
// router.post('/cashier/:cahierId/buy/:ProductId', Controller.xxx)

// router.get('/warehouse/:id', Controller.xxx)
// router.get('/warehouse/:id/add', Controller.xxx)
// router.post('/warehouse/:id/add', Controller.xxx)
// router.get('/warehouse/:id/edit', Controller.xxx)
// router.post('/warehouse/:id/edit', Controller.xxx)
// router.get('/warehouse/:id/delete', Controller.xxx)


module.exports = router