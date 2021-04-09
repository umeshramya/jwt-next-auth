import { NextApiResponse, NextApiRequest } from "next";
declare const jwtSign: (payload: {}, req: NextApiRequest, res: NextApiResponse) => Promise<unknown>;
declare const jwtTokenCreate: (payload: {}) => Promise<unknown>;
declare const jwtverify: (token: string) => Promise<unknown>;
declare const IsPageLogged: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>;
declare const validateUser: (req: NextApiRequest, res: NextApiResponse, next: Function) => Promise<void>;
export { jwtSign, jwtverify, IsPageLogged, validateUser, jwtTokenCreate };
//# sourceMappingURL=jwt.d.ts.map