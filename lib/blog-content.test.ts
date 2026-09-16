import assert from "node:assert/strict";
import test from "node:test";
import { normalizeBlogContent } from "./blog-content.ts";

test("normalizes and sanitizes WordPress article HTML", () => {
  const html = `
    <div class="wp-block-group">
      <p></p>
      <h3>Artículo de prueba</h3>
      <h6 class="wp-block-heading">Primera sección</h6>
      <ul class="wp-block-list"><li>Una opción</li></ul>
      <a href="https://example.com/full.jpg"><img src="https://example.com/image.jpg" onerror="alert(1)"></a>
      <table><tbody><tr><td>Dato</td></tr></tbody></table>
      <script>alert(1)</script>
    </div>
  `;

  const result = normalizeBlogContent(html, "Artículo de prueba");

  assert.doesNotMatch(result, /Artículo de prueba|<h6|<script|onerror|<a/);
  assert.match(result, /<h2>Primera sección<\/h2>/);
  assert.match(result, /<ul><li>Una opción<\/li><\/ul>/);
  assert.match(result, /loading="lazy"/);
  assert.match(
    result,
    /<table><tbody><tr><td>Dato<\/td><\/tr><\/tbody><\/table>/
  );
});
