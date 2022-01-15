export type Video = {
	id: string;
	title: string;
	views: number;
	likes: number;
	watching: number;
	description: string;
	uploaded: string;
	channel: {
		id: string;
		name: string;
		thumbnail: { url: string; width: number; height: number };
	};
	thumbnail: { url: string; width: number; height: number };
	live: boolean;
	tags: string[];
	related: {
		id: string;
		title: string;
		live: boolean;
		thumbnail: { url: string; width: number; height: number };
		uploaded: string;
		duration: number;
		views: number;
		channel: { name: string; id: string };
	}[];
	continuation: string;
	comments: {
		id: string;
		published: string;
		replies: number;
		likes: number;
		owner: boolean;
		pinned: boolean;
		author: {
			id: string;
			name: string;
			thumbnail: { url: string; width: number; height: number };
		};
		content: string;
		continuation: string;
	}[];
};
