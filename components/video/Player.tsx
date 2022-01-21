import { Maximize, Minimize, Pause, Play } from "components/icons";
import { Text } from "components/ui";
import { usePlaying } from "lib/playing";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { Video } from "types";
import { cn, useKeypress } from "utils";
import { getTime } from "utils";

export interface PlayerProps extends HTMLAttributes<HTMLElement> {
	video: Video;
	height: string;
}

export const Player = ({ video, height, className }: PlayerProps) => {
	const { time, setTime, setPlaypausing, playpausing, playing } = usePlaying();
	const videoRef = useRef(null);
	const progressBarRef = useRef(null);
	const playerRef = useRef(null);
	const [videoTime, setVideoTime] = useState(0);
	const [shown, setShown] = useState(false);
	const [times, setTimes] = useState<NodeJS.Timeout>(null);

	const fullScreen =
		typeof window !== "undefined" &&
		!!(
			document.fullscreenElement ||
			// @ts-ignore
			document.webkitFullscreenElement ||
			// @ts-ignore
			document.mozFullScreenElement ||
			// @ts-ignore
			document.msFullscreenElement
		);

	const setFullScreen = (mode: boolean) =>
		mode
			? (playerRef.current.requestFullscreen &&
					playerRef.current.requestFullscreen()) ||
			  (playerRef.current.webkitRequestFullScreen &&
					playerRef.current.webkitRequestFullScreen()) ||
			  (videoRef.current.webkitEnterFullscreen &&
					videoRef.current.webkitEnterFullscreen())
			: document.exitFullscreen();

	useEffect(() => {
		if (time && videoRef?.current) {
			videoRef.current.currentTime = time;
		}
	}, [videoRef]);

	useEffect(() => {
		if (video && videoTime) {
			videoRef?.current[playpausing ? "play" : "pause"]();
		}
	}, [playpausing, video, videoTime]);

	const Icon = playpausing ? Pause : Play;

	const ScreenIcon = fullScreen ? Minimize : Maximize;

	useKeypress(["f", " ", "ArrowRight", "ArrowLeft"], (e) => {
		// @ts-ignore
		if (e.target.nodeName !== "INPUT" && e.target.nodeName !== "TEXTAREA") {
			let t;
			switch (e.key) {
				case "f":
					setFullScreen(!document.fullscreenElement);
					e.preventDefault();
					break;
				case " ":
					setPlaypausing(!playpausing);
					e.preventDefault();
					break;
				case "ArrowRight":
					t = Math.min(time + 5, videoTime);
					videoRef.current.currentTime = t;
					setTime(t, playing);
					e.preventDefault();
					break;
				case "ArrowLeft":
					t = Math.max(time - 5, 0);
					videoRef.current.currentTime = t;
					setTime(t, playing);
					e.preventDefault();
					break;
			}
		}
	});

	return video ? (
		<div
			className={cn("relative", className)}
			onMouseEnter={() => setShown(true)}
			onMouseLeave={() => setShown(false)}
			onTouchStart={() => {
				setShown(true);
				setTimeout(() => {
					setShown(false);
				}, 1000 * 5);
			}}
			onClick={(e) =>
				// @ts-ignore
				e.target.nodeName === "VIDEO" && setPlaypausing(!playpausing)
			}
			onMouseMove={() => {
				setShown(true);
				clearTimeout(times);
				setTimes(null);

				setTimes(
					setTimeout(() => {
						setShown(false);
					}, 3000)
				);
			}}
			ref={playerRef}
		>
			<video
				controls={!videoTime}
				onLoadedData={(e) => {
					setVideoTime(e.currentTarget.duration);
				}}
				onLoadCapture={(e) => {
					setVideoTime(e.currentTarget.duration);
				}}
				onLoad={(e) => {
					setVideoTime(e.currentTarget.duration);
				}}
				onTimeUpdate={(e) =>
					setTime(e.currentTarget.currentTime, video?.id || playing)
				}
				src={
					video?.id &&
					`https://yewtu.be/latest_version?id=${video.id}&itag=22&local=true`
				}
				poster={video.thumbnail?.url || undefined}
				playsInline
				className={cn("w-full h-full", fullScreen ? "bg-black" : height)}
				ref={videoRef}
			/>
			{!!videoTime &&
				(time || playpausing ? (
					shown && (
						<div className="absolute bottom-0 w-[calc(100%-2rem)] mx-4 mb-3">
							<div className="w-full relative h-8 rounded-md shadow bg-black text-white bg-opacity-25">
								<div className="w-full h-full bg-black blur bg-opacity-25"></div>
								<div className="absolute w-full h-full top-0 left-0 flex items-center px-2 space-x-2">
									<button onClick={() => setPlaypausing(!playpausing)}>
										<Icon size="w-4 h-4" />
									</button>
									<button
										ref={progressBarRef}
										onClick={(e) => {
											const rect =
												progressBarRef.current.getBoundingClientRect();
											const time =
												((e.clientX - rect.left) / rect.width) * videoTime;
											videoRef.current.currentTime = time;
											setTime(time, playing);
										}}
										className="flex-1 h-2 rounded-md bg-white bg-opacity-25 overflow-hidden"
									>
										<div
											className="h-full bg-white rounded-md"
											style={{ width: `${(time / videoTime) * 100}%` }}
										/>
									</button>
									<Text small>
										{getTime(time)}
										<Text as="span" className="opacity-75">
											{" "}
											/ {getTime(videoTime)}
										</Text>
									</Text>
									<button onClick={() => setFullScreen(!fullScreen)}>
										<ScreenIcon size="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					)
				) : (
					<button
						onClick={() => setPlaypausing(true)}
						className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-black text-white bg-opacity-50"
					>
						<Play size="w-8 h-8" />
					</button>
				))}
		</div>
	) : (
		<></>
	);
};
