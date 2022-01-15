import { HTMLAttributes } from "react";
import { cn } from "utils";

export interface LoadingDotsProps extends HTMLAttributes<HTMLElement> {}

export const LoadingDots = ({ className, ...props }: LoadingDotsProps) => (
	<div className={cn("flex space-x-1", className)} {...props}>
		<span
			className="w-1.5 h-1.5 rounded-full animate-bounce bg-accent-3"
			style={{ animationDelay: "0.1s" }}
		/>
		<span
			className="w-1.5 h-1.5 rounded-full animate-bounce bg-accent-3"
			style={{ animationDelay: "0.2s" }}
		/>
		<span
			className="w-1.5 h-1.5 rounded-full animate-bounce bg-accent-3"
			style={{ animationDelay: "0.3s" }}
		/>
	</div>
);
