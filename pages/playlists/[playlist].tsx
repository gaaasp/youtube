import { Wrapper } from "components/common";
import { Link, Text } from "components/ui";
import { Video } from "components/video";
import { getPlaylist } from "lib";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { description, loader } from "utils";

export default function Playlist({ playlist }) {
	return (
		<Wrapper back title={playlist?.title || "Playlist"} className="space-y-4">
			<div className="space-y-2">
				<div>
					<Text h1>{playlist?.title}</Text>
					<Text className="text-accent-5">
						{description([
							playlist?.updated,
							playlist?.views &&
								`${playlist.views.toLocaleString("fr-FR")} vues`,
							playlist?.videoCount &&
								`${playlist.videoCount.toLocaleString("fr-FR")} vidéos`,
						])}
					</Text>
				</div>
				{playlist?.channel && (
					<Link
						href={`/channels/${playlist?.channel?.id}`}
						className="flex items-center space-x-4 group"
					>
						{playlist?.channel?.thumbnail && (
							<div className="relative w-12 h-12 overflow-hidden rounded-full">
								<Image
									loader={loader}
									layout="fill"
									src={playlist.channel.thumbnail.url}
								/>
							</div>
						)}
						<Text className="group-hover:underline">
							{playlist?.channel?.name}
						</Text>
					</Link>
				)}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
				{playlist?.videos?.map((props) => (
					<Video {...props} />
				))}
			</div>
		</Wrapper>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const data = await getPlaylist(context.params.playlist?.toString());

	return { props: { playlist: data }, revalidate: 10 };
};

export const getStaticPaths: GetStaticPaths = () => {
	return { paths: [], fallback: true };
};
