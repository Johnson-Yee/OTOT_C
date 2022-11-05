//Reference from https://github.com/onury/accesscontrol#readme
import { AccessControl } from "accesscontrol";

const ac = new AccessControl();

export const roles = (function () {
    ac.grant("user").readOwn("endpoints");

    ac.grant("admin").extend("user").readAny("endpoints");

    return ac;
})();

export function checkRole(actionType, topic) {
    return async (req, res, next) => {
        const permission = roles.can(req.body.role)[actionType](topic);
        if (!permission.granted) {
            return res.status(401).json({
                error: "You don't have enough permission to perform this action",
            });
        }
        next();
    };
}

