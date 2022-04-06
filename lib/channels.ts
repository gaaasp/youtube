import { Channel as ChannelType } from "types";
import { parseStringPromise } from "xml2js";
import {
	ChannelCompact,
	Client,
	PlaylistCompact,
	VideoCompact,
} from "youtubeapi";

export const getChannel = (id: string): Promise<ChannelType> =>
	new Client().getChannel(`${id}`).then(async (channel) => {
		await channel.nextPlaylists();
		await channel.nextVideos();

		return {
			videos:
				channel.videos
					?.map(
						({
							id,
							title,
							thumbnails,
							uploadDate,
							duration,
							isLive,
							viewCount,
						}: any) => ({
							id,
							title,
							thumbnail:
								(thumbnails &&
									thumbnails[thumbnails.length - 1]) ||
								null,
							uploaded: uploadDate || "",
							duration: duration || null,
							live: !!(isLive || !duration),
							views: viewCount || null,
							channel: channel
								? {
										id: channel?.id || null,
										name: channel?.name || null,
								  }
								: null,
						})
					)
					.filter(({ channel }) => channel?.id && channel?.name) ||
				null,
			playlists:
				channel.playlists?.map(({ id, title, thumbnails }) => ({
					id,
					title,
					thumbnail:
						(thumbnails && thumbnails[thumbnails.length - 1]) ||
						null,
				})) || null,
			id: channel.id,
			name: channel.name,
			thumbnail:
				(channel?.thumbnails &&
					channel.thumbnails[channel.thumbnails.length - 1]) ||
				null,
			subscribers: channel.subscriberCount || null,
			banner: {
				desktop:
					(channel.banner &&
						channel.banner[channel.banner.length - 1]) ||
					null,
				mobile:
					(channel.mobileBanner &&
						channel.mobileBanner[
							channel.mobileBanner.length - 1
						]) ||
					(channel.banner &&
						channel.banner[channel.banner.length - 1]) ||
					null,
				tv:
					(channel.tvBanner &&
						channel.tvBanner[channel.tvBanner.length - 1]) ||
					(channel.banner &&
						channel.banner[channel.banner.length - 1]) ||
					(channel.banner &&
						channel.banner[channel.banner.length - 1]) ||
					null,
			},
			shelves: channel.shelves
				.filter(({ title }) => title !== "Uploads")
				.map(({ title, subtitle, items }) => ({
					title: title || null,
					subtitle: subtitle || null,
					items: items?.map((result) => {
						if (result instanceof VideoCompact) {
							return {
								id: result.id,
								title: result.title,
								thumbnail:
									(result?.thumbnails &&
										result.thumbnails[
											result.thumbnails.length - 1
										]) ||
									null,
								uploaded: result.uploadDate || "",
								duration: result.duration || null,
								live: !!result.isLive,
								views: result.viewCount || null,
								channel: channel
									? {
											id: channel?.id || null,
											name: channel?.name || null,
									  }
									: null,
								type: "video",
							};
						}
						if (result instanceof ChannelCompact) {
							return {
								name: result.name,
								id: result.id,
								thumbnail:
									(result?.thumbnails &&
										result.thumbnails[
											result.thumbnails.length - 1
										]) ||
									null,
								type: "channel",
							};
						}
						if (result instanceof PlaylistCompact) {
							return {
								id: result.id,
								title: result.title,
								thumbnail:
									(result?.thumbnails &&
										result.thumbnails[
											result.thumbnails.length - 1
										]) ||
									null,
								type: "playlist",
							};
						}
						return null;
					}),
				}))
				.filter(({ items }) => items?.length),
		};
	});

export const getXMLChannel = (id: string) =>
	fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${id}`)
		.then((res) => res.text())
		.then((text) =>
			parseStringPromise(text).then((value) => {
				const id = value.feed["yt:channelId"][0];
				const name = value.feed.author[0].name[0];
				const creation = value.feed.published[0];
				const videos = value.feed.entry.map((video) => ({
					id: video["yt:videoId"][0],
					title: video.title[0],
					uploaded: video.published[0],
					updated: video.updated[0],
					thumbnail: video["media:group"][0]["media:thumbnail"][0].$,
					description:
						video["media:group"][0]["media:description"][0],
					views: parseInt(
						video["media:group"][0]["media:community"][0][
							"media:statistics"
						][0].$.views
					),
					likes: parseInt(
						video["media:group"][0]["media:community"][0][
							"media:starRating"
						][0].$.count
					),
					channel: {
						name,
						id,
					},
				}));
				return { id, name, creation, videos };
			})
		);
