import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from "react";
import useSWR, { KeyedMutator } from "swr";
import { Video } from "types";

export const PlayingContext = createContext<{
	playing: string;
	setPlaying: Dispatch<SetStateAction<string>>;
	video: Video;
	error?: any;
	mutate: KeyedMutator<Video>;
	isValidating: boolean;
	time: number;
	setTime(time: number, playing: string): void;
	playpausing: boolean;
	setPlaypausing: Dispatch<SetStateAction<boolean>>;
}>({
	playing: undefined,
	setPlaying: undefined,
	video: undefined,
	mutate: undefined,
	isValidating: undefined,
	time: undefined,
	setTime: undefined,
	playpausing: undefined,
	setPlaypausing: undefined,
});

export const PlayingConsumer = PlayingContext.Consumer;

export const usePlaying = () => useContext(PlayingContext);

export const PlayingProvider = (props) => {
	const [playing, setPlaying] = useState<string>();
	const [t, setT] = useState<{ [key: string]: number }>({});
	const { data: video, ...rest } = useSWR(
		playing && `/api/videos/${playing}`,
		(path) => fetch(path).then((res) => res.json())
	);
	const [playpausing, setPlaypausing] = useState(true);

	const setTime = (time: number, playing: string) => {
		playing && typeof time === "number" && setT({ ...t, [playing]: time });
	};

	const time = (playing && t[playing]) || 0;

	return (
		<PlayingContext.Provider
			value={{
				playing,
				setPlaying,
				video,
				time,
				setTime,
				playpausing,
				setPlaypausing,
				...rest,
			}}
			{...props}
		/>
	);
};
