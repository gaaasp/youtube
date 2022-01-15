import { ChevronDown } from "components/icons";
import { SelectHTMLAttributes } from "react";
import { cn } from "utils";
import { Description } from ".";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	loading?: boolean;
	label?: string;
	error?: string;
	success?: string;
	width?: string;
	large?: boolean;
	selectClassName?: string;
}

export const Select = ({
	loading,
	disabled,
	label,
	error,
	success,
	width = "w-max",
	className,
	children,
	large,
	selectClassName,
	value,
	...props
}: SelectProps) => {
	if (loading) {
		disabled = true;
	}

	return (
		<Description
			titleClassName="ml-2 mb-0.5"
			title={label}
			error={error}
			success={success}
		>
			<div className={cn("relative", width, className)}>
				<select
					disabled={disabled}
					className={cn(
						"rounded-md border border-accent-2 placeholder-accent-4 appearance-none w-full",
						{
							"bg-accent-1 cursor-not-allowed text-accent-5": disabled,
							"bg-background cursor-pointer": !disabled,
						},
						large ? "h-10 pl-2.5 pr-8" : "h-8 pl-2 pr-7",
						selectClassName
					)}
					value={loading ? undefined : value}
					{...props}
				>
					{loading ? <option>Chargement...</option> : children}
				</select>
				<ChevronDown
					size="w-4 h-4"
					className="absolute right-0 top-1/2 -translate-y-1/2 mr-2 pointer-events-none text-accent-5"
				/>
			</div>
		</Description>
	);
};
