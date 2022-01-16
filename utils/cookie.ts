export const parseCoookie = (cookie: string) =>
	Object.fromEntries(
		cookie
			.split(";")
			.map((a) => [a.split("=")[0].trim(), decodeURIComponent(a.split("=")[1])])
	);

export const stringifyCookie = (cookie: { [key: string]: string }) =>
	Object.entries(cookie)
		.map(([key, value]) =>
			[
				[key, encodeURIComponent(value)],
				["expires", "Mon, 18 Dec 2023 12:00:00 UTC"],
				["path", "/"],
				["SameSite", "Strict"],
			]
				.map((a) => a.join("="))
				.join(";")
		)
		.join(";");
