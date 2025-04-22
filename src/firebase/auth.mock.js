// Mock implementation for Firebase Auth
// This file provides mock functions that mimic Firebase Auth behavior

// Mock user state that persists between functions
let mockCurrentUser = null;

export const getAuth = () => {
  return {
    currentUser: mockCurrentUser,
    onAuthStateChanged: (callback) => {
      // Call the callback with the current user state
      setTimeout(() => callback(mockCurrentUser), 0);
      // Return a fake unsubscribe function
      return () => {};
    }
  };
};

// Add standalone onAuthStateChanged function
export const onAuthStateChanged = (auth, callback) => {
  // Call the callback with the current user state
  setTimeout(() => callback(mockCurrentUser), 0);
  // Return a fake unsubscribe function
  return () => {};
};

export const createUserWithEmailAndPassword = (auth, email, password) => {
  const newUser = {
    uid: 'mock-uid-' + Math.random().toString(36).substring(2, 10),
    email,
    displayName: email.split('@')[0],
    photoURL: null
  };
  
  // Set the mock current user
  mockCurrentUser = newUser;
  
  return Promise.resolve({
    user: newUser
  });
};

export const signInWithEmailAndPassword = (auth, email, password) => {
  const user = {
    uid: 'mock-uid-' + Math.random().toString(36).substring(2, 10),
    email,
    displayName: email.split('@')[0],
    photoURL: null
  };
  
  // Set the mock current user
  mockCurrentUser = user;
  
  return Promise.resolve({
    user
  });
};

export const signOut = () => {
  // Clear the mock current user
  mockCurrentUser = null;
  return Promise.resolve();
};

export const sendPasswordResetEmail = (auth, email) => {
  console.log(`Mock password reset email sent to ${email}`);
  return Promise.resolve();
};

export const updateProfile = (user, profileUpdates) => {
  console.log('Mock profile update:', profileUpdates);
  
  // Update the mock current user if it exists
  if (mockCurrentUser) {
    mockCurrentUser = {
      ...mockCurrentUser,
      ...profileUpdates
    };
  }
  
  return Promise.resolve();
};

export const GoogleAuthProvider = class {
  constructor() {
    this.id = 'google.com';
  }
};

export const signInWithPopup = (auth, provider) => {
  const googleUser = {
    uid: 'mock-google-uid-' + Math.random().toString(36).substring(2, 10),
    email: 'googleuser@example.com',
    displayName: 'Google User',
    photoURL: 'https://example.com/photo.jpg'
  };
  
  // Set the mock current user
  mockCurrentUser = googleUser;
  
  return Promise.resolve({
    user: googleUser
  });
}; 