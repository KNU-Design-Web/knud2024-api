import { Card, CardContent, CardHeader, CardTitle } from "@/common/ui/card";
import { ArrowUpRight, ArrowDownRight, Users } from "lucide-react";

interface VisitorStatsProps {
    total: number;
    today: number;
    thisWeek: number;
    percentChange: number;
}

export function VisitorStats({
    total,
    today,
    thisWeek,
    percentChange: percentChange,
}: VisitorStatsProps) {
    const isPositiveChange = percentChange >= 0;

    return (
        <Card className="bg-white border-gray-300 shadow-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                    <Users className="mr-2 h-5 w-5 bg-light-green" />
                    방문자 통계
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <p className="text-sm text-gray-500">총 방문자</p>
                        <p className="text-3xl font-bold">{total.toLocaleString()}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-gray-500">오늘 방문자</p>
                        <p className="text-2xl font-semibold">{today.toLocaleString()}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-gray-500">이번 주 방문자</p>
                        <div className="flex items-center">
                            <p className="text-2xl font-semibold">{thisWeek.toLocaleString()}</p>
                            <div
                                className={`ml-2 flex items-center ${isPositiveChange ? "text-green-500" : "text-red-500"}`}
                            >
                                {isPositiveChange ? (
                                    <ArrowUpRight className="h-4 w-4" />
                                ) : (
                                    <ArrowDownRight className="h-4 w-4" />
                                )}
                                <span className="text-sm font-medium">
                                    {Math.abs(percentChange)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
