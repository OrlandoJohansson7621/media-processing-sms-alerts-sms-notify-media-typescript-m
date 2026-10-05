import { alertForCompletedMedia } from "./media_alert.js";

const phone = process.env.CREATOR_PHONE;
if (!phone) throw new Error("CREATOR_PHONE is required");
const result = await alertForCompletedMedia({ assetId: "episode-104", creatorPhone: phone, processingStatus: "ready" });
console.log("media delivery:", result);
