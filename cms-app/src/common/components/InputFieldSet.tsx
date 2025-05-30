import { Input } from "@/common/ui/input";
import { Label } from "@/common/ui/label";
import { cn } from "@/common/utils";

export interface InputFieldSetProps {
    id: string;
    label: string;
    inputProps: React.ComponentProps<"input">;
    labelProps: React.ComponentProps<"label">;
}

export const InputFieldSet = ({ id, label, inputProps, labelProps }: InputFieldSetProps) => {
    return (
        <fieldset className="space-y-2">
            <Label
                {...labelProps}
                htmlFor={id}
                className={cn("text-sm font-medium text-gray-700", labelProps.className)}
            >
                {label}
            </Label>
            <Input
                {...inputProps}
                id={id}
                className={cn(
                    "pl-10 h-12 border-2 border-gray-200",
                    "focus:border-primary focus:ring-primary/20 rounded-xl",
                    inputProps.className,
                )}
            />
        </fieldset>
    );
};
