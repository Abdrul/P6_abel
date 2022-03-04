const Sauce = require('../models/Sauce');

exports.likeSauce = (req, res, next) => {

    switch(req.body.like) {
        case 1 :
            Sauce.updateOne({ _id: req.params.id, usersLiked: {$ne: req.body.userId}}, { $inc : { likes : +1}, $push : { usersLiked: req.body.userId} })
            .then(() => res.status(200).json({ message : "Users Liked" }))
            .catch((error) => res.status(400).json({ error }))
            break;


        case -1 :
            Sauce.updateOne({ _id: req.params.id, usersDisliked: {$ne: req.body.userId}}, { $inc : { dislikes : +1}, $push : { usersDisliked: req.body.userId} })
            .then(() => res.status(200).json({ message : "Users disliked" }))
            .catch((error) => res.status(400).json({ error }))
            break;

        default:
            Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                if(sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id}, { $inc : { likes : -1}, $pull : { usersLiked: req.body.userId} })
                    .then(() => res.status(200).json({ message : "Like deleted" }))
                    .catch((error) => res.status(400).json({ error }))
                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id}, { $inc : { dislikes : -1}, $pull : { usersDisliked: req.body.userId} })
                    .then(() => res.status(200).json({ message : "Dislike deleted" }))
                    .catch((error) => res.status(400).json({ error }))
                }
            })
            .catch((error) => res.status(400).json({ error }))
            break;


    }        


    






    // Sauce.findOne({ _id: req.params.id })
    // .then((sauce) => { 

    // switch(req.body.like) {
    //     case 1 :
    //         if(!sauce.usersLiked.includes(req.body.userId)) {
    //             Sauce.updateOne({ _id: req.params.id},
    //                 {
    //                     $inc : { likes : +1},
    //                     $push : { usersLiked: req.body.userId}
    //                 }
    //                 )
    //                 .then(() => res.status(201).json({ message : "Users Liked" }))
    //                 .catch((error) => console.log(error))
    //             }        
    //         break;

    //         case 0 : 
    //         Sauce.findOne({ _id: req.params.id})
    //         .then((sauce) => {
    //             if(sauce.usersLiked.includes(req.body.userId)) {
    //                 Sauce.updateOne({ _id: req.params.id},
    //                     {
    //                         $inc : { likes : -1},
    //                         $pull : { usersLiked: req.body.userId}
    //                     }
    //                     )
    //                     .then(() => res.status(200).json({ message : "No like no dislike" }))
    //                     .catch((error) => console.log(error))
    //                 }
    //                 if(sauce.usersDisliked.includes(req.body.userId)) {
    //                     Sauce.updateOne({ _id: req.params.id },
    //                         {
    //                             $inc : { dislikes : -1},
    //                             $pull : { usersDisliked: req.body.userId}
    //                         }
    //                         )
    //                         .then(() => res.status(200).json({ message : "No like no dislike" }))
    //                         .catch((error) => console.log(error))
    //                 }
    //         })
    //         .catch((error) => res.status(404).json({ error }))
    
    //         break;
        
    //     case -1 : 
    //     if(!sauce.usersDisliked.includes(req.body.userId)) {
    //         Sauce.updateOne({ _id: req.params.id},
    //             {
    //                 $inc : { dislikes : +1},
    //                 $push : { usersDisliked: req.body.userId}
    //             }
    //             )
    //             .then(() => res.status(201).json({ message : "Users Disliked" }))
    //             .catch((error) => console.log(error))
    //         }
    //         break;
    //     default: 
        
    // }

    // })
    // .catch((error) => console.log(error))
}