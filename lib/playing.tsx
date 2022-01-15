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
}>({
	playing: undefined,
	setPlaying: undefined,
	video: undefined,
	mutate: undefined,
	isValidating: undefined,
});

export const PlayingConsumer = PlayingContext.Consumer;

export const usePlaying = () => useContext(PlayingContext);

export const PlayingProvider = (props) => {
	const [playing, setPlaying] = useState<string>();
	const { data: video, ...rest } = useSWR(
		playing && `/api/videos/${playing}`,
		(path) => fetch(path).then((res) => res.json())
	);

	return (
		<PlayingContext.Provider
			value={{ playing, setPlaying, video, ...rest }}
			{...props}
		/>
	);
};
