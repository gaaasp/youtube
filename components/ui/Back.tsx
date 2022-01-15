import { useRouter } from "next/router";
import { ButtonHTMLAttributes } from "react";
import { Text } from ".";

export interface BackProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Back = (props: BackProps) => {
	const { back } = useRouter();

	return (
		<Text
			as="button"
			onClick={() => back()}
			className="text-blue hover:underline"
			{...props}
		>
			← Retour
		</Text>
	);
};
