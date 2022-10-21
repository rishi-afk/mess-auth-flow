import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { options } from "../../../lib/session";
import { createUser, findUser, userExists } from "../../../lib/data";
import { sanitize, isWebmail, isValidPassword } from "../../../lib/validation";

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
    let { email, password, name } = await req.body;
    email = sanitize(email);
    password = sanitize(password);
    name = sanitize(name);
    if (!isWebmail(email) || !isValidPassword(password)) {
        res.status(400).json({ message: "Bad request" });
    } else {
        try {
            const exists = await userExists({ email });
            if (exists) {
                res.status(400).json({ message: "Account already exists" });
            } else {
                const user = await createUser({
                    email,
                    password,
                    name: name || undefined,
                });
                req.session.user = user;
                await req.session.save();
                res.json(user);
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}

export default withIronSessionApiRoute(registerRoute, options);
