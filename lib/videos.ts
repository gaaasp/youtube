import { Video as VideoType } from "types";
import { Client, Video } from "youtubeapi";

export const getVideo = (id: string): Promise<VideoType> =>
	new Client()
		.getVideo(id)
		.then((data) => new Video(data))
		.then(async (data) => {
			await data.nextComments();
			const continuation = data.commentContinuation || "";
			const title = data.title;
			const id = data.id;
			const views = data.viewCount;
			const likes = data.likeCount;
			const watching = (data["watchingCount"] || null) as number;
			const description = data.description;
			const uploaded = data.uploadDate;
			const channel = {
				id: data.channel.id,
				name: data.channel.name,
				thumbnail: data.channel.thumbnails[1],
			};
			const thumbnail = data.thumbnails[data.thumbnails.length - 1];
			const tags = data.tags.map((tag) => tag.slice(1));
			const live = data.isLiveContent;
			const related = data.related
				?.map(
					({
						id,
						title,
						thumbnails,
						uploadDate,
						duration,
						isLive,
						channel,
						viewCount,
					}: any) => ({
						id,
						title,
						thumbnail: thumbnails[1],
						uploaded: uploadDate || "",
						duration: duration || null,
						live: !!isLive,
						views: viewCount || null,
						channel: channel
							? { id: channel?.id || null, name: channel?.name || null }
							: null,
					})
				)
				.filter(({ channel }) => channel?.id && channel?.name);
			const comments =
				data.comments?.map(
					({
						id,
						publishDate,
						replyCount,
						likeCount,
						isAuthorChannelOwner,
						isPinnedComment,
						author,
						content,
						replyContinuation,
					}) => ({
						id,
						published: publishDate || null,
						replies: replyCount || 0,
						likes: likeCount || 0,
						owner: !!isAuthorChannelOwner,
						pinned: !!isPinnedComment,
						author: author && {
							id: author.id || null,
							name: author.name || null,
							thumbnail: author.thumbnails[1] || null,
						},
						content: content || "",
						continuation: replyContinuation || null,
					})
				) || null;

			return {
				id,
				title,
				views,
				likes,
				watching,
				description,
				uploaded,
				channel,
				thumbnail,
				live,
				tags,
				related,
				continuation,
				comments,
			};
		});
