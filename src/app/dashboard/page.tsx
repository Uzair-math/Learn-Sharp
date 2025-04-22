"use client";
import dynamic from 'next/dynamic';

const DashboardContent = dynamic(
	() => import("@/components/DashboardContent/DashboardContent"),
	{ ssr: false }
);

const Dashboard = () => {
	return (
		<>
			<DashboardContent />
		</>
	);
};

export default Dashboard;