import { Tab } from "components/ui";
import { AppProps } from "next/app";
import { cn } from "utils";
import { Header } from ".";

export interface ContainerProps extends AppProps {}

export const Container = ({ Component, pageProps }: ContainerProps) => {
	const tabs: Tab[] = [];

	return (
		<div
			className={cn(
				"w-full h-max min-h-full flex flex-col",
				(!tabs || tabs.length) && "bg-accent-1 print:bg-background"
			)}
		>
			<Header tabs={tabs} />
			<Component {...pageProps} />
		</div>
	);
};
