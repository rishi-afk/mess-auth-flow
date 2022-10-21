import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { options } from "../../../lib/session";

export default withIronSessionApiRoute(
    (req: NextApiRequest, res: NextApiResponse) => {
        if (req.session.user) {
            res.json({
                ...req.session.user,
            });
        } else {
            res.status(401).send({ message: "Unauthorized" });
        }
    },
    options
);
