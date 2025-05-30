import { LayoutDashboard, Edit, BookOpen } from "lucide-react";

export const dashboardMenuItems = [
    {
        label: "대시보드 홈",
        to: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "컨텐츠 관리",
        to: "/dashboard/contents",
        icon: Edit,
    },
    {
        label: "방명록 관리",
        to: "/dashboard/guestbook",
        icon: BookOpen,
    },
] as const;
