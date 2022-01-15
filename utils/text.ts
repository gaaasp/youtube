export const capitalize = (text: string) =>
	text[0].toLocaleUpperCase("fr-FR") + text.slice(1);

export const description = (texts: string[], separator: string = "-") =>
	texts?.filter((a) => a).join(` ${separator} `);
