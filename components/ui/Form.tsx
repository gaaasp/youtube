import { Dispatch, SetStateAction, useState } from "react";

export interface FormProps<Value> {
	value: Value;
	disabled(value: Value): {
		[key in keyof Value]?: { [key: string]: boolean };
	};
	errors: { [key: string]: string };
	className?: string;
	onSubmit(data: {
		value: Value;
		setSuccess: Dispatch<SetStateAction<string>>;
	}): Promise<any>;
	children(data: {
		value: Value;
		setValue: Dispatch<SetStateAction<Value>>;
		setField(key: keyof Value, value: any): void;
		disabled: boolean;
		submitting: boolean;
		errors: { [key in keyof Value | "global"]?: string };
		success: string;
	}): JSX.Element;
}

export const Form = <Value,>({
	value: savedValue,
	disabled: disabledFunction,
	errors: errorMessages,
	onSubmit,
	children,
	...props
}: FormProps<Value>) => {
	const [v, setValue] = useState<Value>();
	const value = v || savedValue || ({} as Value);
	const [submitting, setSubmitting] = useState(false);
	const [touched, setTouched] = useState<string[]>([]);
	const [errorStatus, setErrorStatus] = useState("");
	const [success, setSuccess] = useState("");

	const setField = (key: keyof Value, fieldValue: any) =>
		setValue({ ...value, [key]: fieldValue });

	const errorsObject = Object.entries(disabledFunction(value)).reduce(
		(obj, [key, v]: [string, any]) => {
			const firstError =
				value && (Object.entries(v).find(([_key, value]) => value) || [])[0];
			return {
				...obj,
				[key === "empty" ? "Ce champ ne doit pas être vide" : key]:
					firstError === "empty"
						? "Ce champ ne doit pas être vide"
						: firstError,
			};
		},
		{}
	);

	const errors = {
		...Object.fromEntries(
			Object.entries(errorsObject).filter(([key]) =>
				touched.find((name) => name === key)
			)
		),
		global:
			errorMessages[errorStatus] ||
			errorsObject["global"] ||
			(errorStatus && "Une erreur s'est produite"),
	};

	const disabled =
		!!Object.values(errorsObject).find((value) => value) ||
		!savedValue ||
		!Object.entries(savedValue).find(([key, v]) => value[key] !== v);

	return (
		<form
			aria-disabled={disabled}
			onSubmit={(e) => {
				e.preventDefault();
				setSubmitting(true);
				setErrorStatus("");
				setSuccess("");
				onSubmit({ value, setSuccess })
					.then(() => setSubmitting(false))
					.catch((status) => {
						setErrorStatus(status);
						setSubmitting(false);
					});
			}}
			onBlurCapture={({ target }) => {
				if (!touched.find((name) => name === target.name)) {
					setTouched([...touched, target.name]);
				}
			}}
			onInput={({ target }: any) => {
				if (target.name) {
					setField(target.name, target.value);
				}
			}}
			{...props}
		>
			{children({
				value,
				setValue,
				setField,
				disabled,
				submitting,
				errors,
				success,
			})}
		</form>
	);
};
