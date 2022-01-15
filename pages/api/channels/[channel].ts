import { getXMLChannel } from "lib";
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
	getXMLChannel(`${req.query.channel}`)
		.then((text) => {
			res.send(text);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send("UNKNOWN_ERROR");
		});
};
