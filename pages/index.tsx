import { Wrapper } from "components/common";
import { Link, Text } from "components/ui";
import { Video } from "components/video";
import { GetServerSideProps } from "next";
import useSWR from "swr";

export default ({ following }) => {
	const { data } = useSWR(
		() => `channels/${JSON.stringify(following)}`,
		() =>
			Promise.all(
				following.map((id) =>
					fetch(`/api/channels/${id}`).then((res) => res.json())
				)
			)
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
