const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  company: String,
  work: String,
  profile:String,
  isconnected: Boolean
});

const Person = mongoose.models.people || mongoose.model("people", personSchema);

export default Person;
