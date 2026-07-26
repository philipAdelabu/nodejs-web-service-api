import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    lastName: {
          type: String,
          required: [true, 'Last name is required'],
          trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },

    favoriteColor: {
         type: String,
         trim: true,
    },
    birthday: {
       type: Date,
    },
    createdAt : {
        type: Date,
        default: Date.now(),
    }, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', require: true, unique: true}, 
});



const Contact = mongoose.model('Contact', contactSchema);

export default Contact;