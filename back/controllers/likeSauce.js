const Sauce = require('../models/Sauce');


exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then((sauce) => {
        res.status(200).json(sauce)
    })
    .catch((error) => res.status(404).json({ error }));
};