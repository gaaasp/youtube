import "assets/main.css";

import { Container } from "components/common";
import { FollowingProvider } from "lib/following";
import { PlayingProvider } from "lib/playing";
import { AppProps } from "next/app";

export default function App(props: AppProps) {
	return (
		<FollowingProvider>
			<PlayingProvider>
				<Container {...props} />
			</PlayingProvider>
		</FollowingProvider>
	);
}
