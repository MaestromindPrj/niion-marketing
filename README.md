# niion-marketing

Use `npm run dev` for editing. To measure loading performance, use the production export:

```sh
npm run build
npm start
```

The build creates `out/` and lossless Brotli/gzip variants of text assets. The production
server serves those variants, revalidates cached assets with ETags, and supports video
range requests. A different static host must be configured for compression and caching
to receive the same delivery benefits. Images, video files, and animation settings are
not recompressed or reduced.

First-screen images load eagerly; other images use native lazy loading. Framer's client
image renderer and the server export share `public/site/image-loading.mjs`. Keep that
policy when replacing the vendored Framer runtime. Shader rendering pauses outside the
viewport and in hidden tabs, then resumes with its original settings.

After a build, run the focused checks:

```sh
node scripts/check-static-delivery.mjs
node scripts/check-loading-runtime.mjs
node scripts/profile-startup.mjs after
```

Browser checks require Playwright and Chrome. Startup reports are saved under
`tmp/performance/`; timings vary with the machine and network.
