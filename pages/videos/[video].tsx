import { Wrapper } from "components/common";
import { Button, Description, Link, Text } from "components/ui";
import { Video as RelatedVideo } from "components/video";
import { getVideo } from "lib";
import { useFollowing } from "lib/following";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { Video as VideoType } from "types";
import { cn, description } from "utils";

export default function Video({ video }: { video: VideoType }) {
	const { following, follow, unfollow } = useFollowing();
	const followed = following?.find((id) => id === video?.channel?.id);

	return (
		<Wrapper
			title={video?.title || "Vidéo"}
			className="sm:flex space-y-4 sm:space-y-0 sm:space-x-4"
			back
		>
			<div className="space-y-4 sm:flex-1">
				<div className="space-y-4 w-full">
					<div className="w-full max-w-full bg-accent-2 relative">
						{video && (
							<video
								controls
								src={
									video?.id &&
									`https://invidious.sp-codes.de/latest_version?id=${video.id}&itag=22`
								}
								poster={video.thumbnail?.url || undefined}
								playsInline
								className="w-full h-full max-h-[40rem]"
							/>
						)}
					</div>
					<div className="space-y-1">
						<div>
							<div className="flex flex-wrap">
								{video?.tags.map((tag, i) => (
									<Link
										key={tag}
										href={
											tag.endsWith(" DES TENDANCES")
												? "/trends"
												: tag.endsWith(" DES TENDANCES DES JEUX VIDÉO")
												? "/trends/gaming"
												: tag.endsWith(" DES TENDANCES MUSIQUE")
												? "/trends/music"
												: `/tags/${tag}`
										}
										className={cn(i !== video.tags.length - 1 && "mr-2")}
									>
										<Text
											small
											className="text-blue hover:underline active:underline"
										>
											#{tag}
										</Text>
									</Link>
								))}
							</div>
							<Text h2 as="h1">
								{video?.title}
							</Text>
						</div>
						<Text small className="text-accent-5">
							{description([
								video?.views &&
									(video.watching
										? `${video.watching.toLocaleString("fr-FR")} ${
												video.live ? "regardent" : "attendent"
										  }`
										: `${video.views.toLocaleString("fr-FR")} vues`),
								video?.uploaded,
								video?.likes && `${video.likes.toLocaleString("fr-FR")} aiment`,
							])}
						</Text>
					</div>
					{video?.channel && (
						<div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
							<Link
								className="flex items-center space-x-2 group"
								href={`/channels/${video.channel.id}`}
							>
								<div className="relative h-12 w-12 min-w-12 min-h-12 rounded-full overflow-hidden">
									<Image
										src={video.channel.thumbnail.url}
										className="w-full h-full"
										objectFit="fill"
										layout="fill"
									/>
								</div>
								<Text className="group-hover:underline">
									{video.channel.name}
								</Text>
							</Link>
							<Button
								width="w-full sm:w-max"
								large
								color="red"
								secondary={!!followed}
								onClick={() => (followed ? unfollow : follow)(video.channel.id)}
							>
								{followed ? "Se désabonner" : "S'abonner"}
							</Button>
						</div>
					)}
					{video?.id && (
						<Button
							width="w-full"
							href={`https://invidious.sp-codes.de/latest_version?id=${video.id}&itag=22`}
							download={video.title}
							secondary
						>
							Télécharger
						</Button>
					)}
					{video?.description && (
						<Text
							className="text-sm"
							dangerouslySetInnerHTML={{
								__html: video.description
									.replace(
										/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g,
										'<a target="_blank" class="text-blue hover:underline" href="$1://$2$3">$2$3</a>'
									)
									.replace(/\n/g, "<br />"),
							}}
						/>
					)}
				</div>
				{!!video?.comments?.length && (
					<div className="space-y-2 hidden sm:block">
						<Text h3 as="h2">
							Commentaires
						</Text>
						<div className="space-y-4">
							{video.comments.map(
								({ content, author, id, published, pinned, replies }) => (
									<div key={id} className="flex space-x-4">
										<Link
											href={`/channels/${author?.id}`}
											className="relative h-8 w-8 min-w-8 min-h-8 rounded-full overflow-hidden mt-3"
										>
											{author?.thumbnail?.url && (
												<Image
													src={author.thumbnail.url}
													height={author.thumbnail.height}
													width={author.thumbnail.width}
												/>
											)}
										</Link>
										<Description
											small
											title={description([
												pinned && "Épinglé",
												author?.name,
												published,
												replies &&
													`${replies.toLocaleString("fr-FR")} réponses`,
											])}
										>
											{content}
										</Description>
									</div>
								)
							)}
						</div>
					</div>
				)}
			</div>
			<div className="w-full sm:w-64 space-y-4">
				{video?.related?.map((props) => (
					<RelatedVideo {...props} />
				))}
			</div>
		</Wrapper>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const data = await getVideo(context.params.video?.toString());

	return { props: { video: data }, revalidate: 10 };
};

export const getStaticPaths: GetStaticPaths = () => {
	return { paths: [], fallback: true };
};
