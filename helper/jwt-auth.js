import jwt from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET_KEY } from "../common/constants.js";

export async function signAccessToken(username) {
    const token = jwt.sign({ username }, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRY,
    });
    return token;
}

export async function verifyToken(req, res, next) {
    if (!req.headers["authorization"]) return next(res.sendStatus(401));
    const authHeader = req.headers["authorization"];
    const jwtToken = authHeader.split(" ")[1];

    jwt.verify(jwtToken, JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            return next(res.sendStatus(401));
        }
        req.payload = payload;
        next();
    });
}
