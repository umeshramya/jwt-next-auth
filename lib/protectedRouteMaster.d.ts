import { NextApiRequest, NextApiResponse } from "next";
/**
 * This is closure for route function
 * @<Body> is type oi req body that is sent
 * @<return> is type of return the inner function gives
 * @param route This route function in api directory of page
 * @param permitedRoles arraay role who have access for this route
 * @authVerify : this is callback function accepts the auth object as argument (auth is the one which you put in JWT payload this is optional)
 * @returns route function which is used in api of next
 */
declare const protectedRouteMaster: (route: Function, permitedRoles?: string[] | undefined, authVerify?: ((auth: {}) => Promise<boolean>) | undefined) => (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
export default protectedRouteMaster;
//# sourceMappingURL=protectedRouteMaster.d.ts.map