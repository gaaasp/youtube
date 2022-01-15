import { AlertOctagon, CheckCircle } from "components/icons";
import { cn } from "utils";
import { Text, TextProps } from ".";

export interface DescriptionProps extends TextProps {
	title?: string;
	titleClassName?: string;
	error?: string;
	success?: string;
}

export const Description = ({
	title,
	titleClassName,
	error,
	success,
	children,
	className,
	...props
}: DescriptionProps) => {
	const Icon = success ? CheckCircle : AlertOctagon;

	return title || error || success ? (
		<div className={cn("flex flex-col", className)}>
			{title && (
				<Text bold xSmall className={cn("text-accent-5", titleClassName)}>
					{title.toLocaleUpperCase()}
				</Text>
			)}
			{typeof children === "string" ? (
				<Text {...props}>{children}</Text>
			) : (
				children
			)}
			{(error || success) && (
				<div
					className={cn(
						"flex items-center space-x-2 mt-1",
						success ? "text-green" : "text-red"
					)}
				>
					<Icon size="w-5 h-5" />
					<Text>{success || error}</Text>
				</div>
			)}
		</div>
	) : (
		<>{children}</>
	);
};
