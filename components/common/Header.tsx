import { Search } from "components/input";
import { Form, Link, Logo, Tab, Tabs } from "components/ui";
import { useRouter } from "next/router";
import { HTMLAttributes, useState } from "react";
import { cn } from "utils";

export interface HeaderProps extends HTMLAttributes<HTMLHeadingElement> {
	tabs: Tab[];
}

export const Header = ({ tabs, ...props }: HeaderProps) => {
	const { query, push } = useRouter();

	return (
		<header
			className={cn(
				"w-full sticky top-0 z-10 bg-background",
				(!tabs || tabs.length) && "border-b border-accent-2"
			)}
			{...props}
		>
			<div className="w-full max-w-6xl mx-auto px-4 sm:flex space-y-2 sm:space-y-0 sm:items-center sm:justify-between py-2">
				<Link href="/">
					<Logo />
				</Link>
				<Form
					disabled={({ search }) => ({
						search: { empty: !search },
					})}
					onSubmit={async ({ value }) =>
						value.search && push(`/search/${encodeURIComponent(value.search)}`)
					}
					errors={{}}
					value={{ search: query.search?.toString() || "" }}
					className="flex-1 flex justify-end"
				>
					{({ value, setField }) => (
						<Search
							onChange={({ target }) => setField("search", target.value)}
							value={value.search}
							name="search"
							width="w-full sm:max-w-xs"
						/>
					)}
				</Form>
			</div>
			<Tabs tabs={tabs} />
		</header>
	);
};
