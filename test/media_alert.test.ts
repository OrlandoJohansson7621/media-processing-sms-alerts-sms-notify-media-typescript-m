import assert from "node:assert/strict";
import { alertForCompletedMedia } from "../src/media_alert.js";

const result = await alertForCompletedMedia({ assetId: "clip-7", creatorPhone: "+15551234567", processingStatus: "processing" });
assert.deepEqual(result, { sent: false, reason: "processing_incomplete" });
console.log("business decision test passed");
