import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import SignInPage from "@/pages/SignInPage";
import DashboardPage from "@/pages/dashboard/HomePage";
import { DashboardLayout } from "@/common/layouts/DashboardLayout";
import ContentsPage from "@/pages/dashboard/ContentsPage";
import GuestbookPage from "@/pages/dashboard/GuestbookPage";

const routes = createRoutesFromElements(
    <Route path="/">
        <Route index element={<SignInPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="contents" element={<ContentsPage />} />
            <Route path="guestbook" element={<GuestbookPage />} />
        </Route>
    </Route>,
);

export const router = createBrowserRouter(routes);
