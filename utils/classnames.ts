export type Classname = string | { [key: string]: any } | Classname[];

export const cn = (...args: Classname[]) =>
	args
		.map(
			(item) =>
				item &&
				(Array.isArray(item)
					? cn(...item)
					: typeof item === "object"
					? Object.entries(item)
							.filter(([_key, value]) => value)
							.map(([key]) => key)
							.join(" ")
					: item)
		)
		.filter((a) => a)
		.join(" ");
