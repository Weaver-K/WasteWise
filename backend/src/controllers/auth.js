// src/controllers/auth.js
// Minimal: you may not need server-side login with Clerk because Clerk handles auth
export function health(req, res) {
  res.json({ ok: true });
}
