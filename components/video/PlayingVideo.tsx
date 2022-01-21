import { Button, Link, Text } from "components/ui";
import { usePlaying } from "lib/playing";
import { useRouter } from "next/router";
import { HTMLAttributes } from "react";
import { description, useKeypress } from "utils";
import { Player } from ".";

export interface PlayingVideoProps extends HTMLAttributes<HTMLElement> {}

export const PlayingVideo = () => {
	const { pathname } = useRouter();
	const { video, setPlaying } = usePlaying();

	useKeypress("Escape", (e) => {
		// @ts-ignore
		if (
			e.target.nodeName !== "INPUT" &&
			e.target.nodeName !== "TEXTAREA" &&
			e.key === "Escape" &&
			pathname !== "/videos/[video]"
		) {
			setPlaying(undefined);
		}
	});

	return video && pathname !== "/videos/[video]" ? (
		<div className="fixed bottom-0 right-0 bg-accent-1 shadow w-full sm:w-96 flex flex-col">
			<Player video={video} height="max-h-96" />
			<div className="px-3 py-2 relative space-y-2">
				<Link href={`/videos/${video.id}`}>
					<Text>{video.title}</Text>
					<Text small className="text-accent-5">
						{description([video.channel?.name])}
					</Text>
				</Link>
				<Button width="w-full" secondary onClick={() => setPlaying(undefined)}>
					Fermer
				</Button>
			</div>
		</div>
	) : (
		<></>
	);
};
