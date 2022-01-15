import { Link, Text } from "components/ui";
import { usePlaying } from "lib/playing";
import { useRouter } from "next/router";
import { HTMLAttributes } from "react";
import { description } from "utils";

export interface PlayingVideoProps extends HTMLAttributes<HTMLElement> {}

export const PlayingVideo = () => {
	const { pathname } = useRouter();
	const { video, setPlaying } = usePlaying();

	return video && pathname !== "/videos/[video]" ? (
		<div className="fixed bottom-0 right-0 bg-accent-1 shadow w-full sm:w-96 flex flex-col">
			<div className="relative">
				<video
					controls
					src={
						video?.id &&
						`https://invidious.sp-codes.de/latest_version?id=${video.id}&itag=22`
					}
					poster={video.thumbnail?.url || undefined}
					playsInline
					className="w-full h-full max-h-64"
				/>
				<button
					className="absolute top-0 right-0 m-2"
					onClick={() => setPlaying(undefined)}
				>
					<Text small>Fermer</Text>
				</button>
			</div>
			<Link href={`/videos/${video.id}`} className="px-3 py-2 relative">
				<Text>{video.title}</Text>
				<Text small className="text-accent-5">
					{description([video.channel?.name])}
				</Text>
			</Link>
		</div>
	) : (
		<></>
	);
};
