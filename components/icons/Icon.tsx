import { SVGAttributes } from "react";
import { cn } from "utils";

export interface IconProps extends SVGAttributes<SVGSVGElement> {
	size: string;
}

export const Icon = ({ size, className, ...rest }: IconProps) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		stroke="currentColor"
		strokeWidth=".125rem"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={cn(size, className)}
		{...rest}
	/>
);
