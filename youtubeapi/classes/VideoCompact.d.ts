import { YoutubeRawData } from "../common";
import { Base, ChannelCompact, Thumbnails, BaseAttributes, Video, LiveVideo } from ".";
/** @hidden */
interface VideoCompactAttributes extends BaseAttributes {
    title: string;
    thumbnails: Thumbnails;
    duration: number | null;
    isLive: boolean;
    channel?: ChannelCompact;
    uploadDate?: string;
    viewCount?: number | null;
}
/** Represent a compact video (e.g. from search result, playlist's videos, channel's videos) */
export default class VideoCompact extends Base implements VideoCompactAttributes {
    /** The title of the video */
    title: string;
    /** Thumbnails of the video with different sizes */
    thumbnails: Thumbnails;
    /** Description of the video (not a full description, rather a preview / snippet) */
    description: string;
    /** The duration of this video in second, null if the video is live */
    duration: number | null;
    /** Whether this video is a live now or not */
    isLive: boolean;
    /** The channel who uploads this video */
    channel?: ChannelCompact;
    /** The date this video is uploaded at */
    uploadDate?: string;
    /** How many view does this video have, null if the view count is hidden */
    viewCount?: number | null;
    /** @hidden */
    constructor(videoCompact?: Partial<VideoCompactAttributes>);
    /** Whether this video is private / deleted or not, only useful in playlist's videos */
    get isPrivateOrDeleted(): boolean;
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data: YoutubeRawData): VideoCompact;
    /**
     * Get {@link Video} object based on current video id
     *
     * Equivalent to
     * ```js
     * client.getVideo(videoCompact.id);
     * ```
     */
    getVideo(): Promise<Video | LiveVideo>;
}
export {};
