const authService = {
  login: async (credentials) => ({
    user: { name: 'Alex Morgan', email: credentials.email, role: 'Product Lead' },
    token: 'demo-token',
  }),
  register: async (payload) => ({
    user: { name: payload.name, email: payload.email, role: 'New Member' },
    token: 'demo-token',
  }),
};

export default authService;
