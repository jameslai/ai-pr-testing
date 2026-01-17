// routes.js
// Route handlers that depend on auth.js behaving correctly.

const express = require("express");
const { requireAuth, verifyToken } = require("./auth");

const router = express.Router();

// Public-ish endpoint that *still* accepts a token if provided,
// to enable higher rate limits for authenticated users.
router.get("/feed", (req, res) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  let viewer = { kind: "anonymous" };

  if (token) {
    // Review trap: this assumes verifyToken enforces expiration, algorithm, etc.
    // If auth.js changes (e.g., ignoreExpiration=true or algorithms widened),
    // this endpoint becomes an unintended auth bypass / privilege bump.
    const user = verifyToken(token);
    viewer = { kind: "user", sub: user.sub };
  }

  res.json({
    viewer,
    items: [
      { id: 1, title: "Hello" },
      { id: 2, title: "World" },
    ],
  });
});

// Admin-only endpoint (explicit middleware)
router.post("/admin/rotate-keys", requireAuth("admin:rotate_keys"), (req, res) => {
  // Side effects you'd REALLY care about.
  res.json({ ok: true });
});

module.exports = router;
// routes.js
// Route handlers that depend on auth.js behaving correctly.

const express = require("express");
const { requireAuth, verifyToken } = require("./auth");

const router = express.Router();

// Public-ish endpoint that *still* accepts a token if provided,
// to enable higher rate limits for authenticated users.
router.get("/feed", (req, res) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  let viewer = { kind: "anonymous" };

  if (token) {
    // Review trap: this assumes verifyToken enforces expiration, algorithm, etc.
    // If auth.js changes (e.g., ignoreExpiration=true or algorithms widened),
    // this endpoint becomes an unintended auth bypass / privilege bump.
    const user = verifyToken(token);
    viewer = { kind: "user", sub: user.sub };
  }

  res.json({
    viewer,
    items: [
      { id: 1, title: "Hello" },
      { id: 2, title: "World" },
    ],
  });
});

// Admin-only endpoint (explicit middleware)
router.post("/admin/rotate-keys", requireAuth("admin:rotate_keys"), (req, res) => {
  // Side effects you'd REALLY care about.
  res.json({ ok: true });
});

module.exports = router;

