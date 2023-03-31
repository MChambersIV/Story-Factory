const { Schema, model } = require('mongoose');

const storySchema = new Schema({
    storyname: {
        type: String,
<<<<<<< HEAD
    },
=======
        unique: true,
    },


    prompt: {
        type: String,
        unique: true,
    },

>>>>>>> 171d139a5a1adbb0299a2b756d33d09e30b5cc8f
    username: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],

    snippets: [{
        type: Schema.Types.ObjectId,
        ref: 'Snippet'
    }]

    
}, {
    toJSON: {
        getters: true,
    },
    id: false
});

storySchema.virtual('snippetCount').get(function () {
    return this.snippets.length;
});


const Story = model('story', storySchema);

module.exports = Story;
