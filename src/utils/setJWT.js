// Mock implementation of setJWT function
// In a real app, this would store a JWT token in cookies or localStorage

const setJWT = (tokenData) => {
	console.log('Setting JWT token:', tokenData);
	// For demonstration, we're just logging the token data
	// In a real app, we would store this in a cookie or localStorage
	
	if (typeof window !== 'undefined') {
		// Store in localStorage for demonstration
		if (tokenData.email) {
			localStorage.setItem('auth-token', JSON.stringify({
				token: `mock-jwt-token-${Date.now()}`,
				email: tokenData.email
			}));
		} else {
			localStorage.removeItem('auth-token');
		}
	}
	
	return true;
};

export default setJWT;