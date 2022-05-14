import { Wrapper } from "components/common";
import { Button, Link, Text } from "components/ui";
import { Video } from "components/video";
import { useFollowing } from "lib/following";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Following() {
	const [url, setUrl] = useState<string>();

	const { following, setFollowing } = useFollowing();
	const { data } = useSWR(
		() => following && `channels/${JSON.stringify(following)}`,
		async () =>
			(
				await Promise.all(
					following.map((id) =>
						fetch(`/api/channels/${id}`)
							.then((res) => res.json())
							.catch(() => null)
					)
				)
			).filter((a) => a)
	);

	const videos = data
		?.reduce((arr, { videos }) => [...arr, ...videos], [])
		.sort(
			(a, b) =>
				new Date(b.uploaded).valueOf() - new Date(a.uploaded).valueOf()
		);

	useEffect(() => {
		following &&
			setUrl(
				URL.createObjectURL(
					new File([following.join("\n")], "following.txt")
				)
			);
	}, [following]);

	return (
		<Wrapper title="Abonnements" className="space-y-4">
			{!!data?.length && (
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
			)}
			<div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
				<Button width="w-full sm:w-max" as="label">
					<input
						className="hidden"
						type="file"
						onChange={async ({ target }) =>
							target.files.length &&
							target.files[0]
								.text()
								.then((text) =>
									text
										.split("\n")
										.map((a) => a.trim())
										.filter(
											(a) =>
												a &&
												!following.find(
													(id) => id === a
												)
										)
								)
								.then((arr) =>
									setFollowing([...following, ...arr])
								)
						}
					/>
					Importer des abonnements
				</Button>
				{!!following?.length && (
					<Button
						width="w-full sm:w-max"
						secondary
						as="a"
						href={url}
						download="following.txt"
					>
						Exporter mes abonnements
					</Button>
				)}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
				{videos?.map((props) => (
					<Video
						{...props}
						uploaded={new Date(props.uploaded).toLocaleDateString(
							"fr-FR",
							{
								day: "numeric",
								month: "short",
								year: "numeric",
							}
						)}
					/>
				))}
			</div>
		</Wrapper>
	);
}
