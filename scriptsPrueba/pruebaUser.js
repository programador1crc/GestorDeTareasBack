import axios from 'axios';

async function createUser() {
  try {
    const response = await axios.post('http://[::1]:51334/api/users', {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'securepassword',
    });

    console.log('User Created:', response.data);
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
  }
}

async function getUsers() {
  try {
    const response = await axios.get('http://localhost:3000/api/users');

    console.log('Users:', response.data);
  } catch (error) {
    console.error('Error fetching users:', error.response ? error.response.data : error.message);
  }
}

async function getUserById(userId) {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/${userId}`);

    console.log('User:', response.data);
  } catch (error) {
    console.error('Error fetching user:', error.response ? error.response.data : error.message);
  }
}

async function updateUser(userId) {
  try {
    const response = await axios.put(`http://localhost:3000/api/users/${userId}`, {
      name: 'John Smith',
      email: 'john.smith@example.com',
    });

    console.log('User Updated:', response.data);
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
  }
}

async function deleteUser(userId) {
  try {
    const response = await axios.delete(`http://localhost:3000/api/users/${userId}`);

    console.log('User Deleted:', response.data);
  } catch (error) {
    console.error('Error deleting user:', error.response ? error.response.data : error.message);
  }
}

createUser();
