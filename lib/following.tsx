import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import { parseCoookie, stringifyCookie } from "utils";

export const FollowingContext = createContext<{
	following: string[];
	setFollowing: Dispatch<SetStateAction<string[]>>;
	follow(id: string): void;
	unfollow(id: string): void;
}>({
	following: undefined,
	setFollowing: undefined,
	follow: undefined,
	unfollow: undefined,
});

export const FollowingConsumer = FollowingContext.Consumer;

export const useFollowing = () => useContext(FollowingContext);

export const FollowingProvider = (props) => {
	const [following, setFollowing] = useState<string[]>();

	useEffect(() => {
		if (following) {
			document.cookie = stringifyCookie({
				following: JSON.stringify(following),
			});
		} else {
			setFollowing(JSON.parse(parseCoookie(document.cookie).following || "[]"));
		}
	}, [following]);

	const follow = (id: string) =>
		setFollowing([...(following || []).filter((value) => value !== id), id]);

	const unfollow = (id: string) =>
		setFollowing((following || []).filter((value) => value !== id));

	return (
		<FollowingContext.Provider
			value={{ following, setFollowing, follow, unfollow }}
			{...props}
		/>
	);
};
