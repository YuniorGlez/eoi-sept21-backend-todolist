const router = require('express').Router()
const controller = require('./users.controller')
const auth = require('./../../middleware/auth.middleware')

router.get('', controller.getAll)
router.get('/:email', controller.getOne)
router.post('', auth.isAdmin, controller.create)
router.delete('/:id', auth.isTheSameUser,  controller.remove)
router.patch('/:id', controller.patch)

module.exports = router;