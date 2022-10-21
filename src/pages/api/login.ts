import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { options } from "../../../lib/session";
import { findUser } from "../../../lib/data";
import { isValidPassword, isWebmail, sanitize } from "../../../lib/validation";

export default withIronSessionApiRoute(async function loginRoute(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let { email, password } = await req.body;
    email = sanitize(email);
    password = sanitize(password);
    if (!isWebmail(email) || !isValidPassword(password)) {
        res.status(400).json({ message: "Bad request" });
    } else {
        try {
            const user = await findUser({ email, password });
            if (!user)
                res.status(401).send({ message: "Invalid email or password." });
            else {
                req.session.user = user;
                await req.session.save();
                res.json(user);
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
},
options);
