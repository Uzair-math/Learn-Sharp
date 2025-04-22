"use client"
import AuthProvider from "@/providers/AuthProvider"
const Providers = ({children}) => {
	return (
		<AuthProvider>
			{children}
		</AuthProvider>
	);
};

export default Providers;