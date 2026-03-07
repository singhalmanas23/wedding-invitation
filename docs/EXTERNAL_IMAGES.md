# Hosting images externally (e.g. Courtyard Edit)

You can host chapter images outside the repo and reference them by URL. The app already supports external URLs for `heroImage` and `galleryImages` in `src/content/events.ts`.

## Option 1: Cloudinary (recommended, free tier)

1. Sign up at [cloudinary.com](https://cloudinary.com) (free account).
2. In the Dashboard, go to **Media Library** → **Upload**.
3. Upload your 7 courtyard images (order doesn’t matter; you’ll assign them below).
4. For each image, open it and copy the **URL** (e.g. `https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/folder/image.jpg`).
5. Optional: use **Transform** or **Delivery URL** to get a shorter URL and add resize params, e.g. `.../w_1200,q_80/...` for hero size.
6. In this repo, open `src/content/events.ts`, find the `courtyard-edit` event, and set:
   - `heroImage`: URL for the image you want as the main hero (e.g. the ornate curtains/tapestry or the wisteria canopy).
   - `galleryImages`: array of the remaining URLs (all 7 or a subset).

**Suggested mapping (by your image order):**

| # | Use as        | Description (for your reference)        |
|---|----------------|------------------------------------------|
| 1 | Hero or gallery | Ornate pink/cream curtains & tapestry   |
| 2 | Gallery        | Wisteria canopy, purple urns, pink floor |
| 3 | Gallery        | Pink sofa, round tables, patterned cloths |
| 4 | Gallery        | Floral wallpaper, dining table, candles  |
| 5 | Gallery        | Fabric ceiling, round tables, arched wall |
| 6 | Gallery        | Pink stage, floral backdrop, instruments |
| 7 | Gallery        | Triptych: doorway, bar, botanical        |

## Option 2: Vercel Blob (if you use Vercel)

1. Install: `npm i @vercel/blob`
2. Use the [Vercel Blob dashboard](https://vercel.com/dashboard/stores) or the API to upload files and get URLs.
3. Add the blob storage host to `next.config.ts` under `images.remotePatterns` if needed (e.g. `hostname: "xxx.public.blob.vercel-storage.com"`).
4. Put the returned URLs into `heroImage` and `galleryImages` for `courtyard-edit` in `src/content/events.ts`.

## After you have URLs

- Paste them into `src/content/events.ts` for the **courtyard-edit** event.
- **Cloudinary** is already allowed in `next.config.ts` → `images.remotePatterns`; no code change needed for that host.
- Rebuild/redeploy; the Courtyard Edit chapter will use your hosted images.
