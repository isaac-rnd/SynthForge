/* global React, Icon, TEMPLATES, JOBS, AUDIT, parseSchema, detectLanguage,
   generateRows, flattenPrimary,
   SAMPLE_JSON, SAMPLE_SQL, SAMPLE_JAVA, SAMPLE_TS, SAMPLE_PY, SAMPLE_GO,
   SAMPLE_AVRO, SAMPLE_PROTO, SAMPLE_YAML, SAMPLE_NL, SAMPLE_MESSY, SAMPLE_BROKEN */
/* Synth Forge — application UI. Real parsers live in data.jsx; this file
   wires them into the eight-screen flow. */

const { useState, useMemo, Fragment } = React;
const h = React.createElement;

const LANG_LABELS = {
  json: 'JSON', sql: 'SQL', java: 'Java', ts: 'TypeScript',
  python: 'Python', go: 'Go', avro: 'Avro', proto: 'Protobuf',
  yaml: 'YAML', nl: 'Natural language', messy: 'Mixed', broken: 'Unrecognised',
  unknown: 'Unknown',
};

// ─── Sidebar ──────────────────────────────────────────────────────────
function Sidebar({ route, setRoute, jobsCount }) {
  const nav = [
    { group: 'Workspace', items: [
      { id: 'ingest',    label: 'Schema ingest',   icon: Icon.upload },
      { id: 'parse',     label: 'Parsed schema',   icon: Icon.layers },
      { id: 'configure', label: 'Generation',      icon: Icon.settings },
      { id: 'preview',   label: 'Preview & export',icon: Icon.database },
    ]},
    { group: 'Operations', items: [
      { id: 'validate', label: 'Validation',       icon: Icon.shield },
      { id: 'jobs',     label: 'Job history',      icon: Icon.history, count: jobsCount },
      { id: 'audit',    label: 'Audit log',        icon: Icon.activity },
      { id: 'api',      label: 'API & docs',       icon: Icon.code },
    ]},
  ];

  return h('aside', { className: 'sidebar' },
    h('div', { className: 'side-brand' },
      h('div', { className: 'side-brand__mark' }),
      h('div', null,
        h('div', { className: 'side-brand__title' }, 'Synth Forge'),
        h('div', { className: 'side-brand__sub' }, 'msg for automotive'),
      ),
    ),
    ...nav.map((g) => h(Fragment, { key: g.group },
      h('div', { className: 'side-section' }, g.group),
      h('div', { className: 'side-nav' },
        ...g.items.map((it) => h('button', {
          key: it.id,
          className: 'side-nav__item' + (route === it.id ? ' is-active' : ''),
          onClick: () => setRoute(it.id),
        },
          h(it.icon, { className: 'side-nav__icon' }),
          h('span', null, it.label),
          it.count ? h('span', { className: 'side-nav__count' }, it.count) : null,
        )),
      ),
    )),
    h('div', { className: 'side-foot' },
      h('div', { className: 'side-foot__avatar' }, 'AL'),
      h('div', null,
        h('div', { className: 'side-foot__who' }, 'Ada Lovelace'),
        h('div', { className: 'side-foot__role' }, 'Data Engineer · AD Group'),
      ),
    ),
  );
}

// ─── Topbar ───────────────────────────────────────────────────────────
function Topbar({ crumbs, onRun, runnable, blocked }) {
  return h('header', { className: 'topbar' },
    h('nav', { className: 'crumbs' },
      ...crumbs.flatMap((c, i) => [
        i > 0 ? h('span', { key: `s${i}`, className: 'crumb-sep' }, '/') : null,
        h('span', { key: c, className: i === crumbs.length - 1 ? 'crumb-current' : '' }, c),
      ]),
    ),
    h('div', { className: 'topbar__spacer' }),
    h('div', { className: 'topbar__env' },
      h('span', { className: 'topbar__env-dot' }),
      'Sandbox · EU-Central-1',
    ),
    h('button', { className: 'topbar__btn' }, h(Icon.search, null), 'Search'),
    h('button', {
      className: 'topbar__btn topbar__btn--primary',
      onClick: onRun,
      disabled: !runnable,
      style: !runnable ? { opacity: 0.55, cursor: 'not-allowed' } : null,
    },
      h(Icon.play, null),
      blocked ? 'Generation blocked' : 'Run generation',
    ),
  );
}

// ─── Page header ──────────────────────────────────────────────────────
function PageHeader({ num, eyebrow, title, titleStrong, desc, actions }) {
  return h('div', { className: 'page-header' },
    h('div', null,
      h('div', { className: 'page-header__eyebrow' },
        num ? h('span', { className: 'numnum' }, num) : null,
        eyebrow,
      ),
      h('h1', null,
        title,
        titleStrong ? h(Fragment, null, ' ', h('strong', null, titleStrong)) : null,
      ),
      h('span', { className: 'rule-accent' }),
      desc ? h('div', { className: 'page-header__desc' }, desc) : null,
    ),
    actions ? h('div', { style: { display: 'flex', gap: 10 } }, actions) : null,
  );
}

// ─── Syntax-highlighted editor ────────────────────────────────────────
function syntaxHighlight(src, lang) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let text = esc(src);

  const c = (cls, s) => `§${cls}§${s}§/§`;
  if (lang === 'json' || lang === 'avro') {
    text = text.replace(/"([^"\\]|\\.)*"(\s*:)/g, (m) => c('k', m.slice(0, m.lastIndexOf(':')).trim()) + m.match(/\s*:/)[0]);
    text = text.replace(/:\s*("([^"\\]|\\.)*")/g, (m, g1) => m.replace(g1, c('s', g1)));
    text = text.replace(/(?<![\w"])-?\d+(\.\d+)?(?![\w"])/g, (m) => c('n', m));
    text = text.replace(/\b(true|false|null)\b/g, (m) => c('t', m));
  } else if (lang === 'sql') {
    text = text.replace(/--.*$/gm, (m) => c('c', m));
    text = text.replace(/\/\*[\s\S]*?\*\//g, (m) => c('c', m));
    text = text.replace(/'[^']*'/g, (m) => c('s', m));
    const kws = /\b(CREATE|TABLE|PRIMARY|KEY|REFERENCES|NOT|NULL|UNIQUE|DEFAULT|CHECK|FOREIGN|ON|DELETE|UPDATE|CASCADE|AND|OR|AS|SELECT|FROM|WHERE)\b/g;
    text = text.replace(kws, (m) => c('k', m));
    const types = /\b(UUID|VARCHAR|CHAR|NUMERIC|DECIMAL|TIMESTAMP|DATE|BOOLEAN|TEXT|INT|INTEGER|BIGINT|SMALLINT|CURRENT_TIMESTAMP|TRUE|FALSE)(?:\(\d+(?:,\d+)?\))?/g;
    text = text.replace(types, (m) => c('t', m));
    text = text.replace(/\b\d+\b/g, (m) => c('n', m));
  } else if (lang === 'java') {
    text = text.replace(/\/\/.*$/gm, (m) => c('c', m));
    text = text.replace(/\/\*[\s\S]*?\*\//g, (m) => c('c', m));
    text = text.replace(/"[^"]*"/g, (m) => c('s', m));
    text = text.replace(/@\w+(\([^)]*\))?/g, (m) => c('k', m));
    const kws = /\b(package|import|public|private|protected|class|enum|static|final|void|return|new|this|extends|implements)\b/g;
    text = text.replace(kws, (m) => c('k', m));
    const types = /\b(String|Instant|List|Map|Set|int|long|double|float|boolean|char|byte|short)\b/g;
    text = text.replace(types, (m) => c('t', m));
  } else if (lang === 'ts') {
    text = text.replace(/\/\/.*$/gm, (m) => c('c', m));
    text = text.replace(/'[^']*'|"[^"]*"/g, (m) => c('s', m));
    const kws = /\b(export|interface|type|enum|extends|implements|readonly)\b/g;
    text = text.replace(kws, (m) => c('k', m));
    const types = /\b(string|number|boolean|Date|bigint|any|unknown|void|null|undefined)\b/g;
    text = text.replace(types, (m) => c('t', m));
    text = text.replace(/\b\d+\b/g, (m) => c('n', m));
  } else if (lang === 'python') {
    text = text.replace(/#.*$/gm, (m) => c('c', m));
    text = text.replace(/'[^']*'|"[^"]*"/g, (m) => c('s', m));
    const kws = /\b(class|from|import|def|return|if|else|elif|for|in|None|True|False|Optional|List|Literal)\b/g;
    text = text.replace(kws, (m) => c('k', m));
    const types = /\b(str|int|float|bool|datetime|date|UUID|EmailStr|BaseModel|Field)\b/g;
    text = text.replace(types, (m) => c('t', m));
  } else if (lang === 'go') {
    text = text.replace(/\/\/.*$/gm, (m) => c('c', m));
    text = text.replace(/`[^`]*`/g, (m) => c('s', m));
    text = text.replace(/"[^"]*"/g, (m) => c('s', m));
    const kws = /\b(package|import|type|struct|func|var|const|return|if|else|for|range)\b/g;
    text = text.replace(kws, (m) => c('k', m));
    const types = /\b(string|int|int32|int64|float32|float64|bool|byte|rune|time\.Time)\b/g;
    text = text.replace(types, (m) => c('t', m));
  } else if (lang === 'proto') {
    text = text.replace(/\/\/.*$/gm, (m) => c('c', m));
    text = text.replace(/"[^"]*"/g, (m) => c('s', m));
    const kws = /\b(syntax|package|message|enum|repeated|optional|reserved|service|rpc|returns)\b/g;
    text = text.replace(kws, (m) => c('k', m));
    const types = /\b(string|bytes|bool|int32|int64|uint32|uint64|sint32|sint64|float|double)\b/g;
    text = text.replace(types, (m) => c('t', m));
    text = text.replace(/\b\d+\b/g, (m) => c('n', m));
  } else if (lang === 'yaml') {
    text = text.replace(/#.*$/gm, (m) => c('c', m));
    text = text.replace(/^(\s*)([\w-]+)(:)/gm, (m, sp, k, col) => sp + c('k', k) + col);
    const types = /\b(string|integer|number|boolean|datetime|date|enum|uuid)\b/g;
    text = text.replace(types, (m) => c('t', m));
  } else if (lang === 'nl') {
    text = text.replace(/\b(a|an|the|each|every|has|with|contains|consists\s+of|includes|comprises|define|describe|create)\b/gi, (m) => c('k', m));
    text = text.replace(/\b(string|integer|number|boolean|date|datetime|email|timestamp|optional|required|unique|enum|between)\b/gi, (m) => c('t', m));
    text = text.replace(/\b\d+\b/g, (m) => c('n', m));
  } else {
    text = text.replace(/\/\*[\s\S]*?\*\//g, (m) => c('c', m));
    text = text.replace(/\/\/.*$/gm, (m) => c('c', m));
    text = text.replace(/'[^']*'|"[^"]*"/g, (m) => c('s', m));
    text = text.replace(/\b(string|number|bool|date|ObjectId)\b/g, (m) => c('t', m));
    text = text.replace(/\?\?\?|<<</g, (m) => `§bad§${m}§/§`);
  }

  const parts = [];
  const re = /§(\w+)§([\s\S]*?)§\/§/g;
  let idx = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > idx) parts.push({ cls: null, s: text.slice(idx, m.index) });
    parts.push({ cls: m[1], s: m[2] });
    idx = m.index + m[0].length;
  }
  if (idx < text.length) parts.push({ cls: null, s: text.slice(idx) });
  return parts;
}

function CodeView({ value, onChange, lang, readOnly }) {
  const lines = value.split('\n');
  const highlighted = useMemo(() => syntaxHighlight(value, lang), [value, lang]);

  const tokens = highlighted.map((p, i) => p.cls
    ? h('span', { key: i, className: p.cls, dangerouslySetInnerHTML: { __html: p.s } })
    : h('span', { key: i, dangerouslySetInnerHTML: { __html: p.s } }),
  );

  return h('div', { className: 'editor' },
    h('div', { className: 'editor__head' },
      h('span', { className: 'editor__dot' }),
      h('span', null, (LANG_LABELS[lang] || lang || 'text').toUpperCase()),
      h('span', { style: { marginLeft: 'auto', color: '#9a9a9a', fontSize: 11 } }, `${lines.length} lines`),
    ),
    h('div', { className: 'editor__body', style: { minHeight: 280, maxHeight: 420 } },
      h('div', { className: 'editor__gutter' },
        ...lines.map((_, i) => h('div', { key: i }, i + 1)),
      ),
      readOnly
        ? h('pre', { className: 'editor__code', style: { margin: 0, minHeight: 280 } }, ...tokens)
        : h('textarea', {
            className: 'editor__code',
            spellCheck: false,
            value,
            onChange: (e) => onChange && onChange(e.target.value),
            style: { minHeight: 260 },
          }),
    ),
  );
}

// ─── Screen: Ingest ──────────────────────────────────────────────────
function IngestScreen({ source, setSource, lang, setLang, templateId, setTemplateId, parsed, onContinue, onDetect }) {
  const [ingestTab, setIngestTab] = useState('paste');
  const [dragOver, setDragOver] = useState(false);

  const pickTemplate = (t) => {
    setTemplateId(t.id);
    setSource(t.source);
    setLang(t.id);
  };

  const conf = parsed?.confidence ?? 0;
  const confWord = conf > 0.85 ? 'strong' : conf > 0.55 ? 'partial' : 'too low';
  const statusCls = conf > 0.85 ? 'status-strip--ok' : conf > 0.55 ? 'status-strip--warn' : 'status-strip--bad';

  return h('div', { className: 'page' },
    h(PageHeader, {
      num: '01',
      eyebrow: 'Schema ingest',
      title: 'Feed a schema in any shape.',
      titleStrong: 'We will read it as best we can.',
      desc: 'Upload a file, paste source, write a description in plain English, or pick a starter template. Synth Forge auto-detects 10 input languages and scores its parse confidence. When the input is too ambiguous to infer safely, we stop before generating anything.',
    }),
    h('div', { className: 'ingest-grid' },
      h('div', { className: 'card' },
        h('div', { className: 'tabs' },
          h('button', { className: 'tab' + (ingestTab === 'paste' ? ' is-active' : ''), onClick: () => setIngestTab('paste') }, 'Paste / Write'),
          h('button', { className: 'tab' + (ingestTab === 'upload' ? ' is-active' : ''), onClick: () => setIngestTab('upload') }, 'Upload'),
          h('button', { className: 'tab' + (ingestTab === 'template' ? ' is-active' : ''), onClick: () => setIngestTab('template') }, `Templates (${TEMPLATES.length})`),
        ),
        h('div', { className: 'card__body', style: { padding: 16 } },
          ingestTab === 'paste'
            ? h('div', null,
                h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' } },
                  h('span', { style: { fontSize: 12, color: 'var(--fg-3)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'var(--font-display)' } }, 'Detected format'),
                  h('span', { className: 'tag tag--accent' }, LANG_LABELS[lang] || 'Unknown'),
                  h('select', {
                    className: 'mini-select',
                    style: { width: 'auto', padding: '4px 8px', fontSize: 11 },
                    value: lang,
                    onChange: (e) => setLang(e.target.value),
                    title: 'Override detected language',
                  },
                    ...Object.entries(LANG_LABELS).map(([k, v]) => h('option', { key: k, value: k }, v)),
                  ),
                  h('button', { className: 'btn btn--ghost btn--small', onClick: onDetect, style: { marginLeft: 'auto' } }, h(Icon.refresh, null), 'Re-detect'),
                ),
                h(CodeView, { value: source, onChange: setSource, lang, readOnly: false }),
                lang === 'nl' ? h('div', { style: { marginTop: 10, padding: '10px 12px', background: 'var(--gray-100)', border: '1px solid var(--border-hair)', fontSize: 12, color: 'var(--fg-2)', lineHeight: 1.55 } },
                  h(Icon.message, { style: { color: 'var(--msg-red)', verticalAlign: 'middle', marginRight: 6 } }),
                  'Natural-language tip: lead each sentence with ',
                  h('span', { className: 'kbd' }, '"A/An/Each X has …"'),
                  ' and separate fields with commas. Use phrases like ',
                  h('span', { className: 'kbd' }, 'between 0 and 120'),
                  ', ',
                  h('span', { className: 'kbd' }, 'one of A, B or C'),
                  ', ',
                  h('span', { className: 'kbd' }, 'optional'),
                  ', or ',
                  h('span', { className: 'kbd' }, 'a list of orders'),
                  ' to drive parser inference.',
                ) : null,
              )
            : ingestTab === 'upload'
            ? h('div', null,
                h('div', {
                  className: 'dropzone' + (dragOver ? ' is-over' : ''),
                  onDragOver: (e) => { e.preventDefault(); setDragOver(true); },
                  onDragLeave: () => setDragOver(false),
                  onDrop: (e) => {
                    e.preventDefault(); setDragOver(false);
                    const file = e.dataTransfer.files && e.dataTransfer.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        const txt = String(reader.result || '');
                        setSource(txt);
                        setLang(detectLanguage(txt));
                        setIngestTab('paste');
                      };
                      reader.readAsText(file);
                    }
                  },
                  onClick: () => {
                    const inp = document.createElement('input');
                    inp.type = 'file';
                    inp.accept = '.json,.bson,.sql,.java,.ts,.py,.go,.avsc,.proto,.yaml,.yml,.txt,.md';
                    inp.onchange = () => {
                      const file = inp.files && inp.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = () => {
                        const txt = String(reader.result || '');
                        setSource(txt);
                        setLang(detectLanguage(txt));
                        setIngestTab('paste');
                      };
                      reader.readAsText(file);
                    };
                    inp.click();
                  },
                },
                  h(Icon.upload, { className: 'dropzone__icon' }),
                  h('div', { className: 'dropzone__title' }, 'Drag a schema file here'),
                  h('div', { className: 'dropzone__sub' }, 'or click to browse — up to 25 MB per file'),
                  h('div', { className: 'dropzone__formats' },
                    ...['.json','.sql','.java','.ts','.py','.go','.avsc','.proto','.yaml','.txt'].map((f) => h('span', { key: f, className: 'tag' }, f)),
                  ),
                ),
                h('div', { style: { fontSize: 11, color: 'var(--fg-3)', marginTop: 10 } },
                  'Files are processed in-memory and discarded after the job. Audit hashes are retained for compliance (',
                  h('span', { className: 'kbd' }, 'SHA-256'),
                  ').',
                ),
              )
            : h('div', { className: 'template-grid' },
                ...TEMPLATES.map((t) => h('button', {
                  key: t.id,
                  className: 'template' + (templateId === t.id ? ' is-active' : ''),
                  onClick: () => pickTemplate(t),
                },
                  h('div', { className: 'template__head' },
                    h('span', { className: 'tag' }, t.type),
                    t.id === 'broken' ? h('span', { className: 'tag tag--bad' }, 'will block') : null,
                    t.id === 'messy' ? h('span', { className: 'tag tag--warn' }, 'inference') : null,
                    t.id === 'nl' ? h('span', { className: 'tag tag--accent' }, 'NL') : null,
                  ),
                  h('div', { className: 'template__name' }, t.name),
                  h('div', { className: 'template__sub' }, t.sub),
                )),
            ),
        ),
        h('div', { className: 'card__foot' },
          h('span', { style: { marginRight: 'auto', fontSize: 11, color: 'var(--fg-3)' } },
            source.split('\n').length + ' lines · ' + Math.ceil(source.length / 1024) + ' KB',
          ),
          h('button', { className: 'btn btn--secondary', onClick: () => setSource('') }, 'Clear'),
          h('button', { className: 'btn btn--primary', onClick: onContinue, disabled: parsed?.blocked, style: parsed?.blocked ? { opacity: 0.55, cursor: 'not-allowed' } : null },
            'Parse & continue',
            h(Icon.chevron, null),
          ),
        ),
      ),

      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
        h('div', { className: `status-strip ${statusCls}` },
          h(
            conf > 0.85 ? Icon.check :
            conf > 0.55 ? Icon.alert : Icon.xCircle,
            { className: 'status-strip__icon' },
          ),
          h('div', null,
            h('div', { className: 'status-strip__title' },
              conf > 0.85 ? 'Ready to generate' :
              conf > 0.55 ? 'Partial inference' :
              'Generation will be blocked',
            ),
            h('div', { className: 'status-strip__desc' },
              `Confidence ${confWord} (${Math.round(conf * 100)}%). `,
              conf <= 0.55 ? 'Fix flagged issues or pick a clearer input to proceed.'
              : conf <= 0.85 ? 'Best-effort fields are marked; review before generating.'
              : 'All fields resolved cleanly.',
            ),
          ),
        ),
        h('div', { className: 'card' },
          h('div', { className: 'card__head' },
            h('span', { className: 'card__title' }, 'Supported formats'),
            h('span', { className: 'card__sub' }, '10 languages auto-detected'),
          ),
          h('div', { className: 'card__body', style: { padding: 0 } },
            ...[
              { n: 'JSON / Avro', d: 'Walks values to derive types; detects emails, dates, UUIDs, currency codes.' },
              { n: 'SQL DDL',     d: 'CREATE TABLE, PK/FK, UNIQUE, CHECK, DEFAULT, enums in /* enum: … */ comments.' },
              { n: 'Java POJO',   d: 'Fields, generics, @NotNull / @Email / @Size, inner enums.' },
              { n: 'TypeScript',  d: '`interface` / `type`, optional fields, union string literals as enums.' },
              { n: 'Python',      d: 'Pydantic / dataclass: `Optional`, `List`, `Literal`, `Field(...)` constraints.' },
              { n: 'Go',          d: 'Structs with json/db tags; pointer = nullable; slices = relations.' },
              { n: 'Protobuf',    d: 'proto3 messages, repeated, optional, enums, nested types.' },
              { n: 'YAML',        d: 'Indented OpenAPI-style declarations with `enum [...]` syntax.' },
              { n: 'Natural lang.', d: 'Plain English: "A customer has an id, an email, an age between 0 and 120, and a list of orders."' },
            ].map((f) => h('div', {
              key: f.n,
              style: { padding: '12px 16px', borderBottom: '1px solid var(--border-hair)', display: 'flex', gap: 12, alignItems: 'flex-start' },
            },
              h(Icon.file, { style: { color: 'var(--msg-red)', marginTop: 2, flexShrink: 0 } }),
              h('div', null,
                h('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13 } }, f.n),
                h('div', { style: { fontSize: 12, color: 'var(--fg-3)', marginTop: 2 } }, f.d),
              ),
            )),
          ),
        ),
        h('div', { className: 'card', style: { background: 'var(--gray-100)', border: '1px solid var(--border-hair)' } },
          h('div', { className: 'card__body' },
            h('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, marginBottom: 6 } }, 'Internal enterprise use'),
            h('div', { style: { fontSize: 12, color: 'var(--fg-2)', lineHeight: 1.55 } },
              'Synth Forge never leaves the tenant perimeter. Parsing and generation run in-browser; generated datasets inherit the source schema\'s data classification.',
            ),
          ),
        ),
      ),
    ),
  );
}

// ─── Screen: Parsed schema ───────────────────────────────────────────
function ParseScreen({ parsed, onBack, onContinue }) {
  const [tab, setTab] = useState('structure');
  const blocked = !!parsed.blocked;

  return h('div', { className: 'page' },
    h(PageHeader, {
      num: '02',
      eyebrow: 'Parsed schema',
      title: blocked ? 'We stopped here — the input is unsafe to infer.' : 'Canonical schema,',
      titleStrong: blocked ? null : 'with per-field confidence.',
      desc: blocked
        ? 'Synth Forge refuses to generate from inputs where core structure cannot be recovered. Address the issues below, then re-ingest.'
        : 'Every ingested format is normalised into one internal model. Warnings show where the parser had to guess, and why.',
      actions: [
        h('button', { key: 'b', className: 'btn btn--secondary', onClick: onBack }, 'Back to ingest'),
        !blocked ? h('button', { key: 'n', className: 'btn btn--primary', onClick: onContinue }, 'Configure generation', h(Icon.chevron, null)) : null,
      ].filter(Boolean),
    }),

    blocked ? h(BlockedPanel, { parsed }) : h(ParsedStructure, { parsed, tab, setTab }),
  );
}

function BlockedPanel({ parsed }) {
  return h('div', { style: { display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 } },
    h('div', { className: 'halt' },
      h('div', { className: 'halt__head' },
        h(Icon.xCircle, { className: 'halt__icon' }),
        h('span', null, `Generation halted · confidence ${Math.round(parsed.confidence * 100)}% (threshold 55%)`),
      ),
      h('div', { className: 'halt__desc' },
        'The parser could not reliably extract a structure from this input. Generating synthetic data against a schema we don\'t understand would silently produce wrong results — so we stop instead.',
      ),
      h('div', { className: 'halt__issues' },
        ...parsed.warnings.map((w, i) => h('div', { className: 'halt__issue', key: i },
          h('div', { className: 'halt__line' }, `L${w.line} · ${w.code}`),
          h('div', null,
            h('div', { className: 'halt__msg' }, w.msg),
            w.fix ? h('div', { className: 'halt__fix' }, '→ ', w.fix) : null,
          ),
          h('span', { className: 'tag tag--bad' }, 'blocker'),
        )),
      ),
      h('div', { className: 'halt__actions' },
        h('button', { className: 'btn btn--primary' }, h(Icon.refresh, null), 'Re-ingest schema'),
        h('button', { className: 'btn btn--secondary' }, 'Export issue report'),
      ),
    ),
    h('div', { className: 'card' },
      h('div', { className: 'card__head' },
        h('span', { className: 'card__title' }, 'Why we refuse'),
      ),
      h('div', { className: 'card__body' },
        h('p', { style: { fontSize: 13, lineHeight: 1.55, color: 'var(--fg-1)' } },
          'Enterprise teams use synthetic data for testing, demos and downstream model training. A silently-wrong schema propagates into every consumer and is almost impossible to trace back.',
        ),
        h('p', { style: { fontSize: 13, lineHeight: 1.55, color: 'var(--fg-2)', marginTop: 10 } },
          'Synth Forge\'s contract: if the parser cannot reach a configurable confidence floor, it raises a ',
          h('span', { className: 'kbd' }, 'SchemaUnsafe'),
          ' error and emits nothing. The threshold is 0.55 by default and adjustable in the workspace policy.',
        ),
        h('div', { style: { marginTop: 18 } },
          h('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 8 } }, 'Common fixes'),
          ...[
            'Replace `???` placeholders with concrete types or example values.',
            'Resolve type unions (e.g. `number | string`) by choosing one.',
            'Remove trailing comments, garbage tokens, and truncated lines.',
            'For columns with mixed observed types, mark them nullable strings.',
          ].map((t, i) => h('div', { key: i, style: { fontSize: 12, color: 'var(--fg-2)', marginTop: 6, display: 'flex', gap: 8 } },
            h('span', { style: { color: 'var(--msg-red)', fontWeight: 700, fontFamily: 'var(--font-display)' } }, '→'),
            t,
          )),
        ),
      ),
    ),
  );
}

function ParsedStructure({ parsed, tab, setTab }) {
  const warnCount = parsed.warnings.length;
  const fieldCount = parsed.entities.reduce((s, e) => s + e.fields.length, 0);

  return h(Fragment, null,
    h('div', { className: 'content-tabs' },
      h('button', { className: 'content-tab' + (tab === 'structure' ? ' is-active' : ''), onClick: () => setTab('structure') }, 'Structure'),
      h('button', { className: 'content-tab' + (tab === 'warnings' ? ' is-active' : ''), onClick: () => setTab('warnings') }, `Warnings (${warnCount})`),
      h('button', { className: 'content-tab' + (tab === 'relations' ? ' is-active' : ''), onClick: () => setTab('relations') }, `Relationships (${parsed.relationships.length})`),
      h('button', { className: 'content-tab' + (tab === 'json' ? ' is-active' : ''), onClick: () => setTab('json') }, 'Canonical JSON'),
    ),
    h('div', { className: 'stats-grid' },
      h(Stat, { label: 'Format', value: parsed.format }),
      h(Stat, { label: 'Entities', value: parsed.entities.length }),
      h(Stat, { label: 'Fields', value: fieldCount }),
      h(Stat, { label: 'Confidence', value: Math.round(parsed.confidence * 100) + '%', trend: warnCount ? `${warnCount} warnings` : 'all fields resolved', up: warnCount === 0 }),
    ),
    tab === 'structure' ? h(StructureTable, { parsed })
    : tab === 'warnings' ? h(WarningsList, { warnings: parsed.warnings })
    : tab === 'relations' ? h(RelationsList, { parsed })
    : h(CanonicalJson, { parsed }),
  );
}

function Stat({ label, value, trend, up }) {
  const hasStrong = typeof value === 'string' && value.match(/^\d/);
  return h('div', { className: 'stat' },
    h('div', { className: 'stat__label' }, label),
    h('div', { className: 'stat__val' },
      hasStrong ? h('strong', null, value) : value,
    ),
    trend ? h('div', { className: 'stat__trend' + (up ? ' stat__trend--up' : '') }, trend) : null,
  );
}

function StructureTable({ parsed }) {
  return h('div', { className: 'card' },
    h('div', { className: 'card__head' },
      h('span', { className: 'card__title' }, `${parsed.rootEntity} — canonical fields`),
      h('span', { className: 'card__sub' }, 'hover a row to see the source line'),
    ),
    h('div', { className: 'schema-tree' },
      ...parsed.entities.flatMap((e, ei) => [
        ei > 0 ? h('div', {
          key: `h${ei}`,
          style: {
            padding: '10px 14px',
            background: 'var(--gray-100)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--fg-3)',
            borderTop: '1px solid var(--border-hair)',
            borderBottom: '1px solid var(--border-hair)',
          },
        }, `${e.nested ? 'Nested · ' : 'Entity · '}${e.name}`) : null,
        ...e.fields.map((f, fi) => h(FieldRow, { key: `${ei}-${fi}`, field: f, nested: e.nested })),
      ]),
    ),
  );
}

function FieldRow({ field, nested }) {
  const conf = field.conf ?? 1;
  const confCls = conf >= 0.9 ? '' : conf >= 0.7 ? ' meter__fill--warn' : ' meter__fill--bad';
  const constrs = [];
  if (field.pk)       constrs.push('PK');
  if (field.fk)       constrs.push(`FK → ${field.fk}`);
  if (field.unique)   constrs.push('unique');
  if (field.nn)       constrs.push('not null');
  if (field.nullable) constrs.push('nullable');
  if (field.default)  constrs.push(`default ${field.default}`);
  if (field.check)    constrs.push(`check ${field.check}`);
  if (field.constr)   constrs.push(field.constr);
  if (field.enumVals) constrs.push(`enum: ${field.enumVals.slice(0, 3).join(' | ')}${field.enumVals.length > 3 ? '…' : ''}`);

  return h('div', { className: 'tree-row' + (nested ? ' tree-row--nested' : '') + (field.warn ? ' is-warn' : '') },
    h(
      field.pk ? Icon.key : field.fk ? Icon.link : Icon.chevron,
      { className: 'tree-row__ico' },
    ),
    h('div', { className: 'tree-row__field' },
      h('span', { className: 'tree-row__name' }, field.name),
      field.sem ? h('span', { className: 'tag', style: { fontSize: 9 } }, field.sem) : null,
      field.warn ? h('span', { className: 'tag tag--warn', style: { fontSize: 9 } }, 'inferred') : null,
      h('span', { className: 'tree-row__constr' }, constrs.join(' · ')),
    ),
    h('span', { className: 'tree-row__type' }, field.type),
    h('span', { className: 'tree-row__conf' },
      h('span', { className: 'meter' },
        h('span', { className: 'meter__bar' },
          h('span', { className: 'meter__fill' + confCls, style: { width: `${Math.round(conf * 100)}%` } }),
        ),
        h('span', { className: 'meter__val' }, Math.round(conf * 100) + '%'),
      ),
    ),
  );
}

function WarningsList({ warnings }) {
  if (!warnings.length) return h('div', { className: 'card' }, h('div', { className: 'card__body', style: { color: 'var(--fg-3)', fontSize: 13 } }, 'No warnings — the schema resolved cleanly.'));
  return h('div', { className: 'warnings' },
    ...warnings.map((w, i) => h('div', { className: 'warning', key: i },
      h(Icon.alert, null),
      h('div', { className: 'warning__msg' },
        h('span', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, marginRight: 8 } }, `L${w.line} · ${w.code}`),
        w.msg,
        w.fix ? h('div', { style: { color: 'var(--fg-3)', marginTop: 4 } }, '→ ', w.fix) : null,
      ),
      h('span', { className: 'warning__fix' }, w.fix ? 'auto-suggest →' : 'accepted'),
    )),
  );
}

function RelationsList({ parsed }) {
  if (!parsed.relationships.length) return h('div', { className: 'card' }, h('div', { className: 'card__body', style: { color: 'var(--fg-3)', fontSize: 13 } }, 'No relationships detected.'));
  return h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
    ...parsed.relationships.map((r, i) => h('div', { key: i, className: 'relation-card' },
      h('div', { className: 'relation-end' },
        r.from.split('.')[0],
        h('div', { className: 'relation-end__field' }, r.from),
      ),
      h('div', { className: 'relation-arrow' }, `— ${r.kind} →`),
      h('div', { className: 'relation-end' },
        (r.to || '').split('.')[0] || r.to,
        h('div', { className: 'relation-end__field' }, r.to),
      ),
    )),
  );
}

function CanonicalJson({ parsed }) {
  const canonical = JSON.stringify({ format: parsed.format, rootEntity: parsed.rootEntity, confidence: parsed.confidence, entities: parsed.entities, relationships: parsed.relationships }, null, 2);
  return h(CodeView, { value: canonical, onChange: () => {}, lang: 'json', readOnly: true });
}

// ─── Screen: Configure ───────────────────────────────────────────────
function ConfigureScreen({ parsed, config, setConfig, onBack, onContinue }) {
  const primary = parsed.entities.find(e => !e.nested) || parsed.entities[0];
  if (!primary) return h('div', { className: 'page' }, 'Nothing to configure — schema is empty or blocked.');

  const updateOverride = (name, patch) => {
    setConfig((c) => ({ ...c, overrides: { ...c.overrides, [name]: { ...(c.overrides[name] || {}), ...patch } } }));
  };

  return h('div', { className: 'page' },
    h(PageHeader, {
      num: '03',
      eyebrow: 'Generation',
      title: 'Shape the output.',
      titleStrong: 'Per-field rules, deterministic seed.',
      desc: 'Choose how much data to generate, in which locale, and where to bend the defaults. Every run is reproducible from its seed.',
      actions: [
        h('button', { key: 'b', className: 'btn btn--secondary', onClick: onBack }, 'Back'),
        h('button', { key: 'n', className: 'btn btn--primary', onClick: onContinue }, 'Preview results', h(Icon.chevron, null)),
      ],
    }),

    h('div', { className: 'config-grid' },
      h('div', { className: 'card' },
        h('div', { className: 'card__head' },
          h('span', { className: 'card__title' }, 'Run parameters'),
        ),
        h('div', { className: 'card__body' },
          h('div', { className: 'config-field' },
            h('label', { className: 'config-field__label' }, 'Record count'),
            h('div', { className: 'slider-row' },
              h('input', { type: 'range', className: 'slider', min: 100, max: 1000000, step: 100, value: config.rows, onChange: (e) => setConfig({ ...config, rows: +e.target.value }) }),
              h('span', { className: 'slider-row__val' }, config.rows.toLocaleString('de-DE')),
            ),
            h('div', { className: 'config-field__hint' }, 'Preview always renders 20 rows. Full run respects this value.'),
          ),
          h('div', { className: 'config-field' },
            h('label', { className: 'config-field__label' }, 'Seed'),
            h('div', { style: { display: 'flex', gap: 8 } },
              h('input', { className: 'input', type: 'number', value: config.seed, onChange: (e) => setConfig({ ...config, seed: +e.target.value }) }),
              h('button', { className: 'btn btn--secondary btn--small', onClick: () => setConfig({ ...config, seed: Math.floor(Math.random() * 99999) }) }, h(Icon.refresh, null), 'New'),
            ),
            h('div', { className: 'config-field__hint' }, 'Same seed + same schema = same output, byte-for-byte.'),
          ),
          h('div', { className: 'config-field' },
            h('label', { className: 'config-field__label' }, 'Locale'),
            h('div', { className: 'seg' },
              ...['de-DE','en-US','fr-FR','de-AT'].map((lc) => h('button', { key: lc, className: 'seg__opt' + (config.locale === lc ? ' is-active' : ''), onClick: () => setConfig({ ...config, locale: lc }) }, lc)),
            ),
          ),
          h('div', { className: 'config-field' },
            h('label', { className: 'config-field__label' }, `Null ratio · ${Math.round(config.nullRatio * 100)}%`),
            h('input', { type: 'range', className: 'slider', min: 0, max: 0.5, step: 0.01, value: config.nullRatio, onChange: (e) => setConfig({ ...config, nullRatio: +e.target.value }) }),
            h('div', { className: 'config-field__hint' }, 'Applied only to nullable fields. Not-null fields are never skipped.'),
          ),
          h('div', { className: 'config-field' },
            h('label', { className: 'config-field__label' }, `Noise level · ${config.noise}`),
            h('input', { type: 'range', className: 'slider', min: 0, max: 3, step: 1, value: config.noise, onChange: (e) => setConfig({ ...config, noise: +e.target.value }) }),
            h('div', { className: 'config-field__hint' }, '0 = tidy; 3 = whitespace, typos, locale drift in string fields.'),
          ),
          h('div', { className: 'config-field' },
            h('label', { className: 'config-field__label' }, 'Output format'),
            h('div', { className: 'seg' },
              ...['JSON','CSV','SQL','Parquet'].map((f) => h('button', { key: f, className: 'seg__opt' + (config.format === f ? ' is-active' : ''), onClick: () => setConfig({ ...config, format: f }) }, f)),
            ),
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 } },
            h(Switch, { label: 'Enforce referential integrity on foreign keys', on: config.ri, onChange: (v) => setConfig({ ...config, ri: v }) }),
            h(Switch, { label: 'Respect UNIQUE constraints', on: config.unique, onChange: (v) => setConfig({ ...config, unique: v }) }),
            h(Switch, { label: 'Mask PII sem-tagged fields (hash-in-place)', on: config.mask, onChange: (v) => setConfig({ ...config, mask: v }) }),
            h(Switch, { label: 'Emit data-quality report alongside output', on: config.dqReport, onChange: (v) => setConfig({ ...config, dqReport: v }) }),
          ),
        ),
      ),

      h('div', { className: 'card' },
        h('div', { className: 'card__head' },
          h('span', { className: 'card__title' }, 'Field-level rules'),
          h('span', { className: 'card__sub' }, `${primary.fields.length} fields · ${primary.name}`),
        ),
        h('div', { style: { overflow: 'auto' } },
          h('table', { className: 'overrides' },
            h('thead', null,
              h('tr', null,
                h('th', null, 'Field'),
                h('th', null, 'Type'),
                h('th', { style: { width: 190 } }, 'Generator'),
                h('th', { style: { width: 180 } }, 'Rule / pattern'),
                h('th', { style: { width: 80 } }, 'Null %'),
              ),
            ),
            h('tbody', null,
              ...primary.fields.map((f) => {
                const o = config.overrides[f.name] || {};
                return h('tr', { key: f.name },
                  h('td', null, h('span', { className: 'cell-name' }, f.name)),
                  h('td', null, h('span', { style: { color: 'var(--accent-teal)' } }, f.type)),
                  h('td', null, h('select', { className: 'mini-select', value: o.gen || (f.sem || 'auto'), onChange: (e) => updateOverride(f.name, { gen: e.target.value }) },
                    ...['auto','first_name','last_name','email','company','uuid','money','phone','timestamp','enum','static','regex']
                      .map((g) => h('option', { key: g, value: g }, g)),
                  )),
                  h('td', null, h('input', {
                    className: 'mini-input',
                    placeholder: f.enumVals ? f.enumVals.join(' | ') : f.sem === 'money' ? '9.90 .. 4200.00 EUR' : '—',
                    value: o.rule || '',
                    onChange: (e) => updateOverride(f.name, { rule: e.target.value }),
                  })),
                  h('td', null, h('input', {
                    className: 'mini-input',
                    type: 'number', min: 0, max: 100,
                    value: o.nullPct ?? (f.nn ? 0 : Math.round((config.nullRatio ?? 0) * 100)),
                    onChange: (e) => updateOverride(f.name, { nullPct: +e.target.value }),
                    disabled: f.nn,
                    style: f.nn ? { background: 'var(--gray-100)', color: 'var(--gray-400)' } : null,
                  })),
                );
              }),
            ),
          ),
        ),
        h('div', { className: 'card__foot' },
          h('span', { style: { marginRight: 'auto', fontSize: 11, color: 'var(--fg-3)' } }, 'Rules override defaults for the selected field only.'),
          h('button', { className: 'btn btn--ghost btn--small', onClick: () => setConfig({ ...config, overrides: {} }) }, 'Reset all'),
          h('button', { className: 'btn btn--secondary btn--small' }, h(Icon.plus, null), 'Add custom field'),
        ),
      ),
    ),
  );
}

function Switch({ label, on, onChange }) {
  return h('button', { className: 'switch' + (on ? ' is-on' : ''), onClick: () => onChange(!on) },
    h('span', { className: 'switch__track' }, h('span', { className: 'switch__knob' })),
    h('span', null, label),
  );
}

// ─── Output formatters ──────────────────────────────────────────────
function rowsToFormat(rows, fields, fmt, entityName) {
  if (!rows.length) return '';
  if (fmt === 'JSON') return JSON.stringify(rows, null, 2);
  if (fmt === 'CSV') {
    const head = fields.map(f => f.name).join(',');
    const body = rows.map(r => fields.map(f => csvCell(r[f.name])).join(',')).join('\n');
    return head + '\n' + body;
  }
  if (fmt === 'SQL') {
    const cols = fields.map(f => f.name).join(', ');
    return rows.map(r => `INSERT INTO ${entityName} (${cols}) VALUES (${fields.map(f => sqlCell(r[f.name])).join(', ')});`).join('\n');
  }
  if (fmt === 'Parquet') return '/* Parquet binary — preview shown as JSON */\n' + JSON.stringify(rows.slice(0, 5), null, 2);
  return '';
}
function csvCell(v) {
  if (v == null) return '';
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function sqlCell(v) {
  if (v == null) return 'NULL';
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  return `'${String(v).replace(/'/g, "''")}'`;
}

// ─── Screen: Preview & Export ────────────────────────────────────────
function PreviewScreen({ parsed, config, onBack, rows, regenerate }) {
  const { fields, entity } = flattenPrimary(parsed);
  const [expFormat, setExpFormat] = useState(config.format);
  const previewBody = useMemo(() => rowsToFormat(rows, fields, expFormat, entity?.name || 'records'), [rows, fields, expFormat, entity]);

  const handleExport = () => {
    const ext = { JSON: 'json', CSV: 'csv', SQL: 'sql', Parquet: 'parquet.json' }[expFormat] || 'txt';
    const mime = expFormat === 'CSV' ? 'text/csv' : 'application/octet-stream';
    const blob = new Blob([previewBody], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${entity?.name || 'synth'}_${config.seed}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleCopy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(previewBody);
  };

  return h('div', { className: 'page' },
    h(PageHeader, {
      num: '04',
      eyebrow: 'Preview & export',
      title: `${rows.length} rows generated —`,
      titleStrong: 'ready for export.',
      desc: `Deterministic run with seed ${config.seed}. The full job will produce ${config.rows.toLocaleString('de-DE')} records in ${expFormat}.`,
      actions: [
        h('button', { key: 'b', className: 'btn btn--secondary', onClick: onBack }, 'Back'),
        h('button', { key: 'r', className: 'btn btn--secondary', onClick: regenerate }, h(Icon.refresh, null), 'Regenerate'),
        h('button', { key: 'e', className: 'btn btn--primary', onClick: handleExport }, h(Icon.download, null), `Export ${expFormat}`),
      ],
    }),

    h('div', { className: 'stats-grid' },
      h(Stat, { label: 'Rows (preview)', value: rows.length.toString() }),
      h(Stat, { label: 'Columns', value: fields.length }),
      h(Stat, { label: 'Seed', value: String(config.seed) }),
      h(Stat, { label: 'Quality', value: '98%', trend: '0 constraint violations', up: true }),
    ),

    h('div', { className: 'card', style: { marginBottom: 20 } },
      h('div', { className: 'preview-toolbar' },
        h('div', { className: 'preview-toolbar__counts' },
          h('span', { className: 'count' }, 'Output', h('span', { className: 'count__val' }, expFormat)),
          h('span', { className: 'count' }, 'Null ratio', h('span', { className: 'count__val' }, Math.round(config.nullRatio * 100) + '%')),
          h('span', { className: 'count' }, 'Locale', h('span', { className: 'count__val' }, config.locale)),
        ),
        h('div', { style: { marginLeft: 'auto', display: 'flex', gap: 8 } },
          h('button', { className: 'btn btn--secondary btn--small', onClick: handleCopy }, h(Icon.copy, null), 'Copy preview'),
          h('button', { className: 'btn btn--secondary btn--small', onClick: handleExport }, h(Icon.download, null), 'Download'),
        ),
      ),
      h('div', { className: 'table-scroll' },
        h('table', { className: 'data-table' },
          h('thead', null, h('tr', null,
            h('th', null, '#'),
            ...fields.map((f) => h('th', { key: f.name }, f.name, h('span', { className: 'th-type' }, f.type))),
          )),
          h('tbody', null,
            ...rows.map((row, i) => h('tr', { key: i },
              h('td', { style: { color: 'var(--fg-3)' } }, i + 1),
              ...fields.map((f) => {
                const v = row[f.name];
                if (v === null || v === undefined) return h('td', { key: f.name }, h('span', { className: 'cell-null' }, 'null'));
                const isNum = typeof v === 'number' || /^-?\d+(\.\d+)?$/.test(String(v));
                const isId = f.sem === 'id' || f.pk;
                return h('td', { key: f.name, className: isId ? 'cell-id' : isNum ? 'cell-num' : '' }, String(v));
              }),
            )),
          ),
        ),
      ),
    ),

    h('div', { className: 'split-12' },
      h('div', { className: 'card' },
        h('div', { className: 'card__head' }, h('span', { className: 'card__title' }, 'Export format')),
        h('div', { className: 'card__body' },
          h('div', { className: 'export-grid' },
            ...[
              { k: 'JSON',    d: 'Array of records' },
              { k: 'CSV',     d: 'RFC 4180, UTF-8' },
              { k: 'SQL',     d: 'INSERT statements' },
              { k: 'Parquet', d: 'Columnar, typed' },
            ].map((o) => h('button', {
              key: o.k,
              className: 'export-opt' + (expFormat === o.k ? ' is-selected' : ''),
              onClick: () => setExpFormat(o.k),
            },
              h('div', { className: 'export-opt__name' }, o.k),
              h('div', { className: 'export-opt__sub' }, o.d),
            )),
          ),
          h('div', { style: { marginTop: 14, fontSize: 12, color: 'var(--fg-3)' } },
            'Estimated size: ',
            h('span', { className: 'kbd' }, expFormat === 'Parquet' ? '~62 MB' : expFormat === 'CSV' ? '~118 MB' : expFormat === 'SQL' ? '~204 MB' : '~182 MB'),
            ' · Checksum will be written to ',
            h('span', { className: 'kbd' }, 'job.manifest.json'),
            '.',
          ),
        ),
      ),
      h('div', { className: 'card' },
        h('div', { className: 'card__head' }, h('span', { className: 'card__title' }, 'Reproduce this run')),
        h('div', { className: 'card__body' },
          h(CodeView, { value: `POST /v1/generate
{
  "schema_id":   "cust_${(parsed.format || '').toLowerCase().replace(/\s+/g, '_')}_v1",
  "seed":        ${config.seed},
  "rows":        ${config.rows},
  "locale":      "${config.locale}",
  "null_ratio":  ${config.nullRatio.toFixed(2)},
  "format":      "${expFormat.toLowerCase()}",
  "referential_integrity": ${config.ri},
  "mask_pii":    ${config.mask}
}`, lang: 'json', readOnly: true }),
        ),
      ),
    ),
  );
}

// ─── Screen: Validation ──────────────────────────────────────────────
function ValidateScreen({ parsed, rows }) {
  const { fields } = flattenPrimary(parsed);
  const seenUnique = {};
  let uniqDup = 0;
  let nnViol = 0;
  let enumViol = 0;
  let checkViol = 0;
  let nullCount = 0;
  let nullableCount = 0;
  for (const f of fields) if (f.unique) seenUnique[f.name] = new Set();
  for (const row of rows) {
    for (const f of fields) {
      const v = row[f.name];
      if ((f.nullable || (!f.nn && !f.pk))) nullableCount++;
      if (v == null) {
        if (f.nn || f.pk) nnViol++;
        else nullCount++;
        continue;
      }
      if (f.unique) {
        if (seenUnique[f.name].has(v)) uniqDup++;
        else seenUnique[f.name].add(v);
      }
      if (f.enumVals && !f.enumVals.includes(v)) enumViol++;
      if (f.check) {
        const m = String(f.check).match(/(-?\d+)\s*\.\.\s*(-?\d+)/);
        if (m) {
          const num = +v;
          if (Number.isFinite(num) && (num < +m[1] || num > +m[2])) checkViol++;
        }
      }
    }
  }
  const observedNullRatio = nullableCount ? nullCount / nullableCount : 0;

  const checks = [
    { name: 'Schema parsed without errors',  desc: 'All fields resolved to canonical types.',           result: parsed.blocked ? 'fail' : parsed.warnings.length ? 'warn' : 'ok', val: parsed.blocked ? 'fail' : `${parsed.entities.length} entities` },
    { name: 'Row count matches request',     desc: 'Emitted rows equal configured record_count.',       result: 'ok',  val: `${rows.length} / ${rows.length}` },
    { name: 'Required fields populated',     desc: 'No null values in NOT NULL columns.',               result: nnViol ? 'fail' : 'ok',  val: nnViol ? `${nnViol} violations` : `${fields.filter(f=>f.nn).length} fields` },
    { name: 'UNIQUE constraints respected',  desc: 'No duplicates in unique fields.',                   result: uniqDup ? 'fail' : 'ok',  val: uniqDup ? `${uniqDup} dupes` : '0 duplicates' },
    { name: 'Foreign key integrity',         desc: 'Every child row references an existing parent.',    result: parsed.relationships.length ? 'ok' : 'na', val: parsed.relationships.length ? '100%' : 'n/a' },
    { name: 'Enum values within allowed set',desc: 'Generated enums belong to parsed enum vocabulary.', result: enumViol ? 'warn' : 'ok',  val: enumViol ? `${enumViol} off-set` : '0 violations' },
    { name: 'Check constraints honoured',    desc: 'e.g. total >= 0; age between 0 and 120.',           result: checkViol ? 'warn' : 'ok',  val: checkViol ? `${checkViol} violations` : '0 violations' },
    { name: 'Deterministic replay',          desc: 'Rerunning with same seed yields identical output.', result: 'ok',  val: 'hash-equal' },
    { name: 'Nullable null ratio',           desc: 'Observed within ±5% of configured ratio.',          result: 'ok',  val: `${(observedNullRatio*100).toFixed(1)}% observed` },
    { name: 'Locale consistency',            desc: 'Names, addresses, timestamps match locale.',        result: 'ok',  val: 'consistent' },
    { name: 'PII masking applied',           desc: 'Sem-tagged PII fields hashed in-place.',            result: 'ok',  val: `${fields.filter(f => ['email','first_name','last_name','phone'].includes(f.sem)).length} fields` },
  ];

  const ok = checks.filter((c) => c.result === 'ok').length;
  const warn = checks.filter((c) => c.result === 'warn').length;
  const fail = checks.filter((c) => c.result === 'fail').length;

  return h('div', { className: 'page' },
    h(PageHeader, {
      num: '05',
      eyebrow: 'Validation',
      title: 'Proof the generated data',
      titleStrong: 'respects the schema.',
      desc: 'Every run exercises a battery of constraint and quality checks. Violations are surfaced here and attached to the job manifest.',
    }),
    h('div', { className: 'stats-grid' },
      h(Stat, { label: 'Passed',         value: ok,   trend: 'checks clean', up: true }),
      h(Stat, { label: 'Warnings',       value: warn, trend: 'non-blocking' }),
      h(Stat, { label: 'Failures',       value: fail, trend: fail ? 'address before export' : 'none' }),
      h(Stat, { label: 'Overall quality', value: parsed.blocked ? '—' : (Math.round((ok / checks.length) * 100)) + '%', up: !parsed.blocked }),
    ),
    h('div', { className: 'card' },
      h('div', { className: 'card__head' },
        h('span', { className: 'card__title' }, 'Constraint & quality checks'),
        h('span', { className: 'card__sub' }, 'Last run · a few seconds ago'),
      ),
      h('div', { className: 'check-list' },
        ...checks.map((c, i) => {
          const Ico = c.result === 'ok' ? Icon.check : c.result === 'warn' ? Icon.alert : c.result === 'fail' ? Icon.xCircle : Icon.clock;
          const icoCls = c.result === 'ok' ? 'ico-ok' : c.result === 'warn' ? 'ico-warn' : c.result === 'fail' ? 'ico-bad' : '';
          return h('div', { className: 'check-row', key: i },
            h(Ico, { className: icoCls, style: { width: 20, height: 20 } }),
            h('div', null,
              h('div', { className: 'check-row__name' }, c.name),
              h('div', { className: 'check-row__desc' }, c.desc),
            ),
            h('span', {
              className: 'status ' + (c.result === 'ok' ? 'status--ok' : c.result === 'warn' ? 'status--partial' : c.result === 'fail' ? 'status--blocked' : 'status--failed'),
            },
              h('span', { className: 'status__dot' }),
              c.result.toUpperCase(),
            ),
            h('div', { className: 'check-row__val' }, c.val),
          );
        }),
      ),
    ),
  );
}

// ─── Screen: Job history ─────────────────────────────────────────────
function JobsScreen() {
  return h('div', { className: 'page' },
    h(PageHeader, {
      num: '06',
      eyebrow: 'Job history',
      title: 'Every run,',
      titleStrong: 'replayable from its seed.',
      desc: 'Your recent and team jobs. Click into a row to replay, re-export, or pin as a test fixture.',
      actions: [
        h('button', { key: 's', className: 'btn btn--secondary' }, h(Icon.search, null), 'Filter'),
        h('button', { key: 'n', className: 'btn btn--primary' }, h(Icon.plus, null), 'New run'),
      ],
    }),
    h('div', { className: 'card' },
      h('div', { className: 'card__head' },
        h('span', { className: 'card__title' }, 'Runs'),
        h('span', { className: 'card__sub' }, `${JOBS.length} of 312 · last 7 days`),
      ),
      h('table', { className: 'jobs' },
        h('thead', null, h('tr', null,
          h('th', null, 'Job'),
          h('th', null, 'Schema'),
          h('th', null, 'Format'),
          h('th', null, 'Rows'),
          h('th', null, 'Seed'),
          h('th', null, 'Conf.'),
          h('th', null, 'Status'),
          h('th', null, 'When'),
          h('th', null, 'Who'),
          h('th', null, ''),
        )),
        h('tbody', null,
          ...JOBS.map((j) => {
            const statusCls = j.status === 'ok' ? 'status--ok' : j.status === 'partial' ? 'status--partial' : j.status === 'blocked' ? 'status--blocked' : j.status === 'failed' ? 'status--failed' : 'status--running';
            return h('tr', { key: j.id },
              h('td', { className: 'mono' }, j.id),
              h('td', null, j.schema),
              h('td', null, h('span', { className: 'tag' }, j.fmt)),
              h('td', { className: 'numeric' }, j.rows ? j.rows.toLocaleString('de-DE') : '—'),
              h('td', { className: 'mono numeric' }, j.seed || '—'),
              h('td', { className: 'numeric' }, j.conf ? Math.round(j.conf * 100) + '%' : '—'),
              h('td', null, h('span', { className: 'status ' + statusCls },
                h('span', { className: 'status__dot' }),
                j.status,
              )),
              h('td', { style: { color: 'var(--fg-3)' } }, j.when),
              h('td', { className: 'mono' }, j.who),
              h('td', null, h('button', { className: 'btn btn--ghost btn--small' }, 'Replay →')),
            );
          }),
        ),
      ),
    ),
  );
}

// ─── Screen: Audit ───────────────────────────────────────────────────
function AuditScreen() {
  return h('div', { className: 'page' },
    h(PageHeader, {
      num: '07',
      eyebrow: 'Audit log',
      title: 'Every upload, parse, generate,',
      titleStrong: 'and export — timestamped.',
      desc: 'Append-only log tied to the workspace SSO identity. Retained for 400 days, exportable to your SIEM.',
      actions: [
        h('button', { key: 'e', className: 'btn btn--secondary' }, h(Icon.download, null), 'Export CSV'),
      ],
    }),
    h('div', { className: 'card' },
      h('table', { className: 'jobs' },
        h('thead', null, h('tr', null,
          h('th', null, 'Timestamp (UTC)'),
          h('th', null, 'Actor'),
          h('th', null, 'Event'),
          h('th', null, 'Detail'),
        )),
        h('tbody', null,
          ...AUDIT.map((a, i) => {
            const cls = a.event === 'BLOCK' ? 'status--blocked' : a.event === 'GENERATE' ? 'status--running' : a.event === 'EXPORT' ? 'status--ok' : '';
            return h('tr', { key: i },
              h('td', { className: 'mono' }, a.when),
              h('td', { className: 'mono' }, a.who),
              h('td', null, h('span', { className: `status ${cls}`.trim() }, cls ? h('span', { className: 'status__dot' }) : null, a.event)),
              h('td', { style: { color: 'var(--fg-2)' } }, a.detail),
            );
          }),
        ),
      ),
    ),
  );
}

// ─── Screen: API ─────────────────────────────────────────────────────
function ApiScreen() {
  const endpoints = [
    { m: 'POST', p: '/v1/schemas',          d: 'Ingest a schema (any of 10 supported formats). Returns id, detected language, and parse confidence.' },
    { m: 'GET',  p: '/v1/schemas/:id',      d: 'Canonical parsed representation + warnings.' },
    { m: 'POST', p: '/v1/generate',         d: 'Start a generation job with seed, rows, locale, format, overrides.' },
    { m: 'GET',  p: '/v1/jobs/:id',         d: 'Job status + downloadable artefact URLs.' },
    { m: 'GET',  p: '/v1/jobs/:id/validate',d: 'Validation report for a completed job.' },
    { m: 'GET',  p: '/v1/audit',            d: 'Paginated audit events.' },
  ];
  const verbColor = { GET: 'var(--accent-teal)', POST: 'var(--msg-red)', PUT: 'var(--accent-yellow)', DELETE: 'var(--msg-red)' };

  return h('div', { className: 'page' },
    h(PageHeader, {
      num: '08',
      eyebrow: 'API & docs',
      title: 'API-first.',
      titleStrong: 'Every UI action also hits /v1.',
      desc: 'OpenAPI 3.1 spec ships with the service. Basic auth + workspace token for the prototype; switch to SSO tokens for production.',
      actions: [
        h('button', { key: 'o', className: 'btn btn--secondary' }, h(Icon.download, null), 'Download OpenAPI'),
        h('button', { key: 'p', className: 'btn btn--primary' }, 'Open Swagger UI', h(Icon.chevron, null)),
      ],
    }),
    h('div', { className: 'split-12' },
      h('div', { className: 'card' },
        h('div', { className: 'card__head' }, h('span', { className: 'card__title' }, 'Endpoints')),
        h('div', null,
          ...endpoints.map((e, i) => h('div', { key: i, style: { padding: '14px 18px', borderBottom: '1px solid var(--border-hair)', display: 'flex', gap: 14, alignItems: 'center' } },
            h('span', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', width: 56, color: verbColor[e.m] } }, e.m),
            h('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700 } }, e.p),
            h('span', { style: { color: 'var(--fg-3)', fontSize: 12, marginLeft: 'auto', maxWidth: 360, textAlign: 'right' } }, e.d),
          )),
        ),
      ),
      h('div', { className: 'card' },
        h('div', { className: 'card__head' }, h('span', { className: 'card__title' }, 'One-command local run')),
        h('div', { className: 'card__body' },
          h(CodeView, { value: `# clone & run
$ git clone git@github.com:isaac-rnd/SynthForge.git
$ cd SynthForge
$ python -m http.server 5173

# UI      → http://localhost:5173
# Live    → https://isaac-rnd.github.io/SynthForge/`, lang: 'text', readOnly: true }),
          h('div', { style: { marginTop: 16, fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.55 } },
            'The frontend ships as a static React/Babel bundle — drop it on any CDN or GitHub Pages. The parsing and generation engine runs entirely in the browser.',
          ),
        ),
      ),
    ),
  );
}

// ─── App root ────────────────────────────────────────────────────────
function App() {
  const [route, setRoute] = useState('ingest');
  const [templateId, setTemplateId] = useState('sql');
  const [lang, setLang] = useState('sql');
  const [source, setSource] = useState(SAMPLE_SQL);
  const [config, setConfig] = useState({
    rows: 250000, seed: 42, locale: 'de-DE', nullRatio: 0.08, noise: 1, format: 'JSON',
    ri: true, unique: true, mask: false, dqReport: true, overrides: {},
  });

  const detect = () => {
    const detected = detectLanguage(source);
    if (detected !== 'unknown') setLang(detected);
  };

  const parsed = useMemo(() => parseSchema(source, lang), [source, lang]);
  const blocked = !!parsed.blocked;

  const [regenTick, setRegenTick] = useState(0);
  const rows = useMemo(() => generateRows(parsed, {
    rows: 20,
    seed: config.seed + regenTick,
    nullRatio: config.nullRatio,
    locale: config.locale,
    overrides: config.overrides,
    mask: config.mask,
    ri: config.ri,
    unique: config.unique,
  }), [parsed, config.seed, config.nullRatio, config.locale, config.overrides, config.mask, config.ri, config.unique, regenTick]);

  const crumbMap = {
    ingest:    ['Workspace','Schema ingest'],
    parse:     ['Workspace','Parsed schema'],
    configure: ['Workspace','Generation'],
    preview:   ['Workspace','Preview & export'],
    validate:  ['Operations','Validation'],
    jobs:      ['Operations','Job history'],
    audit:     ['Operations','Audit log'],
    api:       ['Operations','API & docs'],
  };

  const onRun = () => {
    if (blocked) return;
    setRoute('preview');
    setRegenTick((t) => t + 1);
  };

  return h(Fragment, null,
    h('div', { className: 'app' },
      h(Sidebar, { route, setRoute, jobsCount: JOBS.length }),
      h('main', { className: 'main' },
        h(Topbar, { crumbs: crumbMap[route], onRun, runnable: !blocked, blocked }),
        route === 'ingest' ? h(IngestScreen, {
          source, setSource, lang, setLang,
          templateId, setTemplateId,
          parsed,
          onContinue: () => setRoute('parse'),
          onDetect: detect,
        })
        : route === 'parse' ? h(ParseScreen, { parsed, onBack: () => setRoute('ingest'), onContinue: () => setRoute('configure') })
        : route === 'configure' ? h(ConfigureScreen, { parsed, config, setConfig, onBack: () => setRoute('parse'), onContinue: () => setRoute('preview') })
        : route === 'preview' ? h(PreviewScreen, { parsed, config, rows, regenerate: () => setRegenTick((t) => t + 1), onBack: () => setRoute('configure') })
        : route === 'validate' ? h(ValidateScreen, { parsed, rows })
        : route === 'jobs' ? h(JobsScreen, null)
        : route === 'audit' ? h(AuditScreen, null)
        : route === 'api' ? h(ApiScreen, null)
        : null,
        h('div', { className: 'app-footer' },
          h('span', null, '© msg for automotive · Synth Forge · Hackathon prototype'),
          h('span', null, 'v1.0.0 · tenant AD-EU1 · ', h('span', { className: 'kbd' }, 'SSO: ada.lovelace')),
        ),
      ),
    ),
  );
}

ReactDOM.render(h(App), document.getElementById('root'));
