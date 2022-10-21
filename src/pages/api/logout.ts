import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { options } from "../../../lib/session";

export default withIronSessionApiRoute(
    async (req: NextApiRequest, res: NextApiResponse) => {
        req.session.destroy();
        res.json({ message: "Successfully logged out." });
    },
    options
);
