export const getTime = (time: number) => {
	const seconds = time % 60;
	const fullMinutes = (time - seconds) / 60;
	const minutes = fullMinutes % 60;
	const hours = (fullMinutes - minutes) / 60;
	return [hours, minutes, seconds]
		.filter((a) => a)
		.map((a, i) =>
			a.toLocaleString("fr-FR", i === 0 ? {} : { minimumIntegerDigits: 2 })
		)
		.join(":");
};
