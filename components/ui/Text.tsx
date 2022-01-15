import { ElementType, Fragment, HTMLAttributes } from "react";
import { cn } from "utils";

export interface TextProps extends HTMLAttributes<HTMLElement> {
	as?: ElementType;
	h1?: boolean;
	h2?: boolean;
	h3?: boolean;
	h4?: boolean;
	h5?: boolean;
	large?: boolean;
	small?: boolean;
	xSmall?: boolean;
	bold?: boolean;
	italic?: boolean;
}

export const Text = ({
	as,
	h1,
	h2,
	h3,
	h4,
	h5,
	large,
	small,
	xSmall,
	bold,
	italic,
	className,
	children,
	...props
}: TextProps) => {
	const Component =
		as || (h1 ? "h1" : h2 ? "h2" : h3 ? "h3" : h4 ? "h4" : h5 ? "h5" : "p");
	return (
		<Component
			className={cn(
				{
					"text-3xl font-medium": h1,
					"text-2xl font-medium": h2,
					"text-xl font-medium": h3,
					"text-lg font-medium": h4,
					"text-base font-medium": h5,
					"text-lg": large,
					"text-sm": small,
					"text-xs": xSmall,
					"font-medium": bold,
					italic,
				},
				className
			)}
			{...props}
		>
			{typeof children === "string"
				? children?.split("\n")?.map((text, i) =>
						i === 0 ? (
							text
						) : (
							<Fragment key={i}>
								<br />
								{text}
							</Fragment>
						)
				  )
				: children}
		</Component>
	);
};
