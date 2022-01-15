import { HTMLAttributes } from "react";
import { cn } from "utils";

export interface SkeletonProps extends HTMLAttributes<HTMLElement> {
	rounded?: boolean | string;
}

export const Skeleton = ({ rounded, className, ...props }: SkeletonProps) => (
	<div
		className={cn(
			"bg-accent-3",
			{ "rounded-full": rounded === true, rounded: !rounded },
			typeof rounded === "string" && rounded,
			className
		)}
		{...props}
	/>
);
