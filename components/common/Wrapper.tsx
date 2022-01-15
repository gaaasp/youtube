import { Back } from "components/ui";
import { HTMLAttributes } from "react";
import { cn } from "utils";
import { SEO } from ".";

export interface WrapperProps extends HTMLAttributes<HTMLElement> {
	title: string;
	header?: JSX.Element;
	back?: boolean;
	custom?: boolean;
}

export const Wrapper = ({
	children,
	className,
	title,
	back,
	header,
	custom,
	...props
}: WrapperProps) => (
	<>
		<SEO title={title} />
		<article className="w-full flex-1 flex flex-col">
			{header && (
				<header className="w-full bg-background border-b border-accent-2">
					<div className="w-full max-w-6xl mx-auto p-4">
						{back && <Back />}
						{header}
					</div>
				</header>
			)}
			<main
				className={cn(
					"space-y-1 flex-1",
					!custom && "w-full max-w-6xl mx-auto p-4"
				)}
			>
				{back && !header && <Back />}
				<div className={cn("w-full", className)} {...props}>
					{children}
				</div>
			</main>
		</article>
	</>
);
