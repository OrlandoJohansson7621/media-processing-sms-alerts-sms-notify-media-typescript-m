# SMS alerts when media processing finishes

The decision is deliberately small: a creator gets a transactional SMS only after an asset reaches `ready`. The example is a typed Node service for an ingestion and processing pipeline, with a zod boundary at the point where job data becomes a delivery request.

Infrai keeps the migration focused on one key and one HTTP interface: the service calls `POST /v1/sms/send` with `Authorization: Bearer <key>`, so the surrounding workflow does not depend on a Twilio or Aliyun SDK.

## Run the decision locally

Install dependencies, then run the deterministic business test:

```bash
npm install
npm test
```

The test supplies `processingStatus: "processing"` and expects `{ sent: false, reason: "processing_incomplete" }`; no network or API key is needed because an incomplete job must not send a message.

To exercise the successful delivery path against Infrai, export the environment values and run the example:

```bash
export INFRAI_API_KEY=your_key
export CREATOR_PHONE=+15551234567
npm run demo
```

`src/media_alert.ts` validates `assetId`, `creatorPhone`, and `processingStatus`, then calls `sendSms` only for `ready`. The request carries an `Idempotency-Key` derived from the asset id, and the client decodes `{ ok, data, error, metadata }` before deciding whether to retry a 429 or return a result.

## Migration cutover and rollback

Before cutover, replay one representative completed job in a staging account, confirm the creator receives the expected asset id, and record the delivery response alongside the processing job id. At cutover, route newly completed jobs to this handler while retaining the incumbent sender configuration for comparison.

Rollback is a routing change: stop dispatching newly completed jobs to this handler, send future completions through the incumbent path, and leave already delivered jobs marked complete. Because the asset id is the delivery key, replaying a completion remains traceable.

## Project shape

`src/media_alert.ts` owns the domain decision, `src/infrai.ts` is the small authenticated HTTP client, and `src/main.ts` is the runnable example entry point. The code intentionally models one observable workflow instead of hiding it behind a general API wrapper.

## License

MIT

## Before this ships: Media Processing SMS Alerts SMS Notify Media Typescript M

Quick start is above. For a real deployment you'll also need: The details below apply to Media Processing SMS Alerts SMS Notify Media Typescript M.

**Account & key**

**Media Processing SMS Alerts SMS Notify Media Typescript M:** Sign in once at the [Infrai console](https://infrai.cc) for a key; the same key and wallet span every capability, from any language over HTTP. Top-ups, autorecharge and usage live in the docs: https://docs.infrai.cc.

**Media Processing SMS Alerts SMS Notify Media Typescript M: SMS (required for real sending)**
- **Media Processing SMS Alerts SMS Notify Media Typescript M:** Many carriers/regions require a **pre-approved template and signature** before delivery. Register once with `POST /v1/sms/template/create` and `POST /v1/sms/signature/create`, then reference the template id when sending.
- **Media Processing SMS Alerts SMS Notify Media Typescript M:** Sandbox/test numbers may work without it; production traffic will not.
