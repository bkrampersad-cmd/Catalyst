Vendored OCR engine for Catalyst's Photo Tutor (reads text from a photo on the device; nothing is uploaded).

- tesseract.min.js, worker.min.js: tesseract.js 7.0.0 (Apache-2.0)
- tesseract-core-*-lstm.wasm.js: tesseract.js-core 7.0.0 (Apache-2.0). The worker loads only the one that fits the device (relaxed SIMD, SIMD or plain).
- lang/eng.traineddata.gz: @tesseract.js-data/eng 1.0.0, 4.0.0_best_int (MIT; Tesseract model data is Apache-2.0)

These files are loaded only when the Photo Tutor is first used. They are not in sw.js ASSETS (about 7 MB to download on first use). The service worker caches them when they are fetched, so the Photo Tutor works offline afterwards.
To update: npm install tesseract.js @tesseract.js-data/eng, then copy the same files.
