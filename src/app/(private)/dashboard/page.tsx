import AdminDashboard from "@/components/adminDashboard/page";
import UserDashboard from "@/app/(private)/userDashboard/page";
// import { verifySession } from "@/app/lib/cookie/dal";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	// const session = await verifySession();
	// const userRole = session?.userRole; // Assuming 'role' is part of the session object

	// if (userRole === "admin") {
	// 	return <AdminDashboard />;
	// }

	// if (userRole === "user") {
	// 	return <UserDashboard />;
	// }

	redirect("/login");
}
