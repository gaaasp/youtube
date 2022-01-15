import { Skeleton, SkeletonGroup } from "components/skeleton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cn } from "utils";
import { Link } from ".";

export type Tab = {
	name: string;
	path: string;
	as?: string;
	notifications?: number;
	hidden?: boolean;
	alts?: string[];
};

export interface TabsProps {
	tabs: Tab[];
}

export const Tabs = ({ tabs }: TabsProps) => {
	const { pathname, asPath } = useRouter();
	const selected = tabs?.find(
		({ path, as, alts }) =>
			path === pathname ||
			as === asPath ||
			alts?.find((alt) => alt === pathname)
	);

	const [selectedHTML, setSelectedHTML] = useState<HTMLElement>();

	useEffect(() => {
		setSelectedHTML(
			selected && document.getElementById(`nav-${selected.path}`)
		);
	}, [selected]);

	return (
		<nav className="w-full max-w-6xl px-4 mx-auto overflow-auto relative">
			{selectedHTML && (
				<div
					className="absolute bottom-0 h-0.5 bg-foreground transition"
					style={{
						width: selectedHTML.offsetWidth,
						transform: `translateX(${selectedHTML.offsetLeft - 16}px)`,
					}}
				/>
			)}
			{tabs ? (
				<ul className="flex">
					{tabs
						.filter(({ hidden }) => !hidden)
						.map(({ path, as, name, notifications }, i) => (
							<li key={i} className="pr-4">
								<Link
									id={`nav-${path}`}
									href={as || path}
									className={cn(
										"h-12 flex items-center whitespace-nowrap",
										selected?.path === path
											? "text-foreground"
											: "text-accent-5 hover:text-accent-7 active:text-foreground"
									)}
								>
									{notifications
										? `${name} (${notifications.toLocaleString()})`
										: name}
								</Link>
							</li>
						))}
				</ul>
			) : (
				<SkeletonGroup className="flex h-12 items-center">
					{[undefined, undefined, undefined, undefined].map((_, i) => (
						<div key={i} className="pr-4">
							<Skeleton
								className="h-7"
								style={{
									width: `${4 + Math.E ** (i / 4) - i / 3}rem`,
								}}
							/>
						</div>
					))}
				</SkeletonGroup>
			)}
		</nav>
	);
};
