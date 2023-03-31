const {
    Schema,
    model
} = require('mongoose');
const bcrypt = require('bcrypt');
const { min } = require('moment');
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'User email address required'],
        unique: true,
        validate: {
            validator: function (v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        min: 6
    },
    Snippet: [{
        type: Schema.Types.ObjectId,
        ref: 'Snippet'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

userSchema.pre('save', function(next){
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
            return next(err);
        this.password = passwordHash;
            next();
    })
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
  


const User = model('User', userSchema);

module.exports = User;