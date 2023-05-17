import { expressjwt, GetVerificationKey } from "express-jwt";
import jwks from "jwks-rsa";

export const auth0jwtMiddleware = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://pro-app.us.auth0.com/.well-known/jwks.json',
  }) as GetVerificationKey,
  // audience: 'http://localhost:4000/v1/api',
  issuer: 'https://pro-app.us.auth0.com/',
  algorithms: ['RS256'],
});
