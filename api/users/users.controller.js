const model = require("./users.model")

module.exports = { getAll, getOne, create, remove, patch }

function getAll(req, res) {
    return model.find()
        .then(results => { return res.json(results) })
        .catch(err => { return res.status(500).json(err) })
}

function getOne(req, res) {
    return model.findOne({ email:  req.params.email })
        .then(results => { return res.json(results) })
        .catch(err => { return res.status(500).json(err) })
}

function getOneById(req, res) {
    return model.findById( req.params.id)
        .then(results => { return res.json(results) })
        .catch(err => { return res.status(500).json(err) })
}

function create(req, res) {
    delete req.body._id
    return model.create(req.body)
        .then(result => { return res.status(201).json(result) })
        .catch(err => { return res.status(400).json(err) })
}

function remove(req, res) {
    return model.findByIdAndRemove(req.params.id)
        .then(results => { return res.json(results) })
        .catch(err => { return res.status(500).json(err) })
}

function patch(req, res) {
    return model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(result => { return res.json(result) })
        .catch(err => { return res.status(500).json(err) })

}
