import { Eye, EyeOff } from "components/icons";
import { Input, InputProps } from "components/ui";
import { useState } from "react";

export interface PasswordProps extends InputProps {}

export const Password = (props: PasswordProps) => {
	const [shown, setShown] = useState(false);

	const Icon = shown ? EyeOff : Eye;

	return (
		<Input
			suffix={
				<button
					className="h-full w-8 flex items-center justify-center text-accent-5 hover:text-accent-6"
					onClick={() => setShown(!shown)}
					type="button"
				>
					<Icon size="w-4 h-4" />
				</button>
			}
			type={shown ? "text" : "password"}
			{...props}
		/>
	);
};
