import { getVideo } from "lib";
import { NextApiRequest, NextApiResponse } from "next";

let VIDEOS = {};

export default (req: NextApiRequest, res: NextApiResponse) =>
	VIDEOS[req.query.video?.toString()]
		? res.status(200).send(VIDEOS[req.query.video?.toString()])
		: getVideo(req.query.video?.toString())
				.then((data) => {
					VIDEOS[req.query.video?.toString()] = data;
					return res.status(200).send(data);
				})
				.catch((err) => {
					console.log(err);
					res.status(500).send("UNKNOWN_ERROR");
				});
