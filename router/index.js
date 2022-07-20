const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.login)
router.post('/', Controller.loginPost)

router.get('/owner/:id', Controller.owner)


router.get('/cashier/:id', Controller.cashier)
router.get('/cashier/:cashierId/detail/:itemId', Controller.detailItem)

router.get('/warehouse/:id', Controller.warehouse)


module.exports = router