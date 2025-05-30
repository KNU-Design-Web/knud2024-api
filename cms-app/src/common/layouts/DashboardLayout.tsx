import { DashboardSidebar } from "@/common/layouts/DashboardSidebar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <DashboardSidebar />
            <div className="flex-1 overflow-auto p-6">
                <Outlet />
            </div>
        </div>
    );
};
