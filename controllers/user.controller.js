const User = require('../models/user.model');
const uuidv4 = require('uuidv4');
const TokenGenerator = require('uuid-token-generator');


// Create a token generator with a specific secret key
const tokenGenerator = new TokenGenerator();

// Sign up a new user
exports.signUp = (req, res) => {
  const { email, first_name, last_name, registerPassword, contact } = req.body;
  
  // Generate a UUID for the user
  const uuid = uuidv4();

  // Create a new user object
  const newUser = new User({
    email,
    username: `${first_name}_${last_name}`, // Change this as needed
    uuid,
    access_token: tokenGenerator.generate(uuid),
    isLoggedIn: false,
    // Add other user properties as needed
  });

  // Save the user to the database
  newUser
    .save()
    .then(() => {
      res.status(201).json({ message: 'User created successfully' });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Log in a user
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Find the user by username and password
  User.findOne({ username, password })
    .then((user) => {
      if (user) {
        // Update the user's isLoggedIn status
        user.isLoggedIn = true;
        user.save();

        res.status(200).json({ message: 'Login successful', access_token: user.access_token });
      } else {
        res.status(401).json({ message: 'Login failed. Invalid username or password.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Log out a user
exports.logout = (req, res) => {
  const { userId } = req.params;

  // Find the user by their unique ID
  User.findOne({ uuid: userId })
    .then((user) => {
      if (user) {
        // Update the user's isLoggedIn status
        user.isLoggedIn = false;
        user.save();

        res.status(200).json({ message: 'Logout successful' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Get coupon code for a user
exports.getCouponCode = (req, res) => {
    const { userId } = req.params;
  
    // Find the user by their unique ID
    User.findOne({ uuid: userId })
      .then((user) => {
        if (user) {
          // Check if the user has any coupons
          if (user.coupens.length > 0) {
            // Return the first coupon for simplicity
            res.status(200).json({ coupon: user.coupens[0] });
          } else {
            res.status(404).json({ message: 'No coupons found for the user' });
          }
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  };
  
  // Book a show for a user
  exports.bookShow = (req, res) => {
    const { userId } = req.params;
    const { showId, tickets } = req.body;
  
    // Find the user by their unique ID
    User.findOne({ uuid: userId })
      .then((user) => {
        if (user) {
          // Assuming you have a Show model or collection
          // Implement the logic to book a show and update the user's bookingRequests
          // This is just a placeholder for demonstration purposes
          // Replace this with your actual booking logic
  
          // Example: Booking logic (replace with your actual logic)
          const booking = {
            reference_number: Math.floor(Math.random() * 1000000), // Generate a random reference number
            coupon_code: 101, // Replace with actual coupon code
            show_id: showId,
            tickets,
          };
  
          // Add the booking request to the user's bookingRequests
          user.bookingRequests.push(booking);
  
          // Save the updated user
          user.save();
  
          res.status(201).json({ message: 'Show booked successfully', booking });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  };
  