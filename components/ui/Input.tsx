import { InputHTMLAttributes } from "react";
import { cn } from "utils";
import { Description } from ".";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	success?: string;
	prefix?: JSX.Element | any;
	suffix?: JSX.Element;
	width?: string;
	large?: boolean;
}

export const Input = ({
	label,
	error,
	success,
	prefix,
	suffix,
	width = "w-full",
	placeholder,
	className,
	large,
	...props
}: InputProps) => (
	<Description
		title={label}
		error={error}
		success={success}
		titleClassName="ml-2 mb-0.5"
	>
		<div
			className={cn(
				"bg-background border border-accent-2 rounded-md flex focus-within:border-accent-3 transition-colors duration-200",
				large ? "h-10" : "h-8",
				width,
				className
			)}
		>
			{prefix}
			<input
				aria-label={label || placeholder}
				placeholder={placeholder || label}
				className={cn(
					"bg-transparent placeholder-accent-4 h-full w-0 flex-1",
					large ? "px-2.5" : "px-2"
				)}
				{...props}
			/>
			{suffix}
		</div>
	</Description>
);
