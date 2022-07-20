const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.login)
router.post('/', Controller.loginPost)

router.get('/owner', Controller.owner)
router.get('/cashier', Controller.cashier)
router.get('/warehouse', Controller.warehouse)


module.exports = router