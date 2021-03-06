const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; 
    const sauce = new Sauce({
        ...sauceObject, //operateur spread title: req.body.title
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message : "Objet enregistre" }))
    .catch((error) => console.log(error));
};


exports.modifySauce = (req, res, next) => {

    if(req.file) {
        Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, (error) => {
                if(error) throw error;
            })
        })
        .catch((error) => res.status(400).json({ error }));
    } 
    const sauceObject = req.file ? 
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({ message : "objet modifie" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then((sauce) => {
        if(!sauce) {
            res.status(404).json({
                error : new Error ('No such Sauce')
            });
        };
        if(sauce.userId !== req.auth.userId) {
            res.status(400).json({
                error: new Error ('Non autorisé')
            });
        };
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message : "objet supprime" }))
            .catch((error) => res.status(400).json({ error }));
        })
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};


