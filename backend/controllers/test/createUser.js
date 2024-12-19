import AppUser from '../../models/appuser.model.js'; // Adjust if your model path is different

export const createUser = async (req, res) => {
  try {
    const { username, phoneNumber, email, password } = req.body;

    // Validate required fields
    if (!username || !phoneNumber || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new user instance
    const newUser = new AppUser({
      username,
      phoneNumber,
      email,
      password,  // Save the password directly (without hashing)
    });

    // Save the new user to the database
    await newUser.save();

    // Return the created user (without the password field)
    res.status(201).json({
      message: 'User created successfully',
      user: {
        username: newUser.username,
        phoneNumber: newUser.phoneNumber,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
