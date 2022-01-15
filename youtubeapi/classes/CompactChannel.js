"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const _1 = require(".");
const constants_1 = require("../constants");
/**  Represents a Youtube Channel */
class CompactChannel extends _1.Base {
    /** @hidden */
    constructor(channel = {}) {
        super();
        this._videoContinuation = null;
        this._playlistContinuation = null;
        Object.assign(this, channel);
        this.videos = [];
        this.playlists = [];
    }
    /** The URL of the channel page */
    get url() {
        return `https://www.youtube.com/channel/${this.id}`;
    }
    /**
     * Load this instance with raw data from Youtube
     *
     * @hidden
     */
    load(data) {
        const { channelId, title, thumbnail, videoCountText, subscriberCountText } = data;
        this.id = channelId;
        this.name = title.simpleText;
        this.thumbnails = new _1.Thumbnails().load(thumbnail.thumbnails);
        this.videoCount = common_1.stripToInt(videoCountText === null || videoCountText === void 0 ? void 0 : videoCountText.runs[0].text) || 0;
        this.subscriberCount = subscriberCountText === null || subscriberCountText === void 0 ? void 0 : subscriberCountText.simpleText;
        this.videos = [];
        this.playlists = [];
        return this;
    }
    /**
     * Load next 30 videos made by the channel, and push the loaded videos to {@link Channel.videos}
     *
     * @example
     * ```js
     * const channel = await youtube.findOne(CHANNEL_NAME, {type: "channel"});
     * await channel.nextVideos();
     * console.log(channel.videos) // first 30 videos
     *
     * let newVideos = await channel.nextVideos();
     * console.log(newVideos) // 30 loaded videos
     * console.log(channel.videos) // first 60 videos
     *
     * await channel.nextVideos(0); // load the rest of the videos in the channel
     * ```
     *
     * @param count How many time to load the next videos, pass `0` to load all
     *
     * @return New loaded videos
     */
    nextVideos(count = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const newVideos = [];
            for (let i = 0; i < count || count == 0; i++) {
                if (this._videoContinuation === undefined)
                    break;
                const items = yield this.getTabData("videos");
                this._videoContinuation = CompactChannel.getContinuationFromItems(items);
                newVideos.push(...items
                    .filter((i) => i.gridVideoRenderer)
                    .map((i) => new _1.VideoCompact({ client: this.client }).load(i.gridVideoRenderer)));
            }
            this.videos.push(...newVideos);
            return newVideos;
        });
    }
    /**
     * Load next 30 playlists made by the channel, and push the loaded playlists to {@link Channel.playlists}
     *
     * @example
     * ```js
     * const channel = await youtube.findOne(CHANNEL_NAME, {type: "channel"});
     * await channel.nextPlaylists();
     * console.log(channel.playlists) // first 30 playlists
     *
     * let newPlaylists = await channel.nextPlaylists();
     * console.log(newPlaylists) // 30 loaded playlists
     * console.log(channel.playlists) // first 60 playlists
     *
     * await channel.nextPlaylists(0); // load the rest of the playlists in the channel
     * ```
     *
     * @param count How many time to load the next playlists, pass `0` to load all
     *
     * @return New loaded playlists
     */
    nextPlaylists(count = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPlaylists = [];
            for (let i = 0; i < count || count == 0; i++) {
                if (this._playlistContinuation === undefined)
                    break;
                const items = yield this.getTabData("playlists");
                this._playlistContinuation = CompactChannel.getContinuationFromItems(items);
                newPlaylists.push(...items
                    .filter((i) => i.gridPlaylistRenderer)
                    .map((i) => new _1.PlaylistCompact({ client: this.client }).load(i.gridPlaylistRenderer)));
            }
            this.playlists.push(...newPlaylists);
            return newPlaylists;
        });
    }
    /** Get tab data from youtube */
    getTabData(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = name === "videos" ? "EgZ2aWRlb3M%3D" : "EglwbGF5bGlzdHMgAQ%3D%3D";
            const continuation = name === "videos" ? this._videoContinuation : this._playlistContinuation;
            const response = yield this.client.http.post(`${constants_1.I_END_POINT}/browse`, {
                data: { browseId: this.id, params, continuation },
            });
            return CompactChannel.parseTabData(name, response.data);
        });
    }
    /** Parse tab data from request, tab name is ignored if it's a continuation data */
    static parseTabData(name, data) {
        var _a;
        const index = name === "videos" ? 1 : 2;
        return (((_a = data.contents) === null || _a === void 0 ? void 0 : _a.twoColumnBrowseResultsRenderer.tabs[index].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items) ||
            data.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems);
    }
    /** Get continuation token from items (if exists) */
    static getContinuationFromItems(items) {
        var _a;
        return (_a = items[items.length - 1].continuationItemRenderer) === null || _a === void 0 ? void 0 : _a.continuationEndpoint.continuationCommand.token;
    }
}
exports.default = CompactChannel;
