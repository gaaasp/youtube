import { Client } from "youtubeapi";

export const getPlaylist = (id: string) =>
	new Client().getPlaylist(id).then(async (playlist: any) => {
		await playlist.next(0);

		const { videos, id, title, videoCount, viewCount, lastUpdatedAt, channel } =
			playlist;
		return {
			id,
			title,
			videoCount,
			views: viewCount || null,
			updated: lastUpdatedAt || null,
			videos: videos.map(
				({
					id,
					title,
					thumbnails,
					uploadDate,
					duration,
					isLive,
					viewCount,
					channel: c,
				}: any) => ({
					id,
					title,
					thumbnail: thumbnails[1],
					uploaded: uploadDate || "",
					duration: duration || null,
					live: !!isLive,
					views: viewCount || null,
					channel:
						c || channel
							? {
									id: (c || channel)?.id || null,
									name: (c || channel)?.name || null,
									thumbnail:
										((c || channel).thumbnails &&
											(c || channel).thumbnails[
												(c || channel).thumbnails.length - 1
											]) ||
										null,
							  }
							: null,
				})
			),
			channel:
				(channel && {
					id: channel.id,
					name: channel.name,
					thumbnail:
						(channel.thumbnails &&
							channel.thumbnails[channel.thumbnails.length - 1]) ||
						null,
				}) ||
				null,
		};
	});
