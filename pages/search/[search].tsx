import { Wrapper } from "components/common";
import { Button, Link, Text } from "components/ui";
import { Video } from "components/video";
import { getSearch } from "lib";
import { useFollowing } from "lib/following";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { loader } from "utils";

export default function Search({ query, results }) {
	const { follow, unfollow, following } = useFollowing();

	return (
		<Wrapper title={query || "Recherche"} className="space-y-4">
			<Text h1>Résultats pour "{query}"</Text>
			{results?.map((result) =>
				result.type === "video" ? (
					<Video large key={`videos/${result.id}`} {...result} />
				) : result.type === "channel" ? (
					<div
						key={`channels/${result.id}`}
						className="w-full space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between"
					>
						<Link
							href={`/channels/${result.id}`}
							className="flex items-center space-x-4 group"
						>
							{result.thumbnail?.url && (
								<div className="relative h-24 w-24 rounded-full overflow-hidden">
									<Image
										loader={loader}
										layout="fill"
										src={
											result.thumbnail.url?.startsWith("//")
												? "https:" + result.thumbnail.url
												: result.thumbnail.url
										}
									/>
								</div>
							)}
							<Text large className="group-hover:underline">
								{result.name}
							</Text>
						</Link>
						<Button
							width="w-full sm:w-max"
							large
							color="red"
							secondary={!!following?.find((id) => id === result.id)}
							onClick={() =>
								(following?.find((id) => id === result.id) ? unfollow : follow)(
									result.id
								)
							}
						>
							{following?.find((id) => id === result.id)
								? "Se désabonner"
								: "S'abonner"}
						</Button>
					</div>
				) : (
					<></>
				)
			)}
		</Wrapper>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const data = await getSearch(context.params.search?.toString());

	return {
		props: { query: context.params.search?.toString(), results: data },
		revalidate: 10,
	};
};

export const getStaticPaths: GetStaticPaths = () => {
	return { paths: [], fallback: true };
};
