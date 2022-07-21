const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.xxx)
router.post('/', Controller.xxx)

router.get('/owner', Controller.xxx)
router.get('/owner/addUser', Controller.xxx)
router.post('/owner/addUser', Controller.xxx)
router.get('/owner/editUser', Controller.xxx)
router.post('/owner/editUser', Controller.xxx)
router.get('/owner/deleteUser', Controller.xxx)

router.get('/cashier/:id', Controller.xxx)
router.get('/cashier/:cahierId/detail/:ProductId', Controller.xxx)
router.get('/cashier/:cahierId/buy/:ProductId', Controller.xxx)
router.post('/cashier/:cahierId/buy/:ProductId', Controller.xxx)

router.get('/warehouse/:id', Controller.xxx)
router.get('/warehouse/:id/add', Controller.xxx)
router.post('/warehouse/:id/add', Controller.xxx)
router.get('/warehouse/:id/edit', Controller.xxx)
router.post('/warehouse/:id/edit', Controller.xxx)
router.get('/warehouse/:id/delete', Controller.xxx)


module.exports = router