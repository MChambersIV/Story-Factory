const { Schema, model } = require('mongoose');

const SnippetSchema = new Schema({
    snippetText: {
        type: String,
        required: true,

    },

    username: {
        type: String,
        ref: 'User',
        required: true,

    },
    
    storyname: {
        type: String,
        ref: 'Story',

    },
    // reactions: [reactionSchema]
});


const Snippet = model('Snippet', SnippetSchema);

module.exports = Snippet;
