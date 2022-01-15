import { Wrapper } from "components/common";
import { Link, Text } from "components/ui";
import { Video } from "components/video";
import { GetServerSideProps, GetStaticProps } from "next";
import useSWRInfinite from "swr/infinite";

const subscriptions = [
	"UC-lHJZR3Gqxm24_Vd_AJ5Yw",
	"UCo3i0nUzZjjLuM7VjAVz4zA",
	"UCL9aTJb0ur4sovxcppAopEw",
	"UCOdKaYgvLlPuinUJ1z5Gm2g",
	"UCo6Z9cEI8Hf3nyrLUfDITtA",
	"UCG9P9uhnagy4IF-NEUmriaw",
	"UCmFeOdJI3IXgTBDzqBLD8qg",
];

export default ({ following }) => {
	const { data } = useSWRInfinite(
		(index) =>
			index < following.length ? `/api/channels/${following[index]}` : null,
		(path) => fetch(path).then((res) => res.json()),
		{ initialSize: following.length }
	);

	const videos = data
		?.reduce((arr, { videos }) => [...arr, ...videos], [])
		.sort(
			(a, b) => new Date(b.uploaded).valueOf() - new Date(a.uploaded).valueOf()
		);

	return (
		<Wrapper title="Abonnements" className="space-y-4">
			<div className="flex flex-nowrap space-x-4 overflow-auto">
				{data?.map(({ id, name }) => (
					<Link
						href={`/channels/${id}`}
						className="text-accent-5 hover:text-accent-7 active:text-foreground"
					>
						<Text className="whitespace-nowrap">{name}</Text>
					</Link>
				))}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
				{videos?.map((props) => (
					<Video
						{...props}
						uploaded={new Date(props.uploaded).toLocaleDateString("fr-FR", {
							day: "numeric",
							month: "short",
							year: "numeric",
						})}
					/>
				))}
			</div>
		</Wrapper>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: { following: JSON.parse(context.req.cookies.following || "[]") },
	};
};
