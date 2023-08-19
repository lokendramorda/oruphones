import mongoose from "mongoose";


const userDetailsSchema = new mongoose.Schema({
  userEmail: { type: String},
  userProfile: { type: String }, 
  name: { type: String },
  phone: { type: String },
  bio: { type: String },
  skills: [{ 
    skill: {type: String} 
}],
  certificates: [{
    language: { type: String },
    organization: { type: String },
  }],
  experience: [{
    fromYear: { type: String },
    toYear: { type: String },
    organization: { type: String },
    detail: { type: String },
  }],
  education: [{
    degree: { type: String },
    fromYear: { type: String },
    toYear: { type: String },
    organization: { type: String },
    detail: { type: String },
  }],
});


const UserDetail = mongoose.models.userDetails || mongoose.model("userDetails", userDetailsSchema);
  

export default UserDetail;
