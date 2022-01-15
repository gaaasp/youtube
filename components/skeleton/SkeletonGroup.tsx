import { HTMLAttributes } from "react";
import { cn } from "utils";

export interface SkeletonGroupProps extends HTMLAttributes<HTMLElement> {}

export const SkeletonGroup = ({ className, ...props }: SkeletonGroupProps) => (
	<div className={cn("animate-pulse", className)} {...props} />
);
