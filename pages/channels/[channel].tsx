import { Wrapper } from "components/common";
import { Button, Link, Text } from "components/ui";
import { Video } from "components/video";
import { getChannel } from "lib";
import { useFollowing } from "lib/following";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { Channel as ChannelType } from "types";
import { cn, loader } from "utils";

export default function Channel({ channel }: { channel: ChannelType }) {
	const { following, follow, unfollow } = useFollowing();

	const followed = following?.find((id) => id === channel?.id);

	return (
		<Wrapper custom title={channel?.name || "Chaîne"}>
			{channel?.banner.desktop && (
				<div className="relative w-full aspect-[581/159] sm:aspect-[775/128] bg-accent-2">
					<Image
						loader={loader}
						src={channel.banner.desktop.url}
						layout="fill"
						objectFit="cover"
						className="!hidden sm:!inline"
					/>
					<Image
						loader={loader}
						src={channel.banner.mobile.url}
						layout="fill"
						objectFit="cover"
						className="sm:!hidden"
					/>
				</div>
			)}
			<div className="w-full max-w-6xl mx-auto p-4 relative space-y-4">
				<div>
					{channel?.thumbnail && (
						<div
							className={cn(
								"relative w-32 h-32 rounded-full overflow-hidden border-8 border-accent-1",
								channel?.banner.desktop && "-mt-16"
							)}
						>
							<Image
								loader={loader}
								src={channel.thumbnail.url}
								layout="fill"
							/>
						</div>
					)}
					{channel && (
						<div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
							<div>
								<Text h1>{channel?.name}</Text>
								{!!channel?.subscribers && (
									<Text className="text-accent-5">{channel.subscribers}</Text>
								)}
							</div>
							<Button
								width="w-full sm:w-max"
								large
								color="red"
								secondary={!!followed}
								onClick={() => (followed ? unfollow : follow)(channel.id)}
							>
								{followed ? "Se désabonner" : "S'abonner"}
							</Button>
						</div>
					)}
				</div>
				{channel?.shelves?.map(({ title, subtitle, items }, i) => (
					<div key={i} className="space-y-2 w-full">
						<div>
							<Text h3 as="h2">
								{title}
							</Text>
							{subtitle && <Text className="text-accent-5">{subtitle}</Text>}
						</div>
						<div className="flex space-x-4 snap-x snap-mandatory w-full overflow-auto">
							{items.map((item) =>
								item?.type === "video" ? (
									<Video
										key={item.id}
										className="w-64 min-w-64 snap-left"
										{...item}
									/>
								) : item?.type === "playlist" ? (
									<Link
										key={item.id}
										className="space-y-2 group w-64 min-w-64 snap-left"
										href={`/playlists/${item.id}`}
									>
										<div className="aspect-video w-full max-w-full min-w-full relative">
											<Image
												loader={loader}
												src={item.thumbnail.url}
												objectFit="cover"
												layout="fill"
											/>
										</div>
										<Text className="break-words group-hover:underline">
											{item.title}
										</Text>
									</Link>
								) : item?.type === "channel" ? (
									<Link
										key={item.id}
										href={`/channels/${item.id}`}
										className="flex flex-col items-center space-y-1 group"
									>
										<div className="relative overflow-hidden rounded-full w-32 min-w-32 h-32 min-h-32">
											<Image
												loader={loader}
												src={
													item.thumbnail.url.startsWith("//")
														? "https:" + item.thumbnail.url
														: item.thumbnail.url
												}
												objectFit="cover"
												layout="fill"
											/>
										</div>
										<Text className="text-center group-hover:underline">
											{item.name}
										</Text>
									</Link>
								) : (
									<></>
								)
							)}
						</div>
					</div>
				))}
				{!!channel?.videos?.length && (
					<div className="space-y-2">
						<Text h3 as="h2">
							Vidéos
						</Text>
						<div className="flex space-x-4 snap-x snap-mandatory w-full overflow-auto">
							{channel.videos.map((video) => (
								<Video className="w-64 min-w-64 snap-left" {...video} />
							))}
						</div>
					</div>
				)}
				{!!channel?.playlists?.length && (
					<div className="space-y-2 w-full">
						<Text h3 as="h2">
							Playlists
						</Text>
						<div className="flex space-x-4 snap-x snap-mandatory w-full overflow-auto">
							{channel.playlists.map(({ title, id, thumbnail }) => (
								<Link
									className="space-y-2 group w-64 min-w-64 snap-left"
									href={`/playlists/${id}`}
								>
									<div className="aspect-video w-full max-w-full min-w-full relative">
										<Image
											loader={loader}
											src={thumbnail.url}
											objectFit="cover"
											layout="fill"
										/>
									</div>
									<Text className="break-words group-hover:underline">
										{title}
									</Text>
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</Wrapper>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const data = await getChannel(context.params.channel?.toString());

	return { props: { channel: data || null }, revalidate: 10 };
};

export const getStaticPaths: GetStaticPaths = () => {
	return { paths: [], fallback: true };
};
