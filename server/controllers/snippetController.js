const {
    Snippet,
    User,
    Story
} = require('../models');
const SnippetController = {

    //get all Snippet
    getAllSnippets(req, res) {
        Snippet.find({})
            .then(dbSnippetData => res.json(dbSnippetData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //get one Snippet by id
    getSnippetByUserName({
        params
    }, res) {
        Snippet.find({
                username: params.username
            })
            .select('-__v')
            .then(dbSnippetData => {
                if (!dbSnippetData) {
                    res.status(404).json({
                        message: 'No snippet found with id.'
                    });
                    return;
                }
                res.json(dbSnippetData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //create Snippet
    createSnippet({ body }, res) 
    {
        Snippet.create(body)
                
    
            .then((SnippetData) => {
                
                return Story.findOneAndUpdate(
                    {
                        storyname: body.storyname
                    }, {
                        $addToSet: {

                            snippets: SnippetData._id
                        }
                    }
                );
            })
            .then(dbUsersData => {
                // console.log(dbUsersData)
                if (!dbUsersData) {
                    res.status(404).json({
                        message: 'No user found'
                    });
                    return;
                }
                res.json(dbUsersData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    async getSnippetsByUser({ body, user:userData }, res) {
        console.log('getSnippetByUser: ');
        const snippet = await Snippet.find({ username: userData.username});
        if(!snippet) {
            return res.status(404).json({ message: 'No snippet found with this associated name.'})
        }
        res.status(200).json(snippet);
        }

    //create reactions
//     addReaction({
//         params,
//         body
//     }, res) {
//         Snippet.findOneAndUpdate({
//                 _id: params.SnippetId
//             }, {
//                 $push: {
//                     reactions: body
//                 }
//             }, {
//                 new: true,
//                 runValidators: true
//             })
//             .then(updatedSnippet => {
//                 if (!updatedSnippet) {
//                     res.status(404).json({
//                         message: 'No reaction found with this id!'
//                     });
//                     return;
//                 }
//                 res.json(updatedSnippet);
//             })
//             .catch(err => res.json(err));
//     },
//     // Delete a reaction
//     removeReaction({
//         params
//     }, res) {
//         Snippet.findOneAndUpdate({
//                     _id: params.SnippetId
//                 },
//                 //allows to remove the reaction by id
//                 {
//                     $pull: {
//                         Snippets: {
//                             SnippetId: params.SnippetId
//                         }
//                     }
//                 }, {
//                     new: true
//                 }
//             )
//             .then((Snippet) => {
//                 if (!Snippet) {
//                     res.status(404).json({
//                         message: 'No reaction found with this id.'
//                     });
//                     return;
//                 }
//                 res.json(Snippet)
//             })
//             .catch(err => res.json(err));
//     },
}

module.exports = SnippetController;