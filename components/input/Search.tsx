import { Search as SearchIcon, XCircle } from "components/icons";
import { Input, InputProps } from "components/ui";

export interface SearchProps extends InputProps {}

export const Search = ({ value, onChange, ...props }: SearchProps) => (
	<Input
		prefix={
			<div className="h-full pl-2 flex items-center justify-center text-accent-5">
				<SearchIcon size="w-4 h-4" />
			</div>
		}
		suffix={
			value && (
				<button
					type="button"
					className="h-full w-8 flex items-center justify-center text-accent-5 hover:text-accent-6"
					onClick={() =>
						onChange &&
						onChange({
							// @ts-ignore
							target: {
								value: "",
							},
						})
					}
				>
					<XCircle size="w-4 h-4" />
				</button>
			)
		}
		value={value}
		onChange={onChange}
		placeholder="Rechercher"
		{...props}
	/>
);
