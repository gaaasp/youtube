import { Link, Text } from "components/ui";
import Image from "next/image";
import { cn, description, loader } from "utils";
import { getTime } from "utils";

export interface VideoProps {
	id: string;
	duration?: number;
	uploaded: string;
	views: number;
	channel: { id: string; name: string };
	thumbnail: { url: string; height: number; width: number };
	title: string;
	large?: boolean;
	className?: string;
	live?: boolean;
}

export const Video = ({
	id,
	duration,
	uploaded,
	views,
	channel,
	thumbnail,
	title,
	large,
	live,
	className,
}: VideoProps) => (
	<div className={className}>
		<Link
			href={`/videos/${id}`}
			className={cn(
				"space-y-2 group",
				large && "sm:flex sm:space-y-0 sm:space-x-4"
			)}
		>
			<div
				className={cn(
					"aspect-video w-full max-w-full relative",
					large && "sm:w-64 sm:min-w-64"
				)}
			>
				<Image
					loader={loader}
					src={thumbnail.url}
					objectFit="cover"
					layout="fill"
				/>
				{live ? (
					<Text
						small
						className="absolute bottom-0 right-0 m-2 bg-red text-white px-1.5 rounded"
					>
						EN DIRECT
					</Text>
				) : duration ? (
					<Text
						small
						className="absolute bottom-0 right-0 m-2 bg-opacity-75 bg-black text-white px-1.5 rounded"
					>
						{getTime(duration)}
					</Text>
				) : (
					<></>
				)}
			</div>
			<div>
				<Text className="break-words group-hover:underline">{title}</Text>
				<Text small className="text-accent-5">
					{description([
						uploaded,
						views && `${views.toLocaleString("fr-FR")} vues`,
					])}
				</Text>
				{large && (
					<Link
						className="hidden sm:inline text-sm text-accent-5 hover:text-accent-7 active:text-foreground"
						href={`/channels/${channel.id}`}
					>
						{channel.name}
					</Link>
				)}
			</div>
		</Link>
		<Link
			className={cn(
				"text-sm text-accent-5 hover:text-accent-7 active:text-foreground",
				large && "sm:hidden"
			)}
			href={`/channels/${channel.id}`}
		>
			{channel.name}
		</Link>
	</div>
);
