import "assets/main.css";

import { Container } from "components/common";
import { FollowingProvider } from "lib/following";
import { AppProps } from "next/app";

export default function App(props: AppProps) {
	return (
		<FollowingProvider>
			<Container {...props} />
		</FollowingProvider>
	);
}
