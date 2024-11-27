export const defaultAdminCredentials = {
  email: 'admin@padelcygnus.com',
  password: 'Admin123!' // This should be changed in production and stored securely
}

// In a real production environment, these would be stored in a secure database
// and the password would be hashed
export const adminUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@padelcygnus.com',
    role: 'admin',
    permissions: ['all']
  }
]
