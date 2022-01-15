import { ButtonHTMLAttributes, ElementType } from "react";
import { cn } from "utils";
import { Description, Link, LoadingDots } from ".";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	href?: string;
	loading?: boolean;
	disabled?: boolean;
	large?: boolean;
	width?: string;
	error?: string;
	success?: string;
	as?: ElementType;
	color?: "blue" | "red";
	secondary?: boolean;
	download?: string;
}

export const Button = ({
	loading,
	disabled,
	as,
	href,
	error,
	success,
	children,
	className,
	width = "w-max",
	large,
	color,
	secondary,
	download,
	...props
}: ButtonProps) => {
	if (loading) {
		disabled = true;
	}

	const classNames = cn(
		"flex relative items-center rounded-md justify-center border transition duration-200 font-normal",
		large ? "h-10 min-h-10 max-h-10 px-3" : "h-8 min-h-8 max-h-8 px-2.5",
		disabled
			? "border-accent-2 text-accent-5 bg-accent-1 cursor-not-allowed"
			: [
					"cursor-pointer active:bg-accent-1",
					{
						"text-white": color,
						"hover:bg-background": !secondary,
						"text-background bg-foreground border-foreground hover:text-foreground active:text-foreground":
							!secondary && !color,
						"border-accent-2 hover:border-accent-3 active:border-accent-3 text-accent-7 hover:text-foreground active:text-foreground":
							secondary,
					},
					!secondary && {
						"bg-blue border-blue hover:text-blue active:text-blue":
							color === "blue",
						"bg-red border-red hover:text-red active:text-red": color === "red",
					},
			  ],
		width,
		className
	);

	const Component =
		download && !disabled ? "a" : href && !disabled ? Link : as || "button";

	return (
		<Description error={error} success={success}>
			<Component
				disabled={disabled}
				className={classNames}
				href={href}
				download={download}
				{...props}
			>
				<span className={cn("max-w-full truncate", { "opacity-0": loading })}>
					{children}
				</span>
				{loading && (
					<LoadingDots className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
				)}
			</Component>
		</Description>
	);
};
