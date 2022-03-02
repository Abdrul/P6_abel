const Sauce = require('../models/Sauce');


exports.likeSauce = (req, res, next) => {
    switch(req.body.like) {
        case 1 :
                Sauce.updateOne({ _id: req.params.id},
                    {
                        $inc : { likes : +1},
                        $push : { usersLikes: req.body.userId}
                    }
                    )
                .then(() => res.status(201).json({ message : "Users Liked" }))
                .catch((error) => console.log(error))
            break;

            case 0 : 
            Sauce.findOne({ _id: req.params.id})
            .then((sauce) => {
                if(sauce.usersLikes.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id},
                        {
                            $inc : { likes : -1},
                            $pull : { usersLikes: req.body.userId}
                        }
                        )
                        .then(() => res.status(200).json({ message : "No like no dislike" }))
                        .catch((error) => console.log(error))
                    }
                    if(sauce.usersDislikes.includes(req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id},
                            {
                                $inc : { dislikes : -1},
                                $pull : { usersDislikes: req.body.userId}
                            }
                            )
                            .then(() => res.status(200).json({ message : "No like no dislike" }))
                            .catch((error) => console.log(error))
                    }
            })
            .catch((error) => res.status(404).json({ error }))
    
            break;
        
        case -1 : 
            Sauce.updateOne({ _id: req.params.id},
                {
                    $inc : { dislikes : +1},
                    $push : { usersDislikes: req.body.userId}
                }
                )
            .then(() => res.status(201).json({ message : "Users Disliked" }))
            .catch((error) => console.log(error))
            break;

        default: 
        console.log(error);
    }
}