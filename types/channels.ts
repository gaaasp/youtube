export type Channel = {
	videos: {
		id: any;
		title: any;
		thumbnail: any;
		uploaded: any;
		duration: any;
		live: boolean;
		views: any;
		channel: {
			id: any;
			name: any;
		};
	}[];
	playlists: {
		id: string;
		title: string;
		thumbnail: { url: string; height: number; width: number };
	}[];
	shelves: { title: string; subtitle: string; items: any[] }[];
	id: string;
	name: string;
	thumbnail: { url: string; height: number; width: number };
	banner: {
		desktop: { url: string; height: number; width: number };
		mobile: { url: string; height: number; width: number };
		tv: { url: string; height: number; width: number };
	};
	subscribers: string;
};
