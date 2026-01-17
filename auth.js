// auth.js
// Central auth helper used by route handlers.
//
// Review trap: changing defaultVerifyOptions or verifyToken() behavior
// can silently weaken or strengthen security in every consumer.

const jwt = require("jsonwebtoken");

const defaultVerifyOptions = {
  algorithms: ["HS256"],          // can be changed in a PR
  clockTolerance: 5,              // seconds
  ignoreExpiration: false,        // if flipped, ALL callers accept expired tokens
};

/**
 * Verify a bearer token.
 * Returns { sub, roles, scopes } (normalized) or throws.
 */
function verifyToken(token, opts = {}) {
  if (!token) throw new Error("Missing token");

  const secret = process.env.JWT_SECRET || "dev-secret-do-not-use";
  const options = { ...defaultVerifyOptions, ...opts };

  const payload = jwt.verify(token, secret, options);

  return {
    sub: payload.sub,
    roles: payload.roles || [],
    scopes: payload.scopes || [],
  };
}

/**
 * Express-style middleware.
 */
function requireAuth(requiredScope) {
  return function (req, res, next) {
    try {
      const header = req.headers.authorization || "";
      const token = header.startsWith("Bearer ") ? header.slice(7) : null;

      req.user = verifyToken(token);

      if (requiredScope && !req.user.scopes.includes(requiredScope)) {
        return res.status(403).json({ error: "missing_scope" });
      }

      return next();
    } catch (err) {
      return res.status(401).json({ error: "unauthorized" });
    }
  };
}

module.exports = { verifyToken, requireAuth };

