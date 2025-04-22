// Mock implementation of getUser function
// In a real app, this would fetch user data from the database

const getUser = async (email) => {
	// For testing purposes, return a mock user object
	return {
		id: 'mock-user-id-123',
		name: email ? email.split('@')[0] : 'User',
		email: email || 'user@example.com',
		role: 'tutor', // Default to tutor for testing our features
		createdAt: new Date().toISOString()
	};
};

export default getUser;