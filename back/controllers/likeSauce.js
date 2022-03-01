const Sauce = require('../models/Sauce');


exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then((sauce) => {
        switch(req.body.like) {

            case 1 :
                if(!sauce.usersLikes.includes(req.body.userId)) {

                    Sauce.updateOne({ _id: req.params.id},
                        {
                            $inc : { likes : 1},
                            $push : { usersLikes: req.body.userId}
                        }
                        )
                    .then(() => res.status(201).json({ message : "Users Liked" }))
                    .catch((error) => res.status(400).json({ error }))
                }
                break;
            
            case -1 : 
            if(!sauce.usersDislikes.includes(req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id},
                    {
                        $inc : { dislikes : 1},
                        $push : { usersDislikes: req.body.userId}
                    }
                    )
                .then(() => res.status(201).json({ message : "Users Disliked" }))
                .catch((error) => res.status(400).json({ error }))
                }
                break;

            case 0 : 
            if(sauce.usersLikes.includes(req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id},
                    {
                        $inc : { likes : -1},
                        $pull : { usersLikes: req.body.userId}
                    }
                    )
                .then(() => res.status(201).json({ message : "Users Liked 0" }))
                .catch((error) => res.status(400).json({ error }))
                }
                
            if(sauce.usersDislikes.includes(req.body.userId) && req.body.likes === 0) {
                Sauce.updateOne({ _id: req.params.id},
                    {
                        $inc : { dislikes : -1},
                        $pull : { usersDislikes: req.body.userId}
                    }
                    )
                .then(() => res.status(201).json({ message : "Users Dislikes 0" }))
                .catch((error) => res.status(400).json({ error }))
                }
                break;
        }
    })
    .catch((error) => res.status(404).json({ error }));
};