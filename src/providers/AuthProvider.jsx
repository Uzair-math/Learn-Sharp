"use client"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, GoogleAuthProvider } from "../firebase/auth.mock.js";
import { app } from '@/firebase/firebase.config.js';
import { useEffect, useState } from 'react';
import AuthContext from "@/contexts/AuthContext";
import getUser from "@/utils/getUser";
import setJWT from "@/utils/setJWT";

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userData, setUserData] = useState(null);
	const [userRole, setUserRole] = useState("");
	const [loading, setLoading] = useState(true);

	// Load user data when user changes
	useEffect(() => {
		if (user) {
			const fetchUserData = async () => {
				try {
					const userData = await getUser(user?.email);
					setUserData(userData);
					setUserRole(userData?.role || "student");
				} catch (error) {
					console.error("Error fetching user data:", error);
					setUserData({
						name: user.displayName || 'User',
						email: user.email,
						role: 'student'
					});
					setUserRole('student');
				} finally {
					setLoading(false);
				}
			};
			fetchUserData();
		} else {
			setLoading(false);
		}
	}, [user]);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password)
			.then(result => {
				// Set JWT token on user creation
				const tokenData = { email: result.user.email };
				setJWT(tokenData);
				return result;
			})
			.catch(error => {
				console.error("Create user error:", error);
				setLoading(false);
				throw error;
			});
	}

	const logIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password)
			.then(result => {
				// Set JWT token on login
				const tokenData = { email: result.user.email };
				setJWT(tokenData);
				return result;
			})
			.catch(error => {
				console.error("Login error:", error);
				setLoading(false);
				throw error;
			});
	}

	const logOut = () => {
		setLoading(true);
		// Clear JWT on logout
		const tokenData = { email: null };
		setJWT(tokenData);
		return signOut(auth)
			.catch(error => {
				console.error("Logout error:", error);
				throw error;
			})
			.finally(() => setLoading(false));
	}

	const resetPassword = (email) => {
		setLoading(true);
		return sendPasswordResetEmail(auth, email)
			.catch(error => {
				console.error("Reset password error:", error);
				throw error;
			})
			.finally(() => setLoading(false));
	}

	const signInWithGoogle = () => {
		setLoading(true);
		return signInWithPopup(auth, googleAuthProvider)
			.then(result => {
				// Set JWT token on Google sign-in
				const tokenData = { email: result.user.email };
				setJWT(tokenData);
				return result;
			})
			.catch(error => {
				console.error("Google sign-in error:", error);
				throw error;
			})
			.finally(() => setLoading(false));
	}

	const updateUserProfile = (updateUser) => {
		setLoading(true);
		return new Promise((resolve, reject) => {
			try {
				updateProfile(auth.currentUser, updateUser);
				setUser((preUser) => ({ ...preUser, ...updateUser }));
				resolve();
			} catch (error) {
				console.error("Update profile error:", error);
				reject(error);
			} finally {
				setLoading(false);
			}
		});
	}

	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log('Auth state changed:', currentUser);
			setUser(currentUser);
		});
		
		return () => {
			unSubscribe();
		}
	}, []);

	const authInfo = {
		user,
		userData,
		setUser,
		userRole,
		setUserRole,
		loading,
		setLoading,
		createUser,
		updateUserProfile,
		logIn,
		resetPassword,
		signInWithGoogle,
		logOut
	}

	return (
		<AuthContext.Provider value={authInfo}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;