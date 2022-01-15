import { getXMLChannel } from "lib";
import { NextApiRequest, NextApiResponse } from "next";

let CHANNELS = {};

export default (req: NextApiRequest, res: NextApiResponse) =>
	CHANNELS[req.query.channel?.toString()]
		? res.status(200).send(CHANNELS[req.query.channel?.toString()])
		: getXMLChannel(`${req.query.channel}`)
				.then((text) => {
					CHANNELS[req.query.channel?.toString()] = text;
					res.status(200).send(text);
				})
				.catch((err) => {
					console.log(err);
					res.status(500).send("UNKNOWN_ERROR");
				});
