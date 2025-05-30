import { Card, CardContent, CardHeader, CardTitle } from "@/common/ui/card";
import { cn } from "@/common/utils";
import { getStatusColor, type Status } from "@/domains/dashboard/utils/getStatusColor";

interface PerformanceMetricCardProps {
    label: string;
    value: number;
    unit: string;
    status: Status;
}

export const PerformanceMetricCard = ({
    label,
    value,
    status,
    unit,
}: PerformanceMetricCardProps) => {
    const statusColor = getStatusColor(status);

    return (
        <Card className="overflow-hidden border border-gray-300 bg-white shadow-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{label}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">
                        {value.toFixed(2)}
                        <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>
                    </div>
                    <div
                        className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            statusColor.background,
                            statusColor.text,
                        )}
                    >
                        {status}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
