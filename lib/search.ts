import {
	ChannelCompact,
	Client,
	PlaylistCompact,
	VideoCompact,
} from "youtubeapi";

export const getSearch = (query: string) =>
	new Client().search(query).then(async (results) =>
		results
			.map((result) => {
				if (result instanceof VideoCompact) {
					return (
						result.channel && {
							id: result.id,
							title: result.title,
							thumbnail:
								result.thumbnails[1] ||
								result.thumbnails[0] ||
								null,
							uploaded: result.uploadDate || "",
							duration: result.duration || null,
							live: !!result.isLive,
							views: result.viewCount || null,
							channel: result.channel
								? {
										id: result.channel?.id || null,
										name: result.channel?.name || null,
								  }
								: null,
							type: "video",
						}
					);
				}
				if (result instanceof ChannelCompact) {
					return {
						name: result.name,
						id: result.id,
						thumbnail:
							result.thumbnails[1] ||
							result.thumbnails[0] ||
							null,
						type: "channel",
					};
				}
				if (result instanceof PlaylistCompact) {
					return {
						id: result.id,
						title: result.title,
						thumbnail:
							result.thumbnails[1] ||
							result.thumbnails[0] ||
							null,
						type: "playlist",
					};
				}
				return null;
			})
			.filter((a) => a)
	);
