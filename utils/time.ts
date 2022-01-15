export const getTime = (time: number) => {
	const seconds = time % 60;
	const fullMinutes = (time - seconds) / 60;
	const minutes = fullMinutes % 60;
	const hours = (fullMinutes - minutes) / 60;
	return (hours ? [hours, minutes, seconds] : [minutes, seconds])
		.map((a, i) =>
			a.toLocaleString(
				"fr-FR",
				i === 0
					? { maximumFractionDigits: 0 }
					: { minimumIntegerDigits: 2, maximumFractionDigits: 0 }
			)
		)
		.join(":");
};
