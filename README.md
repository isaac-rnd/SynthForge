# Synth Forge

Enterprise synthetic data generation platform — interactive prototype, styled to **msg for automotive**.

Live: **https://isaac-rnd.github.io/SynthForge/**

Eight connected screens, ten supported input languages, deterministic generation with referential integrity, and a safety contract that refuses to generate when the parser cannot reach a confidence floor.

## What it does

1. **Ingest** a schema in any of 10 formats — paste, upload, write in plain English, or pick a starter.
2. **Parse** it to a canonical internal representation with per-field confidence scores.
3. **Configure** the run (rows, seed, locale, null ratio, per-field generators, FK integrity, PII masking).
4. **Preview & export** deterministic synthetic data as JSON, CSV, SQL inserts, or Parquet.
5. **Validate** against the schema's constraints (NOT NULL, UNIQUE, FK, enum, CHECK ranges).
6. Plus job history, audit log, and an API surface (mocked).

## Supported input formats

The parsers run entirely in the browser — there is no backend.

| Format | What it understands |
| --- | --- |
| **JSON / BSON** | Walks values to derive types; detects ISO dates, emails, UUIDs, currency / country codes; nested objects → nested entities; arrays of objects → relationships |
| **SQL DDL** | `CREATE TABLE`, `PRIMARY KEY`, `FOREIGN KEY ... REFERENCES`, `UNIQUE`, `NOT NULL`, `DEFAULT`, `CHECK (...)`, enums in `/* enum: a, b, c */` comments |
| **Java POJO** | Field declarations, generics (`List<Order>`), JSR-303 annotations (`@NotNull`, `@Email`, `@Size`, `@Min`/`@Max`), inner enums |
| **TypeScript** | `interface` and `type` aliases, optional fields (`?`), array shorthand (`T[]` / `Array<T>`), union string literals as enums |
| **Python** | Pydantic `BaseModel` and `@dataclass`: `Optional[T]`, `List[T]`, `Literal[...]`, `Field(min_length=…, max_length=…, ge=…, le=…)`, `EmailStr` |
| **Go** | `type X struct { ... }`, `json:"name,omitempty"` and `db:"…"` tags (pointer = nullable, slices = relations) |
| **Avro AVSC** | Records, enums, unions with `null`, logical types (`timestamp-millis`, `date`, `uuid`), nested records |
| **Protobuf** | proto3 `message` blocks, `repeated`, `optional`, nested `enum`, scalar types |
| **YAML** | Indented OpenAPI-style declarations with `enum [...]` syntax |
| **Natural language** | Plain English: *"A customer has an id, an email, an age between 0 and 120, and a list of orders. Each order has an id, a total amount in EUR, and a status that is one of placed, paid, shipped or cancelled."* |

Plus two safety-contract templates:

- **Mixed / messy** — best-effort inference with low confidence and per-field warnings (allowed to generate)
- **Broken** — refuses generation; surfaces line-by-line blockers with suggested fixes

## Safety contract

If the parser's confidence falls below `0.55` (configurable), Synth Forge raises `SchemaUnsafe` and emits **nothing**. The Run-generation button disables, the Parsed-schema screen flips to a Halted panel, and audit logs the block.

This is the core enterprise invariant: a silently-wrong schema propagates into every downstream consumer (tests, demos, model training) and is almost impossible to trace back. Stopping early is cheaper than producing bad data.

## End-to-end pipeline

```
Source text
    │
    ▼
detectLanguage(src)  →  parseSchema(src, lang)  →  canonical schema
                                                        │
                                                        ▼
                                       generateRows(schema, opts)
                                                        │
                                                        ▼
                                           rowsToFormat(rows, fmt)
                                                        │
                                                        ▼
                                          JSON / CSV / SQL / Parquet
```

The generator is deterministic: same `(schema, seed, locale, overrides)` produces byte-identical output. It honours:

- **Enums** parsed from the source (no off-vocabulary values)
- **CHECK ranges** like `0..120` for integers
- **UNIQUE** constraints (with up to 5 retries per collision)
- **Foreign keys** — child rows reference a stable pool of parent IDs
- **Per-field overrides** — generator type (`email`, `uuid`, `regex`, `static`, …), regex patterns (`[A-Z]{2}\d{4}`), null %
- **PII masking** — sem-tagged `email` / `first_name` / `last_name` / `phone` are replaced with `sha256:…` placeholders when the toggle is on
- **Locales** — `de-DE`, `en-US`, `fr-FR`, `de-AT` switch name, city, street, and email-domain pools

## Run locally

The site is fully static (React UMD + Babel-standalone, no build step):

```sh
python -m http.server 5173
# or
npx serve .
```

Then open http://localhost:5173. `file://` won't work — the browser blocks loading the JSX scripts cross-origin.

## Deployment

`.github/workflows/pages.yml` publishes the site to GitHub Pages on every push to `main`. To enable:

1. **GitHub → Settings → Pages → Source: GitHub Actions** (one-time)
2. Push to `main` — the workflow uploads the static artifact and deploys
3. Live URL: `https://<owner>.github.io/SynthForge/`

The workflow copies `index.html`, `src/`, `styles/`, `assets/` into `_site/`, adds `404.html` and `.nojekyll`, then uses the official `actions/deploy-pages` to publish. Asset paths are relative so no base-path rewrite is needed.

## Layout

```
.
├── index.html                  entry point
├── src/
│   ├── data.jsx                parsers, generator, fixtures, icons
│   └── app.jsx                 8 screens + routing
├── styles/
│   ├── tokens.css              msg design tokens
│   ├── app.css                 application styles
│   └── fonts/                  Aptos webfonts
├── assets/                     msg logos
└── .github/workflows/pages.yml deployment
```

## Provenance

Bootstrapped from a Claude Design handoff bundle. The original prototype shipped with hard-coded `PARSED` fixtures keyed by template id; this implementation replaces them with real recursive-descent / regex parsers per language plus a heuristic NL extractor, so the pipeline runs end-to-end on any input the user provides.
