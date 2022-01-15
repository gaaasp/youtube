import { Text, TextProps } from ".";

export interface LogoProps extends TextProps {
	custom?: boolean;
}

export const Logo = ({ custom, ...props }: LogoProps) => (
	<Text h2={!custom} as="span" bold {...props}>
		You
		<Text className="text-red" as="span">
			Tube
		</Text>
	</Text>
);
