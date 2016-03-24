var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  fests: {type: mongoose.Schema.Types.ObjectId, ref: 'Festivals'} 
});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      name: ret.name,
      email: ret.email,
      phone: ret.phone,
      fests: ret.fests
    };
    return returnJson;
  }
});

UserSchema.methods.authenticated = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res ? this : false);
    }
  });
}

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);
