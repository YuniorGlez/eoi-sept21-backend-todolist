const router = require('express').Router()
const controller = require('./users.controller')

router.get('', controller.getAll)
router.get('/:email', controller.getOne)
router.post('', controller.create)
router.delete('/:id', controller.remove)
router.patch('/:id', controller.patch)

module.exports = router;