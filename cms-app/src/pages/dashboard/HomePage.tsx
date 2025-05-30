import { PerformanceMetricCard } from "@/domains/dashboard/components/PerformanceMetricCard";
import { VisitorStats } from "@/domains/dashboard/components/VisitorStats";
import type { Status } from "@/domains/dashboard/utils/getStatusColor";

const performanceData: {
    [url: string]: {
        [metric: string]: {
            averageValue: number;
            averageStatus: Status;
        };
    };
} = {
    "http://localhost:37797/?section=home": {
        "First Contentful Paint": {
            averageValue: 1527.3894,
            averageStatus: "Good",
        },
        "Largest Contentful Paint": {
            averageValue: 4851.31671666667,
            averageStatus: "Poor",
        },
        "Speed Index": {
            averageValue: 1904.83556866666,
            averageStatus: "Good",
        },
        "Cumulative Layout Shift": {
            averageValue: 0,
            averageStatus: "Good",
        },
        "Total Blocking Time": {
            averageValue: 157.666666666667,
            averageStatus: "Good",
        },
        "Time to Interactive": {
            averageValue: 5446.58705,
            averageStatus: "Good",
        },
    },
    "http://localhost:37797/?section=about": {
        "First Contentful Paint": {
            averageValue: 1514.517,
            averageStatus: "Good",
        },
        "Largest Contentful Paint": {
            averageValue: 6939.82640833333,
            averageStatus: "Poor",
        },
        "Speed Index": {
            averageValue: 1514.517,
            averageStatus: "Good",
        },
        "Cumulative Layout Shift": {
            averageValue: 0.000070694588812277,
            averageStatus: "Good",
        },
        "Total Blocking Time": {
            averageValue: 121.666666666667,
            averageStatus: "Good",
        },
        "Time to Interactive": {
            averageValue: 8084.98916666667,
            averageStatus: "Poor",
        },
    },
};

export default function DashboardHomePage() {
    const homePageMetrics = performanceData["http://localhost:37797/?section=home"];

    return (
        <main className="space-y-6">
            <section>
                <VisitorStats total={0} today={0} thisWeek={0} percentChange={0} />
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">웹사이트 성능지표</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <PerformanceMetricCard
                        label="First Contentful Paint"
                        value={homePageMetrics["First Contentful Paint"].averageValue}
                        status={homePageMetrics["First Contentful Paint"].averageStatus}
                        unit="ms"
                    />
                    <PerformanceMetricCard
                        label="Largest Contentful Paint"
                        value={homePageMetrics["Largest Contentful Paint"].averageValue}
                        status={homePageMetrics["Largest Contentful Paint"].averageStatus}
                        unit="ms"
                    />
                    <PerformanceMetricCard
                        label="Speed Index"
                        value={homePageMetrics["Speed Index"].averageValue}
                        status={homePageMetrics["Speed Index"].averageStatus}
                        unit="ms"
                    />
                    <PerformanceMetricCard
                        label="Cumulative Layout Shift"
                        value={homePageMetrics["Cumulative Layout Shift"].averageValue}
                        status={homePageMetrics["Cumulative Layout Shift"].averageStatus}
                        unit=""
                    />
                    <PerformanceMetricCard
                        label="Total Blocking Time"
                        value={homePageMetrics["Total Blocking Time"].averageValue}
                        status={homePageMetrics["Total Blocking Time"].averageStatus}
                        unit="ms"
                    />
                    <PerformanceMetricCard
                        label="Time to Interactive"
                        value={homePageMetrics["Time to Interactive"].averageValue}
                        status={homePageMetrics["Time to Interactive"].averageStatus}
                        unit="ms"
                    />
                </div>
            </section>
        </main>
    );
}
