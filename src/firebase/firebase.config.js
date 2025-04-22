// Mock implementation of Firebase configuration
// In a real app, this would initialize Firebase SDK with proper configuration

// Mock Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY || "mock-api-key",
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || "mock-auth-domain.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "mock-project-id",
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET || "mock-storage-bucket.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_APP_ID || "1:123456789:web:abcdef123456789"
};

// Mock Firebase app initialization
export const app = {
  name: 'mock-firebase-app',
  options: firebaseConfig
};

export default app;