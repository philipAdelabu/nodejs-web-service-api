import mongoose from "mongoose";

export const profileSchema = new mongoose.Schema({

    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
       type: String,  
    },

    birthday: {
       type: Date,
    },
    favoriteColor: {
      type: String,
    }
}, {timestamps: true});



const Profile = mongoose.model('Profile', profileSchema);

export default Profile;