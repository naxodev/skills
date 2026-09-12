# Manifest shape

The local builder consumes this JSON shape. The schema summary follows the builder's header and the skill's manifest contract.

```json
{
  "title": "Page heading",
  "eyebrow": "Small label above the heading",
  "dek": "Subtitle paragraph",
  "meta": "Small metadata line",
  "footer": "Footer text",
  "sections": [
    {
      "eyebrow": "Chapter label",
      "title": "Section heading",
      "content": "<p>Authored HTML.</p>"
    }
  ]
}
```

Every displayed field above is a string except sections, which is a nonempty array. Use the section count in the writing request.
Optional section code entries use `{ "lang": "js", "source": "raw code", "file": "file.mjs" }`.
Refer to them with `{{CODE:0}}` in content. Optional diagrams are an array of raw Mermaid strings, referenced with `{{DIAGRAM:0}}`.
Optional narrationIntro and section narration fields are plain strings; narration does not need an audio file.
The builder escapes plain text fields and code entries. Escape inline code inside content yourself, including `<`, `>`, and `&`.
