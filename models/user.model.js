const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userid: Number,
  email: String,
  first_name: String,
  last_name: String,
  username: String,
  contact: String,
  password: String,
  role: String,
  isLoggedIn: Boolean,
  uuid: String,
  accesstoken: String,
  coupens: [{ id: Number, discountValue: Number }],
  bookingRequests: [
    {
      reference_number: Number,
      coupon_code: Number,
      show_id: Number,
      tickets: [Number],
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);
