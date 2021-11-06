const router = require('express').Router()
const controller = require('./todos.controller')

router.get('', controller.getAll)
router.get('/:id', controller.getOne)
router.post('', controller.create)
router.delete('/:id', controller.remove)
router.patch('/:id', controller.patch)

module.exports = router;