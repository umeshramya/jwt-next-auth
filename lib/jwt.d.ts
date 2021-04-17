import { NextApiResponse, NextApiRequest } from 'next';
/**
 * This is function for signing in the user and setting up the cookie of jwt using environemntal variable SECRET_AUTH
 * @param payload this is payload that has to given for creating json web token it will contain values to be utlized in subsequent request
 * @param req This is req from NextApiRequest
 * @param res This is the response of NextApiResponse
 * @returns This return the new promise which has to resolved thus it seting  the server side cookie with key token and value jsowebtoken. further it return the jsonwebtoken as string.
 */
declare const jwtSign: (payload: {}, req: NextApiRequest, res: NextApiResponse) => Promise<unknown>;
/**
 * Helper function for creating jsonweb token usin AUTH_SECRET environmental variable
 * This can be used to create new json token from client application apart sign in token
 * @param payload payload is object for creation of jsonwebtoken
 * @validateDays Number of days token is valid
 * @returns returns a promise with resolveble jsonwebtoken
 */
declare const jwtTokenCreate: (payload: {}, validateDays?: number) => Promise<unknown>;
/**
 * Helper function for  jwtiverfy
 * @param token jsonwebtoen to be  veriied using SECRET_AUTH environmental variaable
 * @returns returns new promise with resolvable decoded.token
 */
declare const jwtverify: (token: string) => Promise<unknown>;
/**
 * This is funtion which has to be exucuted in getServerSideProps or getStaticProps
 * @param req NextApiRequest
 * @param res NextApiResponse
 * @returns new Promise :- it resolves if the sign in token (cookie is valid and present) else it rejects
 */
declare const IsPageLogged: (req: NextApiRequest, res: NextApiResponse) => Promise<unknown>;
/**
 * This forvaldating user
 * @param req NextApiRequest
 * @param res NextApiResponse
 * @param next next function called
 */
declare const validateUser: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
/**
 * Thi s ;logout by seting token value to ""
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
declare const logout: (req: NextApiRequest, res: NextApiResponse) => void;
export { jwtSign, jwtverify, IsPageLogged, validateUser, jwtTokenCreate, logout };
//# sourceMappingURL=jwt.d.ts.map