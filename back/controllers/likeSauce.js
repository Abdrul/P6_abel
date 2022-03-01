// importation du models de mongodb


exports.like = (req, res, next) => {
    // model
    Sauce.findOne({ _id: req.params.id})
    .then((sauce) => {
        res.status(200).json(sauce)
    })
    .catch((error) => res.status(404).json({ error }));
};