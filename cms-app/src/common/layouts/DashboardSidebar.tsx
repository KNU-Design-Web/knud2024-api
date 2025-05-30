import { LogOut } from "lucide-react";
import { cn } from "@/common/utils";
import { Link, useLocation } from "react-router-dom";
import { dashboardMenuItems } from "@/app/config/dashboard-nav";

export function DashboardSidebar() {
    const location = useLocation();

    return (
        <aside className="flex h-full w-64 flex-col bg-secondary text-white">
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="px-2 space-y-1">
                    {dashboardMenuItems.map((item) => (
                        <li key={item.label}>
                            <Link
                                to={item.to}
                                className={cn(
                                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg",
                                    location.pathname === item.to
                                        ? "bg-primary text-black"
                                        : "text-white hover:bg-secondary-foreground/10",
                                )}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4">
                <p
                    className={cn(
                        "flex items-center px-4 py-3",
                        "text-sm font-medium text-white rounded-lg",
                        "hover:bg-secondary-foreground/10 hover:cursor-pointer",
                    )}
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    로그아웃
                </p>
            </div>
        </aside>
    );
}
