import { z } from "zod";
import { sendSms } from "./infrai.js";

export const mediaJobSchema = z.object({
  assetId: z.string().min(1),
  creatorPhone: z.string().min(7),
  processingStatus: z.enum(["queued", "processing", "ready", "failed"])
});
export type MediaJob = z.infer<typeof mediaJobSchema>;

export function alertForCompletedMedia(input: unknown) {
  const job = mediaJobSchema.parse(input);
  if (job.processingStatus !== "ready") return { sent: false, reason: "processing_incomplete" as const };
  return sendSms({ to: job.creatorPhone, body: `Asset ${job.assetId} is ready for your channel.` }, `media:${job.assetId}`)
    .then((data) => ({ sent: true as const, data }));
}
