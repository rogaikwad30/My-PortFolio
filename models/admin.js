const mongoose  = require("mongoose")
const bcryptjs = require('bcryptjs')

let adminSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true, 
        required: [true, "can't be blank"]
    },
    email: {
        type: String, 
        lowercase: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        unique: true
    },
    password: {
        type: String, 
        required: [true, "can't be blank"], 
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'is invalid']
    },
    role:{
        type: String,
        required: [true, "can't be blank"]
    }
   
})

adminSchema.pre('save', function (next) {
    this.password = bcryptjs.hashSync(this.password, 10);
    next();
});

adminSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ "email" :  email });
    if (user) {
      const auth = await bcryptjs.compareSync(password , user.password)
      if (auth) {
        return user;
      }
      throw Error('incorrect password'); 
    }
    throw Error('incorrect email');
};
 
let adminModel =  mongoose.model("admins", adminSchema)
module.exports = adminModel;
