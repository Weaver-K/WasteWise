// src/utils/syncUser.js
import User from "../models/User.js";

/**
 * Ensure a User row exists for the given clerkId.
 * If profile info supplied, update it.
 */
export async function syncUser({ clerkId, name, email, avatarUrl } = {}) {
  if (!clerkId) throw new Error("syncUser requires clerkId");

  const update = {};
  if (name) update.name = name;
  if (email) update.email = email;
  if (avatarUrl) update.avatarUrl = avatarUrl;

  const opts = { upsert: true, new: true, setDefaultsOnInsert: true };

  // If update object is empty, just find or create minimal entry
  const updateObj = Object.keys(update).length
    ? { $set: update, $setOnInsert: { clerkId } }
    : { $setOnInsert: { clerkId } };

  const user = await User.findOneAndUpdate({ clerkId }, updateObj, opts);
  return user;
}
