export type Status = "Good" | "Needs Improvement" | "Poor";

export function getStatusColor(status: Status) {
    switch (status) {
        case "Good":
            return { text: "text-green-500", background: "bg-green-100" };
        case "Needs Improvement":
            return { text: "text-amber-500", background: "bg-amber-100" };
        case "Poor":
            return { text: "text-red-500", background: "bg-red-100" };
    }
}
