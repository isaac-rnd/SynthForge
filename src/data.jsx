/* global React */
/* Synth Forge — fixtures, real parsers, deterministic generator.
   All in-file, no network. Each parser returns the canonical schema:
     { format, rootEntity, confidence, blocked?, warnings, entities, relationships }
*/

const _ce = React.createElement;

// ─── Icons (Lucide-style inline SVG) ────────────────────────────────
const svgProps = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
const mkIcon = (paths) => (props = {}) => _ce('svg', { ...svgProps, ...props }, ...paths.map((p, i) => _ce('path', { key: i, d: p })));
const mkIconRaw = (children) => (props = {}) => _ce('svg', { ...svgProps, ...props }, ...children);

const Icon = {
  upload:   mkIcon(['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12']),
  file:     mkIcon(['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6']),
  database: mkIconRaw([_ce('ellipse', { key: 'e', cx: 12, cy: 5, rx: 9, ry: 3 }), _ce('path', { key: 'p1', d: 'M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5' }), _ce('path', { key: 'p2', d: 'M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3' })]),
  play:     mkIconRaw([_ce('polygon', { key: 'p', points: '5 3 19 12 5 21 5 3' })]),
  settings: mkIconRaw([_ce('circle', { key: 'c', cx: 12, cy: 12, r: 3 }), _ce('path', { key: 'p', d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' })]),
  check:    mkIcon(['M20 6L9 17l-5-5']),
  alert:    mkIconRaw([_ce('path', { key: 'p', d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' }), _ce('line', { key: 'l1', x1: 12, y1: 9, x2: 12, y2: 13 }), _ce('line', { key: 'l2', x1: 12, y1: 17, x2: 12, y2: 17 })]),
  xCircle:  mkIconRaw([_ce('circle', { key: 'c', cx: 12, cy: 12, r: 10 }), _ce('line', { key: 'l1', x1: 15, y1: 9, x2: 9, y2: 15 }), _ce('line', { key: 'l2', x1: 9, y1: 9, x2: 15, y2: 15 })]),
  clock:    mkIconRaw([_ce('circle', { key: 'c', cx: 12, cy: 12, r: 10 }), _ce('polyline', { key: 'p', points: '12 6 12 12 16 14' })]),
  download: mkIcon(['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3']),
  list:     mkIconRaw([_ce('line', { key: 'l1', x1: 8, y1: 6, x2: 21, y2: 6 }), _ce('line', { key: 'l2', x1: 8, y1: 12, x2: 21, y2: 12 }), _ce('line', { key: 'l3', x1: 8, y1: 18, x2: 21, y2: 18 }), _ce('line', { key: 'l4', x1: 3, y1: 6, x2: 3.01, y2: 6 }), _ce('line', { key: 'l5', x1: 3, y1: 12, x2: 3.01, y2: 12 }), _ce('line', { key: 'l6', x1: 3, y1: 18, x2: 3.01, y2: 18 })]),
  gauge:    mkIconRaw([_ce('path', { key: 'p1', d: 'M12 14l4-4' }), _ce('path', { key: 'p2', d: 'M3.34 19A10 10 0 1 1 20.66 19' })]),
  shield:   mkIcon(['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z']),
  history:  mkIconRaw([_ce('path', { key: 'p1', d: 'M1 4v6h6' }), _ce('path', { key: 'p2', d: 'M3.51 15a9 9 0 1 0 2.13-9.36L1 10' }), _ce('polyline', { key: 'p3', points: '12 7 12 12 15 14' })]),
  code:     mkIconRaw([_ce('polyline', { key: 'p1', points: '16 18 22 12 16 6' }), _ce('polyline', { key: 'p2', points: '8 6 2 12 8 18' })]),
  chevron:  mkIcon(['M9 18l6-6-6-6']),
  chevronD: mkIcon(['M6 9l6 6 6-6']),
  link:     mkIconRaw([_ce('path', { key: 'p1', d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' }), _ce('path', { key: 'p2', d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' })]),
  plus:     mkIconRaw([_ce('line', { key: 'l1', x1: 12, y1: 5, x2: 12, y2: 19 }), _ce('line', { key: 'l2', x1: 5, y1: 12, x2: 19, y2: 12 })]),
  refresh:  mkIconRaw([_ce('polyline', { key: 'p1', points: '23 4 23 10 17 10' }), _ce('polyline', { key: 'p2', points: '1 20 1 14 7 14' }), _ce('path', { key: 'p3', d: 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15' })]),
  key:      mkIcon(['M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4']),
  layers:   mkIconRaw([_ce('polygon', { key: 'p1', points: '12 2 2 7 12 12 22 7 12 2' }), _ce('polyline', { key: 'p2', points: '2 17 12 22 22 17' }), _ce('polyline', { key: 'p3', points: '2 12 12 17 22 12' })]),
  users:    mkIconRaw([_ce('path', { key: 'p1', d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }), _ce('circle', { key: 'c1', cx: 9, cy: 7, r: 4 }), _ce('path', { key: 'p2', d: 'M23 21v-2a4 4 0 0 0-3-3.87' }), _ce('path', { key: 'p3', d: 'M16 3.13a4 4 0 0 1 0 7.75' })]),
  search:   mkIconRaw([_ce('circle', { key: 'c', cx: 11, cy: 11, r: 8 }), _ce('line', { key: 'l', x1: 21, y1: 21, x2: 16.65, y2: 16.65 })]),
  activity: mkIcon(['M22 12h-4l-3 9L9 3l-3 9H2']),
  trash:    mkIconRaw([_ce('polyline', { key: 'p', points: '3 6 5 6 21 6' }), _ce('path', { key: 'p1', d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' })]),
  copy:     mkIconRaw([_ce('rect', { key: 'r', x: 9, y: 9, width: 13, height: 13, rx: 2 }), _ce('path', { key: 'p', d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' })]),
  message:  mkIconRaw([_ce('path', { key: 'p', d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' })]),
};

// ─── Sample sources ─────────────────────────────────────────────────
const SAMPLE_JSON = `{
  "customer": {
    "id":        "cust_a12bcd",
    "email":     "ada.lovelace@msg.group",
    "firstName": "Ada",
    "lastName":  "Lovelace",
    "createdAt": "2024-03-11T09:24:17Z",
    "vip":        true,
    "segment":   "enterprise",
    "address": {
      "street":  "Robert-Buerkle-Strasse 1",
      "zip":     "85737",
      "city":    "Ismaning",
      "country": "DE"
    },
    "orders": [
      { "id": "ord_001", "total": 1249.90, "currency": "EUR", "placedAt": "2025-02-14" },
      { "id": "ord_002", "total":  379.00, "currency": "EUR", "placedAt": "2025-04-02" }
    ]
  }
}`;

const SAMPLE_SQL = `-- Customer relational schema
CREATE TABLE customer (
  id            UUID         PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  first_name    VARCHAR(80)  NOT NULL,
  last_name     VARCHAR(80)  NOT NULL,
  segment       VARCHAR(32)  NOT NULL DEFAULT 'standard',
  vip           BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  country_code  CHAR(2)      NOT NULL
);

CREATE TABLE orders (
  id            UUID          PRIMARY KEY,
  customer_id   UUID          NOT NULL REFERENCES customer(id),
  total         NUMERIC(12,2) NOT NULL CHECK (total >= 0),
  currency      CHAR(3)       NOT NULL,
  placed_at     DATE          NOT NULL,
  status        VARCHAR(16)   NOT NULL /* enum: placed, paid, shipped, cancelled */
);`;

const SAMPLE_JAVA = `package group.msg.automotive.model;

import java.time.Instant;
import java.util.List;
import javax.validation.constraints.*;

public class Customer {
    @NotNull private String id;
    @Email   private String email;
    @Size(max = 80) private String firstName;
    @Size(max = 80) private String lastName;
    private Segment segment;
    private boolean vip;
    private Instant createdAt;
    private Address address;
    private List<Order> orders;

    public enum Segment { STANDARD, PREMIUM, ENTERPRISE }
}`;

const SAMPLE_TS = `// TypeScript interface
export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  segment: 'standard' | 'premium' | 'enterprise';
  vip: boolean;
  createdAt: Date;
  age?: number;
  address: Address;
  orders: Order[];
}

export interface Address {
  street: string;
  zip: string;
  city: string;
  country: string;
}

export interface Order {
  id: string;
  total: number;
  currency: 'EUR' | 'USD' | 'CHF';
  placedAt: Date;
}`;

const SAMPLE_PY = `from datetime import datetime, date
from typing import List, Optional, Literal
from pydantic import BaseModel, EmailStr, Field

class Customer(BaseModel):
    id: str = Field(..., description="customer id")
    email: EmailStr
    first_name: str = Field(..., max_length=80)
    last_name: str = Field(..., max_length=80)
    segment: Literal['standard', 'premium', 'enterprise'] = 'standard'
    vip: bool = False
    created_at: datetime
    age: Optional[int] = Field(None, ge=0, le=120)
    country_code: str = Field(..., min_length=2, max_length=2)

class Order(BaseModel):
    id: str
    customer_id: str
    total: float = Field(..., ge=0)
    currency: Literal['EUR', 'USD', 'CHF']
    placed_at: date
    status: Literal['placed', 'paid', 'shipped', 'cancelled']`;

const SAMPLE_GO = `package model

import "time"

// Customer record.
type Customer struct {
    ID         string    \`json:"id" db:"id"\`
    Email      string    \`json:"email" db:"email"\`
    FirstName  string    \`json:"first_name" db:"first_name"\`
    LastName   string    \`json:"last_name" db:"last_name"\`
    Segment    string    \`json:"segment" db:"segment"\`
    VIP        bool      \`json:"vip" db:"vip"\`
    CreatedAt  time.Time \`json:"created_at" db:"created_at"\`
    Age        *int      \`json:"age,omitempty"\`
    Country    string    \`json:"country_code" db:"country_code"\`
}

type Order struct {
    ID         string    \`json:"id"\`
    CustomerID string    \`json:"customer_id"\`
    Total      float64   \`json:"total"\`
    Currency   string    \`json:"currency"\`
    PlacedAt   time.Time \`json:"placed_at"\`
}`;

const SAMPLE_AVRO = `{
  "type": "record",
  "name": "Customer",
  "namespace": "group.msg.automotive",
  "fields": [
    { "name": "id",        "type": "string" },
    { "name": "email",     "type": "string" },
    { "name": "firstName", "type": "string" },
    { "name": "lastName",  "type": "string" },
    { "name": "segment",   "type": { "type": "enum", "name": "Segment", "symbols": ["STANDARD","PREMIUM","ENTERPRISE"] } },
    { "name": "vip",       "type": "boolean", "default": false },
    { "name": "createdAt", "type": { "type": "long", "logicalType": "timestamp-millis" } },
    { "name": "age",       "type": ["null", "int"], "default": null },
    { "name": "country",   "type": "string" }
  ]
}`;

const SAMPLE_PROTO = `syntax = "proto3";

package group.msg.automotive;

message Customer {
  string  id           = 1;
  string  email        = 2;
  string  first_name   = 3;
  string  last_name    = 4;
  Segment segment      = 5;
  bool    vip          = 6;
  int64   created_at   = 7;
  optional int32 age   = 8;
  string  country_code = 9;
  repeated Order orders = 10;

  enum Segment {
    STANDARD   = 0;
    PREMIUM    = 1;
    ENTERPRISE = 2;
  }
}

message Order {
  string id          = 1;
  string customer_id = 2;
  double total       = 3;
  string currency    = 4;
  int64  placed_at   = 5;
}`;

const SAMPLE_YAML = `# Customer schema (YAML / OpenAPI-style)
Customer:
  id:           string
  email:        string
  first_name:   string
  last_name:    string
  segment:      enum [standard, premium, enterprise]
  vip:          boolean
  created_at:   datetime
  age:          integer?
  country_code: string`;

const SAMPLE_NL = `Define a customer with an id, an email, a first name, a last name,
a segment that is one of standard, premium or enterprise, a vip flag,
a created at timestamp, an optional age between 0 and 120, and a country code.

Each customer has a list of orders. An order has an id, a customer id,
a total amount in EUR, a currency code, a placed at date, and a status
that is one of placed, paid, shipped or cancelled.`;

const SAMPLE_MESSY = `/* partial dump from a legacy mongo export — messy! */
Customer {
   id     : ObjectId
   email  :  string
   first_name : str
   last_name : string
   age:number (0..120)
   tags: [string]
   balance: ???
   created : date?
   prefs.marketing   : bool
   prefs.locale     : 'de_DE' | 'en_US'
}`;

const SAMPLE_BROKEN = `Record {
   something some data
   maybe_id: ???
   values [1, 2, 3 OR "text"]
   totally     : ambiguous
   ??     ??    ??
   trailing_junk_<<<
}`;

// ─── Templates ──────────────────────────────────────────────────────
const TEMPLATES = [
  { id: 'json',    type: 'JSON',         name: 'Customer · JSON',         sub: 'nested object with array relation', source: SAMPLE_JSON },
  { id: 'sql',     type: 'SQL DDL',      name: 'Customer + Orders · SQL', sub: 'two tables with foreign key',       source: SAMPLE_SQL },
  { id: 'java',    type: 'Java POJO',    name: 'Customer · Java',         sub: 'annotated POJO with enum',          source: SAMPLE_JAVA },
  { id: 'ts',      type: 'TypeScript',   name: 'Customer · TS interface', sub: 'union enums, optional fields',      source: SAMPLE_TS },
  { id: 'python',  type: 'Python',       name: 'Customer · Pydantic',     sub: 'BaseModel with Field constraints',  source: SAMPLE_PY },
  { id: 'go',      type: 'Go',           name: 'Customer · Go struct',    sub: 'json/db tags, time.Time',           source: SAMPLE_GO },
  { id: 'avro',    type: 'Avro',         name: 'Customer · Avro AVSC',    sub: 'records, enums, logical types',     source: SAMPLE_AVRO },
  { id: 'proto',   type: 'Protobuf',     name: 'Customer · proto3',       sub: 'messages, repeated, nested enum',   source: SAMPLE_PROTO },
  { id: 'yaml',    type: 'YAML',         name: 'Customer · YAML',         sub: 'OpenAPI-style declaration',         source: SAMPLE_YAML },
  { id: 'nl',      type: 'Natural lang.', name: 'Customer · prose',       sub: 'free-form English description',     source: SAMPLE_NL },
  { id: 'messy',   type: 'Mixed',        name: 'Legacy dump · messy',     sub: 'inconsistent, best-effort',         source: SAMPLE_MESSY },
  { id: 'broken',  type: 'Malformed',    name: 'Broken fragment',         sub: 'should refuse generation',          source: SAMPLE_BROKEN },
];

// ─── Semantic dictionary ────────────────────────────────────────────
const SEM_DICT = [
  [/(^|_)id$|^id$/i,                                          'id'],
  [/(^|_)uuid$|guid/i,                                        'id'],
  [/email|e[._-]?mail/i,                                      'email'],
  [/first[._-]?name|forename|given[._-]?name|firstname/i,     'first_name'],
  [/last[._-]?name|surname|family[._-]?name|lastname/i,       'last_name'],
  [/^name$|full[._-]?name|display[._-]?name/i,                'first_name'],
  [/phone|mobile|^tel$/i,                                     'phone'],
  [/zip|postal/i,                                             'zip'],
  [/^city$/i,                                                 'city'],
  [/street|address/i,                                         'street'],
  [/country/i,                                                'country_code'],
  [/currency/i,                                               'currency_code'],
  [/price|total|amount|cost|balance|salary|revenue|fee|money/i,'money'],
  [/created|updated|modified|placed|.*[._-]at$/i,             'timestamp'],
  [/birth[._-]?date|dob/i,                                    'date'],
];
const SEM_TO_TYPE = {
  id: 'string', email: 'string', first_name: 'string', last_name: 'string',
  phone: 'string', zip: 'string', city: 'string', street: 'string',
  country_code: 'string', currency_code: 'string',
  money: 'decimal', timestamp: 'datetime', date: 'date',
};
function semFromName(n) {
  const ln = String(n || '').toLowerCase();
  for (const [re, sem] of SEM_DICT) if (re.test(ln)) return sem;
  return null;
}
function singularize(s) {
  s = String(s || '');
  if (/ies$/i.test(s)) return s.replace(/ies$/i, 'y');
  if (/(s|x|z)es$/i.test(s)) return s.replace(/es$/i, '');
  if (/[^s]s$/i.test(s)) return s.slice(0, -1);
  return s;
}
function snakeCase(s) {
  return String(s || '')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/[\s\-.]+/g, '_')
    .toLowerCase();
}

// ─── Language detection ─────────────────────────────────────────────
function detectLanguage(src) {
  const s = (src || '').trim();
  if (!s) return 'unknown';
  const brokenMarkers = (s.match(/\?\?\?|<<</g) || []).length;
  if (brokenMarkers >= 2 && s.length < 800 && !/CREATE\s+TABLE/i.test(s)) return 'broken';
  if (/^\s*syntax\s*=\s*["']proto/.test(s) || /\bmessage\s+\w+\s*\{/.test(s)) return 'proto';
  if (/^\s*\{[\s\S]*"type"\s*:\s*"record"/.test(s)) return 'avro';
  if (/^\s*[\[{]/.test(s) && /"\s*:\s*/.test(s)) {
    try { JSON.parse(s); return 'json'; } catch (_) { /* fall through */ }
  }
  if (/CREATE\s+TABLE/i.test(s)) return 'sql';
  if (/^\s*package\s+[\w.]+\s*;/m.test(s) && /\bclass\s+\w+/.test(s)) return 'java';
  if (/\b(interface|type)\s+\w+\s*[={]/.test(s) && /:\s*(string|number|boolean|Date|any)\b/.test(s)) return 'ts';
  if (/(^|\n)\s*(class\s+\w+\s*\(|@dataclass|from\s+pydantic)/.test(s)) return 'python';
  if (/\btype\s+\w+\s+struct\s*\{/.test(s)) return 'go';
  if (/^\s*\w[\w-]*:\s*$/m.test(s) && /^\s+\w[\w-]*:\s*\w+/m.test(s)) return 'yaml';
  if (/\?\?\?|ambiguous|<<</.test(s)) return 'messy';
  if (/\b(has|with|contains|consists\s+of|each|define|describe)\b/i.test(s) && /[A-Za-z]/.test(s) && s.length > 30) return 'nl';
  return 'unknown';
}

// ─── Parser entry point ─────────────────────────────────────────────
function parseSchema(src, lang) {
  if (!src || !src.trim()) {
    return blockedSchema('empty', 'Empty input.', 'Paste a schema, upload a file, or pick a template.');
  }
  try {
    switch (lang) {
      case 'json':   return parseJSON(src);
      case 'sql':    return parseSQL(src);
      case 'java':   return parseJava(src);
      case 'ts':     return parseTS(src);
      case 'python': return parsePython(src);
      case 'go':     return parseGo(src);
      case 'avro':   return parseAvro(src);
      case 'proto':  return parseProto(src);
      case 'yaml':   return parseYAML(src);
      case 'nl':     return parseNL(src);
      case 'messy':  return parseMessy(src);
      case 'broken': return parseBroken(src);
      default: {
        const detected = detectLanguage(src);
        if (detected === 'unknown') return blockedSchema('unknown', `Could not detect format.`, 'Pick a language tab or use a template.');
        return parseSchema(src, detected);
      }
    }
  } catch (e) {
    return blockedSchema('parser_error', `Parser crashed: ${e.message}`, 'Check the source for unbalanced brackets or unsupported syntax.');
  }
}

function blockedSchema(code, msg, fix) {
  return {
    format: 'Unrecognised', rootEntity: '—', confidence: 0.05, blocked: true,
    warnings: [{ line: 1, code: code.toUpperCase(), msg, fix }],
    entities: [], relationships: [],
  };
}

function decorateField(f) {
  if (!f.sem) {
    const s = semFromName(f.name);
    if (s) f.sem = s;
  }
  if ((f.name || '').toLowerCase() === 'id') { f.pk = true; f.nn = true; }
  if (f.conf == null) f.conf = 0.92;
  return f;
}

function avgConf(entities) {
  const fc = entities.flatMap(e => e.fields.map(f => f.conf || 0.85));
  if (!fc.length) return 0.5;
  return fc.reduce((a,b)=>a+b, 0) / fc.length;
}

// ─── JSON parser ────────────────────────────────────────────────────
function parseJSON(src) {
  let obj;
  try { obj = JSON.parse(src); }
  catch (e) {
    const lineMatch = e.message.match(/position\s+(\d+)/);
    const line = lineMatch ? src.slice(0, +lineMatch[1]).split('\n').length : 1;
    return {
      format: 'JSON', rootEntity: '—', confidence: 0.15, blocked: true,
      warnings: [{ line, code: 'JSON_SYNTAX', msg: e.message, fix: 'Fix syntax (unbalanced braces, trailing commas, unquoted keys).' }],
      entities: [], relationships: [],
    };
  }

  const entities = [];
  const relationships = [];
  const warnings = [];

  let rootName = 'root', rootObj = obj;
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    const keys = Object.keys(obj);
    if (keys.length === 1 && obj[keys[0]] && typeof obj[keys[0]] === 'object' && !Array.isArray(obj[keys[0]])) {
      rootName = keys[0]; rootObj = obj[keys[0]];
    }
  } else if (Array.isArray(obj) && obj.length && typeof obj[0] === 'object') {
    rootObj = obj[0]; rootName = 'item';
  } else {
    return blockedSchema('not_object', 'Top-level JSON is not an object or array of objects.', 'Wrap your data in an object: { "entity": { ... } }.');
  }

  function fieldFromValue(name, v) {
    const f = { name };
    if (v === null) { f.type = 'string'; f.nullable = true; f.conf = 0.55; f.warn = 'observed null only'; }
    else if (typeof v === 'boolean') { f.type = 'boolean'; f.conf = 0.99; }
    else if (typeof v === 'number') { f.type = Number.isInteger(v) ? 'integer' : 'decimal'; f.conf = 0.97; }
    else if (typeof v === 'string') {
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(v)) { f.type = 'datetime'; f.sem = 'timestamp'; }
      else if (/^\d{4}-\d{2}-\d{2}$/.test(v)) f.type = 'date';
      else if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(v)) { f.type = 'string'; f.sem = 'email'; }
      else if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)) { f.type = 'uuid'; f.sem = 'id'; }
      else if (/^[A-Z]{3}$/.test(v) && ['EUR','USD','CHF','GBP','JPY'].includes(v)) { f.type = 'string'; f.sem = 'currency_code'; }
      else if (/^[A-Z]{2}$/.test(v)) { f.type = 'string'; f.sem = 'country_code'; }
      else f.type = 'string';
      f.conf = 0.95;
    }
    return f;
  }

  function walk(name, o, isNested) {
    const fields = [];
    for (const [k, v] of Object.entries(o)) {
      let f;
      if (Array.isArray(v)) {
        if (v.length && typeof v[0] === 'object' && v[0] !== null) {
          const item = singularize(k);
          f = { name: k, type: `array<${item}>`, ref: item, conf: 0.92 };
          relationships.push({ from: `${name}.${k}`, to: `${item}.id`, kind: 'has-many' });
          if (!entities.find(e => e.name === item)) walk(item, v[0], true);
        } else if (v.length) {
          const inner = fieldFromValue('item', v[0]);
          f = { name: k, type: `array<${inner.type}>`, conf: 0.9 };
        } else {
          f = { name: k, type: 'array<unknown>', conf: 0.4, warn: 'empty array — element type unknown' };
        }
      } else if (v && typeof v === 'object') {
        f = { name: k, type: 'object', ref: k, conf: 0.93 };
        relationships.push({ from: `${name}.${k}`, to: k, kind: 'embeds' });
        if (!entities.find(e => e.name === k)) walk(k, v, true);
      } else {
        f = fieldFromValue(k, v);
      }
      decorateField(f);
      fields.push(f);
    }
    entities.push({ name, nested: isNested, fields });
  }

  walk(rootName, rootObj, false);
  entities.sort((a, b) => (a.nested ? 1 : 0) - (b.nested ? 1 : 0));

  return {
    format: 'JSON', rootEntity: rootName, confidence: avgConf(entities),
    warnings, entities, relationships,
  };
}

// ─── SQL DDL parser ─────────────────────────────────────────────────
function parseSQL(src) {
  const entities = [];
  const relationships = [];
  const warnings = [];

  const tableRe = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?["`]?(\w+)["`]?\s*\(([\s\S]*?)\)\s*;/gi;
  let m;
  while ((m = tableRe.exec(src)) !== null) {
    const tableName = m[1].toLowerCase();
    const body = m[2];
    const fields = [];
    const lines = splitTopLevelCommas(body);
    for (const lineRaw of lines) {
      const line = lineRaw.trim();
      if (!line) continue;
      if (/^(PRIMARY\s+KEY|FOREIGN\s+KEY|UNIQUE|CHECK|CONSTRAINT|INDEX|KEY)\b/i.test(line)) {
        const fk = line.match(/FOREIGN\s+KEY\s*\(\s*(\w+)\s*\)\s*REFERENCES\s+(\w+)\s*\(\s*(\w+)\s*\)/i);
        if (fk) {
          const col = fk[1].toLowerCase();
          const refTable = fk[2].toLowerCase();
          const refCol = fk[3].toLowerCase();
          relationships.push({ from: `${tableName}.${col}`, to: `${refTable}.${refCol}`, kind: 'many-to-one' });
          const f = fields.find(x => x.name === col);
          if (f) f.fk = `${refTable}.${refCol}`;
        }
        continue;
      }
      const cm = line.match(/^["`]?(\w+)["`]?\s+([A-Za-z_]+(?:\s*\([^)]*\))?)\s*(.*)$/);
      if (!cm) continue;
      const [, nameRaw, typeRaw, restRaw] = cm;
      const name = nameRaw.toLowerCase();
      const type = typeRaw.toLowerCase().replace(/\s+/g, '');
      const rest = restRaw || '';
      const f = { name, type, conf: 1.0 };
      if (/PRIMARY\s+KEY/i.test(rest)) { f.pk = true; f.nn = true; }
      if (/NOT\s+NULL/i.test(rest)) f.nn = true;
      if (/\bUNIQUE\b/i.test(rest)) f.unique = true;
      const def = rest.match(/DEFAULT\s+([A-Za-z_][\w]*|'[^']*'|\d+(?:\.\d+)?|TRUE|FALSE|CURRENT_TIMESTAMP)/i);
      if (def) f.default = def[1].replace(/^'|'$/g, '');
      const chk = rest.match(/CHECK\s*\(\s*([^)]+?)\s*\)/i);
      if (chk) f.check = chk[1];
      const ref = rest.match(/REFERENCES\s+(\w+)\s*\(\s*(\w+)\s*\)/i);
      if (ref) {
        const refTable = ref[1].toLowerCase();
        const refCol = ref[2].toLowerCase();
        f.fk = `${refTable}.${refCol}`;
        relationships.push({ from: `${tableName}.${name}`, to: f.fk, kind: 'many-to-one' });
      }
      const enumComment = lineRaw.match(/\/\*\s*enum:\s*([^*]+?)\*\//i);
      if (enumComment) {
        f.type = 'enum';
        f.enumVals = enumComment[1].split(/[,|]/).map(s => s.trim()).filter(Boolean);
        f.warn = 'enum values parsed from SQL comment, not constraint';
        f.conf = 0.85;
      }
      decorateField(f);
      fields.push(f);
    }
    entities.push({ name: tableName, fields });
  }

  if (!entities.length) {
    return blockedSchema('no_tables', 'No CREATE TABLE statement found.', 'Provide one or more `CREATE TABLE …` blocks.');
  }
  return {
    format: 'SQL DDL', rootEntity: entities[0].name, confidence: avgConf(entities),
    warnings, entities, relationships,
  };
}

function splitTopLevelCommas(s) {
  const out = []; let buf = ''; let depth = 0; let inS = false; let inC = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i], nxt = s[i+1];
    if (inC) {
      buf += ch;
      if (ch === '*' && nxt === '/') { buf += nxt; i++; inC = false; }
      continue;
    }
    if (ch === '/' && nxt === '*') { inC = true; buf += ch; continue; }
    if (ch === "'" && !inS) { inS = true; buf += ch; continue; }
    if (ch === "'" &&  inS) { inS = false; buf += ch; continue; }
    if (!inS) {
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (ch === ',' && depth === 0) { out.push(buf); buf = ''; continue; }
    }
    buf += ch;
  }
  if (buf.trim()) out.push(buf);
  return out;
}

// ─── Java POJO parser ───────────────────────────────────────────────
function parseJava(src) {
  const entities = [];
  const relationships = [];

  const classRe = /public\s+class\s+(\w+)\s*(?:extends\s+\w+\s*)?(?:implements\s+[\w,\s<>]+\s*)?\{([\s\S]*?)\n\}/g;
  let cm;
  while ((cm = classRe.exec(src)) !== null) {
    const name = cm[1];
    const body = cm[2];
    const fields = [];

    const stmts = body.split(/;\s*\n?/).map(s => s.trim()).filter(Boolean);
    const enumMap = {};
    const enumRe = /public\s+enum\s+(\w+)\s*\{\s*([^}]+)\}/g;
    let em;
    while ((em = enumRe.exec(body)) !== null) {
      enumMap[em[1]] = em[2].split(',').map(s => s.trim().replace(/[(].*$/, '')).filter(Boolean);
    }

    for (let stmt of stmts) {
      if (/^public\s+enum\s+/.test(stmt)) continue;
      const annots = [];
      stmt = stmt.replace(/(@[A-Z]\w*(?:\([^)]*\))?)/g, (_m, a) => { annots.push(a); return ''; }).trim();
      const fm = stmt.match(/^(?:private|public|protected)?\s*(?:final\s+|static\s+)?([\w<>\[\]?,\s]+?)\s+(\w+)\s*(?:=\s*[^;]+)?$/);
      if (!fm) continue;
      const [, typeRaw, fieldName] = fm;
      const type = typeRaw.trim();
      const canon = mapJavaType(type);
      const f = { name: snakeCase(fieldName), type: canon.type, conf: canon.conf };
      if (canon.ref) {
        f.ref = canon.ref;
        relationships.push({ from: `${name}.${fieldName}`, to: canon.ref, kind: canon.type.startsWith('array<') ? 'has-many' : 'embeds' });
      }
      if (canon.warn) f.warn = canon.warn;

      for (const a of annots) {
        if (/@NotNull|@NotBlank|@NotEmpty/.test(a)) f.nn = true;
        if (/@Email/.test(a)) f.sem = 'email';
        if (/@Id/.test(a)) { f.pk = true; f.nn = true; }
        const sz = a.match(/@Size\s*\(\s*(?:max\s*=\s*)?(\d+)/);
        if (sz) f.constr = `max=${sz[1]}`;
        const min = a.match(/@Min\s*\(\s*(\d+)/);
        const max = a.match(/@Max\s*\(\s*(\d+)/);
        if (min || max) f.check = `${min ? '>= '+min[1] : ''}${min && max ? ' && ' : ''}${max ? '<= '+max[1] : ''}`.trim();
      }

      const tName = (f.type || '').replace(/^array</,'').replace(/>$/,'');
      if (enumMap[tName]) {
        f.type = 'enum';
        f.enumVals = enumMap[tName];
        f.conf = 0.96;
      }

      decorateField(f);
      fields.push(f);
    }

    entities.push({ name, fields });
  }

  if (!entities.length) {
    return blockedSchema('no_class', 'No `public class …` block found.', 'Provide a Java class declaration.');
  }
  return {
    format: 'Java POJO', rootEntity: entities[0].name, confidence: avgConf(entities),
    warnings: [], entities, relationships,
  };
}

function mapJavaType(t) {
  t = t.trim();
  let m = t.match(/^(?:List|Set|Collection|Iterable|ArrayList)<\s*(\w+)\s*>$/);
  if (m) return { type: `array<${m[1]}>`, ref: m[1], conf: 0.85 };
  if (t.endsWith('[]')) {
    const inner = t.slice(0, -2).trim();
    return { type: `array<${inner.toLowerCase()}>`, conf: 0.85 };
  }
  switch (t) {
    case 'String': return { type: 'string', conf: 0.96 };
    case 'int': case 'Integer': case 'short': case 'Short': case 'byte': case 'Byte':
    case 'long': case 'Long': return { type: 'integer', conf: 0.98 };
    case 'float': case 'Float': case 'double': case 'Double': case 'BigDecimal': return { type: 'decimal', conf: 0.98 };
    case 'boolean': case 'Boolean': return { type: 'boolean', conf: 0.99 };
    case 'Instant': case 'OffsetDateTime': case 'ZonedDateTime': case 'LocalDateTime': return { type: 'datetime', conf: 0.97 };
    case 'LocalDate': return { type: 'date', conf: 0.97 };
    case 'UUID': return { type: 'uuid', conf: 0.99 };
    default:
      return { type: t, ref: t, conf: 0.7, warn: 'custom type — referenced but not analysed' };
  }
}

// ─── TypeScript parser ──────────────────────────────────────────────
function parseTS(src) {
  const entities = [];
  const relationships = [];

  const re = /(?:export\s+)?(?:interface|type)\s+(\w+)\s*(?:=\s*)?\{([\s\S]*?)\}/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const name = m[1];
    const body = m[2];
    const fields = [];
    const lines = body.split(/[;\n]/).map(s => s.trim()).filter(Boolean);
    for (const ln of lines) {
      if (/^\/\//.test(ln) || /^\/\*/.test(ln)) continue;
      const fm = ln.match(/^(\w+)\s*(\?)?\s*:\s*(.+?)\s*$/);
      if (!fm) continue;
      const [, fname, opt, tRaw] = fm;
      const t = tRaw.replace(/,$/, '').trim();
      const f = { name: snakeCase(fname), conf: 0.94 };
      if (opt) f.nullable = true;
      if (/^(?:'[^']+')(\s*\|\s*'[^']+')+$/.test(t)) {
        f.type = 'enum';
        f.enumVals = (t.match(/'[^']+'/g) || []).map(s => s.slice(1, -1));
        f.conf = 0.95;
      } else if (/\[\]$/.test(t) || /^Array<.+>$/.test(t)) {
        const inner = t.endsWith('[]') ? t.slice(0, -2) : t.replace(/^Array<|>$/g, '');
        if (/^[A-Z]\w*$/.test(inner) && inner !== 'Date') {
          f.type = `array<${inner}>`; f.ref = inner;
          relationships.push({ from: `${name}.${fname}`, to: inner, kind: 'has-many' });
        } else {
          f.type = `array<${tsPrim(inner)}>`;
        }
      } else if (/^[A-Z]\w*$/.test(t) && t !== 'Date') {
        f.type = t; f.ref = t;
        relationships.push({ from: `${name}.${fname}`, to: t, kind: 'embeds' });
      } else {
        f.type = tsPrim(t);
      }
      decorateField(f);
      fields.push(f);
    }
    entities.push({ name, fields });
  }
  if (!entities.length) return blockedSchema('no_interface', 'No `interface` or `type` block found.', 'Define a TypeScript interface or type alias.');
  return {
    format: 'TypeScript', rootEntity: entities[0].name, confidence: avgConf(entities),
    warnings: [], entities, relationships,
  };
}
function tsPrim(t) {
  t = t.trim();
  if (t === 'string') return 'string';
  if (t === 'number') return 'decimal';
  if (t === 'bigint') return 'integer';
  if (t === 'boolean') return 'boolean';
  if (t === 'Date') return 'datetime';
  if (t === 'any' || t === 'unknown') return 'string';
  return t;
}

// ─── Python parser (Pydantic / dataclass) ───────────────────────────
function parsePython(src) {
  const entities = [];
  const relationships = [];

  const classRe = /(?:@dataclass\s*\n)?class\s+(\w+)\s*\([^)]*\)\s*:\s*\n((?:(?:[ \t]+.*\n?)+))/g;
  let cm;
  while ((cm = classRe.exec(src)) !== null) {
    const name = cm[1];
    const body = cm[2];
    const fields = [];
    const lines = body.split('\n');
    for (const lnRaw of lines) {
      const ln = lnRaw.trim();
      if (!ln || ln.startsWith('#') || ln.startsWith('"""') || ln.startsWith("'''")) continue;
      const fm = ln.match(/^(\w+)\s*:\s*([\w\[\],.\s'|"]+?)(?:\s*=\s*(.+))?$/);
      if (!fm) continue;
      const [, fname, typeRawIn, defRaw] = fm;
      let typeRaw = typeRawIn.trim();
      const f = { name: fname, conf: 0.92 };

      let optional = false;
      const optMatch = typeRaw.match(/^Optional\[\s*(.+?)\s*\]$/) || typeRaw.match(/^(.+?)\s*\|\s*None$/);
      if (optMatch) { optional = true; typeRaw = optMatch[1].trim(); }

      const listMatch = typeRaw.match(/^(?:List|list)\[\s*(.+?)\s*\]$/);
      const litMatch = typeRaw.match(/^Literal\[\s*([^\]]+)\s*\]$/);

      if (litMatch) {
        f.type = 'enum';
        f.enumVals = (litMatch[1].match(/'[^']*'|"[^"]*"/g) || []).map(s => s.slice(1, -1));
        f.conf = 0.96;
      } else if (listMatch) {
        const inner = listMatch[1];
        if (/^[A-Z]\w*$/.test(inner)) {
          f.type = `array<${inner}>`; f.ref = inner;
          relationships.push({ from: `${name}.${fname}`, to: inner, kind: 'has-many' });
        } else f.type = `array<${pyPrim(inner)}>`;
      } else if (/^[A-Z]\w*$/.test(typeRaw) && pyPrim(typeRaw) === typeRaw.toLowerCase() && typeRaw !== 'EmailStr') {
        f.type = typeRaw; f.ref = typeRaw;
        relationships.push({ from: `${name}.${fname}`, to: typeRaw, kind: 'embeds' });
      } else {
        f.type = pyPrim(typeRaw);
        if (typeRaw === 'EmailStr') f.sem = 'email';
      }
      if (optional) f.nullable = true;
      if (defRaw && /Field\s*\(/.test(defRaw)) {
        const ml = defRaw.match(/max_length\s*=\s*(\d+)/);
        const mnl = defRaw.match(/min_length\s*=\s*(\d+)/);
        const ge = defRaw.match(/\bge\s*=\s*(-?\d+)/);
        const le = defRaw.match(/\ble\s*=\s*(-?\d+)/);
        const constrs = [];
        if (mnl) constrs.push(`min=${mnl[1]}`);
        if (ml) constrs.push(`max=${ml[1]}`);
        if (constrs.length) f.constr = constrs.join(',');
        if (ge || le) f.check = `${ge?'>='+ge[1]:''}${ge&&le?' && ':''}${le?'<='+le[1]:''}`.trim();
        if (/\(\s*\.\.\./.test(defRaw)) f.nn = true;
      } else if (defRaw && defRaw.trim() !== 'None') {
        f.default = defRaw.trim().replace(/^['"]|['"]$/g, '');
      }
      decorateField(f);
      fields.push(f);
    }
    if (fields.length) entities.push({ name, fields });
  }
  if (!entities.length) return blockedSchema('no_class', 'No `class X(...):` block found.', 'Define a Pydantic BaseModel or dataclass.');
  return {
    format: 'Python', rootEntity: entities[0].name, confidence: avgConf(entities),
    warnings: [], entities, relationships,
  };
}
function pyPrim(t) {
  t = t.trim();
  switch (t) {
    case 'str': case 'string': case 'EmailStr': return 'string';
    case 'int': case 'Integer': return 'integer';
    case 'float': case 'Decimal': return 'decimal';
    case 'bool': return 'boolean';
    case 'datetime': return 'datetime';
    case 'date': return 'date';
    case 'UUID': return 'uuid';
    case 'bytes': return 'string';
    default: return t.toLowerCase();
  }
}

// ─── Go struct parser ───────────────────────────────────────────────
function parseGo(src) {
  const entities = [];
  const relationships = [];

  const re = /type\s+(\w+)\s+struct\s*\{([\s\S]*?)\n\}/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const name = m[1];
    const body = m[2];
    const fields = [];
    const lines = body.split('\n').map(s => s.trim()).filter(Boolean);
    for (const ln of lines) {
      if (ln.startsWith('//')) continue;
      const fm = ln.match(/^(\w+)\s+([*[\]\w.]+)\s*(?:`([^`]*)`)?/);
      if (!fm) continue;
      const [, fname, typeRaw, tag] = fm;
      const isPtr = typeRaw.startsWith('*');
      const isArr = typeRaw.startsWith('[]');
      const t = typeRaw.replace(/^[*\[\]]+/, '');
      const canon = goPrim(t);
      const f = { name: snakeCase(fname), type: isArr ? `array<${canon}>` : canon, conf: 0.93 };
      if (isPtr) f.nullable = true;
      if (tag) {
        const jt = tag.match(/json:"([^",]+)/);
        if (jt) f.name = jt[1];
        if (/omitempty/.test(tag)) f.nullable = true;
      }
      if (/^[A-Z]/.test(t) && !['Time'].includes(t) && t !== 'time.Time') {
        f.ref = t;
        relationships.push({ from: `${name}.${fname}`, to: t, kind: isArr ? 'has-many' : 'embeds' });
      }
      decorateField(f);
      fields.push(f);
    }
    entities.push({ name, fields });
  }
  if (!entities.length) return blockedSchema('no_struct', 'No `type X struct { … }` block found.', 'Define a Go struct.');
  return {
    format: 'Go', rootEntity: entities[0].name, confidence: avgConf(entities),
    warnings: [], entities, relationships,
  };
}
function goPrim(t) {
  switch (t) {
    case 'string': return 'string';
    case 'int': case 'int8': case 'int16': case 'int32': case 'int64':
    case 'uint': case 'uint8': case 'uint16': case 'uint32': case 'uint64': return 'integer';
    case 'float32': case 'float64': return 'decimal';
    case 'bool': return 'boolean';
    case 'time.Time': case 'Time': return 'datetime';
    case 'byte': case 'rune': return 'string';
    default: return t;
  }
}

// ─── Avro AVSC parser ───────────────────────────────────────────────
function parseAvro(src) {
  let obj;
  try { obj = JSON.parse(src); }
  catch (e) { return blockedSchema('avro_syntax', `Avro JSON parse failed: ${e.message}`, 'Validate the AVSC against avro-tools.'); }
  const entities = [];
  const relationships = [];

  function visit(rec) {
    if (!rec || rec.type !== 'record' || !Array.isArray(rec.fields)) return;
    if (entities.find(e => e.name === rec.name)) return;
    const name = rec.name;
    const nestedRecords = [];
    const fields = rec.fields.map(field => {
      const f = { name: field.name, conf: 0.95 };
      let t = field.type;
      let nullable = false;
      if (Array.isArray(t)) {
        if (t.includes('null')) { nullable = true; t = t.find(x => x !== 'null'); }
      }
      if (t && typeof t === 'object') {
        if (t.type === 'enum') { f.type = 'enum'; f.enumVals = t.symbols || []; }
        else if (t.type === 'array') {
          const inner = avroPrim(t.items);
          f.type = `array<${typeof t.items === 'object' ? (t.items.name || inner) : inner}>`;
          if (typeof t.items === 'object' && t.items.type === 'record') nestedRecords.push(t.items);
        }
        else if (t.type === 'record') {
          f.type = t.name; f.ref = t.name;
          relationships.push({ from: `${name}.${field.name}`, to: t.name, kind: 'embeds' });
          nestedRecords.push(t);
        }
        else if (t.logicalType === 'timestamp-millis' || t.logicalType === 'timestamp-micros') f.type = 'datetime';
        else if (t.logicalType === 'date') f.type = 'date';
        else if (t.logicalType === 'uuid') f.type = 'uuid';
        else f.type = avroPrim(t);
      } else if (typeof t === 'string') {
        f.type = avroPrim(t);
      }
      if (nullable) f.nullable = true;
      if (field.default !== undefined && field.default !== null) f.default = String(field.default);
      decorateField(f);
      return f;
    });
    entities.push({ name, fields });
    for (const nr of nestedRecords) visit(nr);
  }
  visit(obj);
  if (!entities.length) return blockedSchema('no_record', 'No Avro record found.', 'Provide a `{ "type": "record", … }`.');
  return {
    format: 'Avro', rootEntity: entities[0].name, confidence: avgConf(entities),
    warnings: [], entities, relationships,
  };
}
function avroPrim(t) {
  if (typeof t === 'object') return t.name || t.type || 'string';
  switch (t) {
    case 'string': case 'bytes': case 'fixed': return 'string';
    case 'int': case 'long': return 'integer';
    case 'float': case 'double': return 'decimal';
    case 'boolean': return 'boolean';
    case 'null': return 'string';
    default: return t;
  }
}

// ─── Protobuf parser ────────────────────────────────────────────────
function parseProto(src) {
  const entities = [];
  const relationships = [];
  const enumMap = {};

  const enumGlobalRe = /enum\s+(\w+)\s*\{([^}]+)\}/g;
  let em;
  while ((em = enumGlobalRe.exec(src)) !== null) {
    enumMap[em[1]] = (em[2].match(/(\w+)\s*=\s*\d+/g) || []).map(s => s.split('=')[0].trim());
  }

  const msgRe = /message\s+(\w+)\s*\{([\s\S]*?)\n\}/g;
  let m;
  while ((m = msgRe.exec(src)) !== null) {
    const name = m[1];
    const body = m[2];
    const fields = [];
    const lines = body.split(/;\s*\n?/).map(s => s.trim()).filter(Boolean);
    for (const ln of lines) {
      if (ln.startsWith('//') || ln.startsWith('enum ') || ln.startsWith('message ') || ln.startsWith('reserved')) continue;
      const fm = ln.match(/^(?:(optional|repeated)\s+)?([\w.]+)\s+(\w+)\s*=\s*\d+/);
      if (!fm) continue;
      const [, mod, typeRaw, fname] = fm;
      const canon = protoPrim(typeRaw);
      const f = { name: fname, type: canon, conf: 0.94 };
      if (mod === 'repeated') {
        if (/^[A-Z]/.test(typeRaw)) {
          f.type = `array<${typeRaw}>`; f.ref = typeRaw;
          relationships.push({ from: `${name}.${fname}`, to: typeRaw, kind: 'has-many' });
        } else f.type = `array<${canon}>`;
      } else if (mod === 'optional') f.nullable = true;
      if (enumMap[typeRaw]) { f.type = 'enum'; f.enumVals = enumMap[typeRaw]; f.conf = 0.96; }
      if (/^[A-Z]\w*$/.test(typeRaw) && !enumMap[typeRaw] && mod !== 'repeated') {
        f.ref = typeRaw;
        relationships.push({ from: `${name}.${fname}`, to: typeRaw, kind: 'embeds' });
      }
      if (fname === 'created_at' || fname === 'placed_at') f.sem = 'timestamp';
      decorateField(f);
      fields.push(f);
    }
    entities.push({ name, fields });
  }
  if (!entities.length) return blockedSchema('no_message', 'No `message X { … }` block found.', 'Provide a proto3 message.');
  return {
    format: 'Protobuf', rootEntity: entities[0].name, confidence: avgConf(entities),
    warnings: [], entities, relationships,
  };
}
function protoPrim(t) {
  switch (t) {
    case 'string': case 'bytes': return 'string';
    case 'int32': case 'int64': case 'uint32': case 'uint64': case 'sint32': case 'sint64': case 'fixed32': case 'fixed64': return 'integer';
    case 'double': case 'float': return 'decimal';
    case 'bool': return 'boolean';
    default: return t;
  }
}

// ─── YAML parser (lightweight, indentation-based) ──────────────────
function parseYAML(src) {
  const lines = src.split('\n').map(l => l.replace(/#.*$/, '').replace(/\s+$/, ''));
  const entities = [];
  let curEntity = null;
  for (const ln of lines) {
    if (!ln.trim()) continue;
    const m = ln.match(/^(\s*)(\w[\w-]*)\s*:\s*(.*)$/);
    if (!m) continue;
    const indent = m[1].length;
    const key = m[2];
    const val = m[3].trim();
    if (indent === 0 && (val === '' || /^\{?\s*\}?$/.test(val))) {
      curEntity = { name: key, fields: [] };
      entities.push(curEntity);
      continue;
    }
    if (curEntity && indent > 0 && val) {
      const f = { name: key, conf: 0.85 };
      const optional = /\?$/.test(val);
      const cleaned = val.replace(/\?$/, '').trim();
      const enumMatch = cleaned.match(/^enum\s*\[\s*([^\]]+)\s*\]$/i);
      if (enumMatch) {
        f.type = 'enum';
        f.enumVals = enumMatch[1].split(',').map(s => s.trim());
      } else {
        f.type = yamlPrim(cleaned);
      }
      if (optional) f.nullable = true;
      decorateField(f);
      curEntity.fields.push(f);
    }
  }
  if (!entities.length) return blockedSchema('no_yaml_entity', 'No top-level YAML entity found.', 'Use the form `Entity:` followed by indented `field: type` lines.');
  return {
    format: 'YAML', rootEntity: entities[0].name, confidence: avgConf(entities),
    warnings: [], entities, relationships: [],
  };
}
function yamlPrim(t) {
  switch (t.toLowerCase()) {
    case 'string': case 'str': case 'text': return 'string';
    case 'integer': case 'int': return 'integer';
    case 'number': case 'float': case 'decimal': case 'double': return 'decimal';
    case 'boolean': case 'bool': return 'boolean';
    case 'datetime': case 'timestamp': return 'datetime';
    case 'date': return 'date';
    case 'uuid': case 'guid': return 'uuid';
    default: return t;
  }
}

// ─── Natural-language parser ────────────────────────────────────────
const NL_TYPE_HINTS = [
  [/\b(e[\s-]?mail)\b/i, { type: 'string', sem: 'email' }],
  [/\b(uuid|guid|identifier)\b/i, { type: 'uuid', sem: 'id' }],
  [/\b(timestamp|datetime|created\s+at|updated\s+at|placed\s+at)\b/i, { type: 'datetime', sem: 'timestamp' }],
  [/\b(date|day|deadline|birthday|birth\s+date)\b/i, { type: 'date' }],
  [/\b(price|amount|total|cost|balance|salary|revenue|fee|money)\b/i, { type: 'decimal', sem: 'money' }],
  [/\b(count|qty|quantity|age|year)\b/i, { type: 'integer' }],
  [/\b(decimal|float|double)\b/i, { type: 'decimal' }],
  [/\b(integer|int|number)\b/i, { type: 'integer' }],
  [/\b(boolean|bool|flag)\b/i, { type: 'boolean' }],
  [/\b(currency|currency\s+code)\b/i, { type: 'string', sem: 'currency_code' }],
  [/\b(country|country\s+code)\b/i, { type: 'string', sem: 'country_code' }],
  [/\b(name|title|description|text|string)\b/i, { type: 'string' }],
];

function parseNL(src) {
  const entities = [];
  const relationships = [];
  const warnings = [];

  // Pre-pass: protect punctuation inside "between X and Y" and "one of A, B, or C"
  // so a naive split on "," and " and " doesn't carve them up.
  let text = src.replace(/\r/g, '').replace(/\n+/g, '\n').trim();
  text = text.replace(/\bbetween\s+(-?\d+(?:\.\d+)?)\s+and\s+(-?\d+(?:\.\d+)?)/gi, 'between $1 §TO§ $2');
  text = text.replace(/(\bone\s+of|\beither)\s+([\w'\- ]+(?:,\s*[\w'\- ]+)*\s*,?\s*or\s+[\w'\- ]+)/gi, (m, lead, body) => {
    return lead + ' ' + body.replace(/,/g, '§EC§').replace(/\bor\b/gi, '§EO§');
  });

  const sentences = text.split(/(?<=\.)\s+|\n\s*\n+/).map(s => s.trim()).filter(Boolean);

  const entityTrigger = /(?:^|\b)(?:a|an|the|each|every|create(?:\s+a(?:n)?)?|define(?:\s+a(?:n)?)?|describe(?:\s+a(?:n)?)?)\s+([a-z][a-z_]*(?:\s+[a-z][a-z_]*)?)\s+(?:has|contains|with|consists\s+of|includes|comprises|is\s+a\s+record\s+with)\b([\s\S]*)$/i;

  for (const sentRaw of sentences) {
    const sent = sentRaw.replace(/\s+/g, ' ').trim();
    const m = sent.match(entityTrigger);
    if (!m) continue;
    const entityName = singularize(snakeCase(m[1]));
    if (!entityName) continue;
    let fieldText = (m[2] || '').replace(/^[\s:.,]+/, '');
    fieldText = fieldText.replace(/\.\s.*$/, '').trim();

    const parts = fieldText.split(/,| and (?!\s*(?:between|to))/i).map(s => s.trim()).filter(Boolean);
    const fields = [];
    const seen = new Set();

    for (const partRaw of parts) {
      let p = partRaw.replace(/^(?:and\s+)?/, '').trim();
      let isList = false;
      if (/^(?:a\s+list\s+of|many|several|multiple|an\s+array\s+of|a\s+set\s+of)\s+/i.test(p)) {
        isList = true;
        p = p.replace(/^(?:a\s+list\s+of|many|several|multiple|an\s+array\s+of|a\s+set\s+of)\s+/i, '');
      }
      p = p.replace(/^(?:a|an|the)\s+/i, '').trim();
      if (!p) continue;

      const optional = /\b(optional|nullable|may\s+have|sometimes)\b/i.test(p);
      const required = /\b(required|must|always|not\s+null)\b/i.test(p);
      const unique = /\bunique\b/i.test(p);
      const betweenRestored = p.replace(/§TO§/g, 'and');
      const between = betweenRestored.match(/between\s+(-?\d+(?:\.\d+)?)\s+and\s+(-?\d+(?:\.\d+)?)/i);
      // Restore protected enum body before harvesting vals
      const oneOfBody = p.match(/(?:one\s+of|either)\s+([^.,]+)/i);
      let enumVals = null;
      if (oneOfBody) {
        const restored = oneOfBody[1].replace(/§EC§/g, ',').replace(/§EO§/gi, ' or ');
        const parts = restored.split(/,|\bor\b/i).map(s => s.trim().replace(/['"]/g,'')).filter(Boolean);
        if (parts.length >= 2) enumVals = parts;
      }

      let nameSrc = p
        .replace(/§TO§|§EC§|§EO§/g, ' ')
        .replace(/^\s*(?:optional|required|unique|always|nullable)\s+/i, '')
        .replace(/\s+(?:that|which|who|with|where|of|between|in|from|equal|greater|less|=|>|<).*$/i, '')
        .replace(/\b(?:one\s+of|either)\b.*$/i, '');
      nameSrc = nameSrc.replace(/\b(string|integer|int|number|boolean|date|email|timestamp|datetime|float|decimal|amount|address|code|flag)\b/gi, ' ');
      const tokens = nameSrc.trim().split(/\s+/).filter(t => /^[a-zA-Z][a-zA-Z_]*$/.test(t)).slice(0, 3);
      let name = snakeCase(tokens.join('_'));
      name = name.replace(/^_+|_+$/g, '');
      if (!name || /^\d+$/.test(name) || name.length < 2) continue;
      if (seen.has(name)) continue;
      seen.add(name);

      if (isList) {
        const ref = singularize(name);
        relationships.push({ from: `${entityName}.${name}`, to: ref, kind: 'has-many' });
        const f = { name, type: `array<${ref}>`, ref, conf: 0.62, warn: 'NL-inferred relation' };
        decorateField(f);
        fields.push(f);
        continue;
      }

      const f = { name, conf: 0.7 };
      if (enumVals) {
        f.type = 'enum'; f.enumVals = enumVals; f.conf = 0.85;
      } else {
        let hit = null;
        for (const [re, hint] of NL_TYPE_HINTS) if (re.test(p)) { hit = hint; break; }
        if (hit) Object.assign(f, hit);
        else {
          const sem = semFromName(name);
          if (sem) { f.sem = sem; f.type = SEM_TO_TYPE[sem] || 'string'; f.conf = 0.7; }
          else { f.type = 'string'; f.conf = 0.55; f.warn = 'type inferred from name'; }
        }
      }
      if (optional) f.nullable = true;
      if (required) f.nn = true;
      if (unique) f.unique = true;
      if (between) f.check = `${between[1]}..${between[2]}`;
      decorateField(f);
      fields.push(f);
    }

    if (!fields.length) continue;
    const existing = entities.find(e => e.name === entityName);
    if (existing) {
      for (const f of fields) if (!existing.fields.find(x => x.name === f.name)) existing.fields.push(f);
    } else {
      entities.push({ name: entityName, fields });
    }
  }

  if (!entities.length) {
    return blockedSchema('nl_no_entities', 'No entities recognised. Use phrasing like "A customer has an id, an email, and a name."', 'Lead each sentence with "A/An/Each X has …".');
  }
  const totalFields = entities.reduce((s, e) => s + e.fields.length, 0);
  const confidence = Math.min(0.78, 0.55 + totalFields * 0.015);
  return { format: 'Natural language', rootEntity: entities[0].name, confidence, warnings, entities, relationships };
}

// ─── Messy / Broken parsers ─────────────────────────────────────────
function parseMessy(src) {
  const entityName = (src.match(/^([A-Z]\w*)\s*\{/m) || [])[1] || 'record';
  const lines = src.split('\n');
  const fields = [];
  const warnings = [];
  let lineNo = 0;
  for (const lnRaw of lines) {
    lineNo++;
    const ln = lnRaw.replace(/\/\/.*$|\/\*.*?\*\//g, '').trim();
    if (!ln || /^\{|^\}/.test(ln)) continue;
    const m = ln.match(/^([\w.]+)\s*[:\-]?\s*([\w.<>?\[\]]+)?\s*(.*)$/);
    if (!m) continue;
    const [, name, typeRaw, rest] = m;
    if (!typeRaw || /^[?]+$/.test(typeRaw) || typeRaw === 'ambiguous') {
      warnings.push({ line: lineNo, code: 'TYPE_UNKNOWN', msg: `Field \`${name}\` has no resolvable type.`, fix: 'Add a concrete type.' });
      const f = { name: snakeCase(name), type: 'string', conf: 0.32, warn: 'mixed-type column', nullable: true };
      decorateField(f);
      fields.push(f);
      continue;
    }
    const f = { name: snakeCase(name), conf: 0.6 };
    if (/'[^']+'\s*\|\s*'[^']+'/.test(rest) || /'[^']+'\s*\|\s*'[^']+'/.test(typeRaw)) {
      const all = (rest + ' ' + typeRaw).match(/'[^']+'/g) || [];
      f.type = 'enum'; f.enumVals = all.map(s => s.slice(1, -1)); f.conf = 0.78;
    } else if (/^\[/.test(typeRaw)) {
      f.type = `array<string>`; f.conf = 0.5; f.warn = 'CSV/array ambiguity';
      warnings.push({ line: lineNo, code: 'AMBIGUOUS_ARRAY', msg: `${name} may be CSV string or array.`, fix: 'Normalise to `string[]`.' });
    } else {
      const t = typeRaw.toLowerCase();
      if (/objectid/.test(t)) { f.type = 'objectid'; f.sem = 'id'; }
      else if (/^str$|string/.test(t)) f.type = 'string';
      else if (/number|^int$|float|double|decimal/.test(t)) f.type = 'integer';
      else if (/^bool/.test(t)) f.type = 'boolean';
      else if (/date\??$|datetime|timestamp/.test(t)) {
        f.type = /datetime|timestamp/.test(t) ? 'datetime' : 'date';
        if (/\?/.test(typeRaw)) f.nullable = true;
      } else { f.type = 'string'; f.warn = 'inferred'; f.conf = 0.45; }
    }
    const rng = rest.match(/\((\d+)\s*\.\.\s*(\d+)\)/);
    if (rng) { f.check = `${rng[1]}..${rng[2]}`; f.type = 'integer'; }
    decorateField(f);
    fields.push(f);
  }
  if (!fields.length) return blockedSchema('messy_empty', 'Could not extract any fields.', 'Use `name: type` lines, one per field.');
  if (!fields.some(f => f.pk)) {
    const idF = fields.find(f => /id$/.test(f.name));
    if (idF) { idF.pk = true; idF.nn = true; }
  }
  return {
    format: 'Mixed (inferred)', rootEntity: entityName, confidence: avgConf([{ fields }]),
    warnings, entities: [{ name: entityName, fields }], relationships: [],
  };
}

function parseBroken(src) {
  const warnings = [];
  const lines = src.split('\n');
  let lineNo = 0;
  for (const lnRaw of lines) {
    lineNo++;
    const ln = lnRaw.trim();
    if (!ln || ln === '{' || ln === '}') continue;
    if (/\?\?\?/.test(ln)) warnings.push({ line: lineNo, code: 'UNKNOWN_TYPE', msg: 'Placeholder `???` used where a type is required.', fix: 'Replace `???` with a concrete type.' });
    if (/<<</.test(ln)) warnings.push({ line: lineNo, code: 'SYNTAX', msg: `Trailing junk: ${ln}`, fix: 'Remove illegal characters.' });
    if (/\bambiguous\b/.test(ln)) warnings.push({ line: lineNo, code: 'AMBIGUOUS_FIELD', msg: 'Type literal "ambiguous" is not recognised.', fix: 'Use a concrete type.' });
    if (/\bOR\b/.test(ln) && /\[/.test(ln)) warnings.push({ line: lineNo, code: 'MIXED_UNION', msg: 'Mixed-type union — cannot normalise.', fix: 'Choose one type.' });
    if (/^\?\?\s*\?\?/.test(ln)) warnings.push({ line: lineNo, code: 'SYNTAX', msg: 'Unparsable token sequence.', fix: 'Remove or replace with field definitions.' });
    if (/^\w+\s+\w+\s*$/.test(ln) && !/:/.test(ln)) warnings.push({ line: lineNo, code: 'NO_TYPE', msg: `Line "${ln}" has no type token.`, fix: 'Use `name: type`.' });
  }
  return {
    format: 'Unrecognised', rootEntity: 'Record', confidence: 0.17, blocked: true,
    warnings, entities: [], relationships: [],
  };
}

// ─── Deterministic PRNG (mulberry32) ────────────────────────────────
function rngOf(seed) {
  let t = (seed >>> 0) || 1;
  return () => {
    t = (t + 0x6D2B79F5) >>> 0;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Locale-aware lookup tables ────────────────────────────────────
const LOCALE_DATA = {
  'de-DE': {
    first: ['Ada','Bernd','Clara','Dieter','Emma','Florian','Greta','Hans','Ida','Jonas','Karla','Lukas','Mira','Niko','Olga','Paul','Quirin','Rosa','Stefan','Tilda','Ulrich','Vera','Wolf','Xenia','Yusuf','Zara'],
    last:  ['Adler','Baumann','Cordes','Dietrich','Ehrlich','Fuchs','Graber','Huber','Ibsen','Jung','Koenig','Lehmann','Moser','Neumann','Ostermann','Peters','Quint','Richter','Stein','Trapp','Ullmann','Vogel','Weber','Xander','Yilmaz','Zimmermann'],
    cities:['Ismaning','Berlin','Muenchen','Hamburg','Koeln','Stuttgart','Frankfurt','Leipzig','Dresden','Nuernberg'],
    streets:['Robert-Buerkle-Strasse','Hauptstrasse','Bahnhofstrasse','Lindenweg','Marktplatz','Parkstrasse','Schillerweg','Goethestrasse','Kastanienallee'],
    domain: 'msg.group',
  },
  'en-US': {
    first: ['Alice','Bob','Carol','David','Emma','Frank','Grace','Henry','Ivy','Jack','Kate','Liam','Mia','Noah','Olivia','Peter','Quinn','Rachel','Sam','Tina','Ulysses','Vera','Will','Xavier','Yara','Zoe'],
    last:  ['Anderson','Brown','Clark','Davis','Evans','Fisher','Garcia','Harris','Ingram','Johnson','King','Lewis','Miller','Nelson','Owens','Parker','Quinn','Roberts','Smith','Taylor','Underwood','Vance','Wilson','Xu','Young','Zhang'],
    cities:['Boston','Chicago','Denver','Austin','Seattle','Portland','Atlanta','Phoenix','Detroit','Miami'],
    streets:['Main Street','Oak Avenue','Pine Road','Maple Lane','Cedar Drive','Elm Boulevard','Park Place','Washington Avenue','Lincoln Way'],
    domain: 'example.com',
  },
  'fr-FR': {
    first: ['Adele','Baptiste','Camille','Denis','Elise','Francois','Gabrielle','Hugo','Ines','Julien','Karine','Leo','Margaux','Noe','Oceane','Paul','Quentin','Rose','Sebastien','Theo','Ulysse','Valerie','William','Xavier','Yasmine','Zoe'],
    last:  ['Bernard','Dubois','Durand','Fontaine','Garnier','Henri','Joly','Lambert','Martin','Moreau','Petit','Robert','Roux','Simon','Thomas','Vidal'],
    cities:['Paris','Lyon','Marseille','Toulouse','Bordeaux','Nice','Lille','Nantes','Strasbourg','Rennes'],
    streets:['Rue de la Paix','Avenue des Champs','Boulevard Saint-Michel','Place Vendome','Rue de Rivoli','Cours Mirabeau'],
    domain: 'example.fr',
  },
  'de-AT': {
    first: ['Andreas','Bettina','Christian','Doris','Ernst','Franziska','Gerald','Helga','Ingrid','Jakob','Karl','Lena','Manuel','Nadja','Otto','Petra','Quirin','Renate','Stefan','Theresa','Ulli','Verena','Wolfgang','Xaver'],
    last:  ['Bauer','Berger','Eder','Fischer','Gruber','Huber','Mayer','Mueller','Steiner','Wagner','Weber','Wimmer'],
    cities:['Wien','Graz','Linz','Salzburg','Innsbruck','Klagenfurt','Villach','Wels'],
    streets:['Mariahilferstrasse','Ringstrasse','Kaerntnerstrasse','Grabenstrasse','Stephansplatz'],
    domain: 'beispiel.at',
  },
};
const SEGMENTS = ['standard','premium','enterprise'];
const STATUSES = ['placed','paid','shipped','cancelled'];
const CURRENCIES = ['EUR','USD','CHF','GBP'];
const COUNTRIES  = ['DE','AT','CH','FR','IT','NL'];

function pick(arr, r) { return arr[Math.floor(r() * arr.length)]; }
function pad(n, w) { return String(n).padStart(w, '0'); }
function uuid(r) {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const v = Math.floor(r() * 16); const n = c === 'x' ? v : (v & 0x3) | 0x8;
    return n.toString(16);
  });
}

// ─── Generator ──────────────────────────────────────────────────────
function genValue(field, r, idx, opts) {
  const loc = LOCALE_DATA[opts.locale] || LOCALE_DATA['de-DE'];
  const ov = (opts.overrides || {})[field.name] || {};
  const gen = ov.gen && ov.gen !== 'auto' ? ov.gen : (field.sem || 'auto');
  if (gen === 'regex' && ov.rule) return regexGen(ov.rule, r);
  if (gen === 'static' && ov.rule) return ov.rule;

  if (opts.mask && ['email','first_name','last_name','phone'].includes(gen)) {
    return 'sha256:' + Math.floor(r() * 0xffffffff).toString(16).padStart(8, '0');
  }

  switch (gen) {
    case 'id':
    case 'uuid':
      if (field.type === 'uuid' || field.type === 'objectid') return uuid(r);
      return `${(field.name === 'id' ? 'rec' : field.name.replace(/_id$/, ''))}_${pad(idx + 1, 6)}`;
    case 'first_name': return pick(loc.first, r);
    case 'last_name':  return pick(loc.last, r);
    case 'email':      return `${pick(loc.first, r).toLowerCase().replace(/[^a-z]/g,'')}.${pick(loc.last, r).toLowerCase().replace(/[^a-z]/g,'')}@${loc.domain}`;
    case 'phone':      return `+49 ${pad(Math.floor(r()*999), 3)} ${pad(Math.floor(r()*9999999), 7)}`;
    case 'company':    return `${pick(loc.last, r)} ${pick(['GmbH','AG','SE','KG','UG'], r)}`;
    case 'money':      return Number((r() * 4200 + 9.9).toFixed(2));
    case 'timestamp':  {
      const d = new Date(Date.UTC(2024, Math.floor(r() * 18), 1 + Math.floor(r() * 27), Math.floor(r() * 24), Math.floor(r() * 60)));
      return d.toISOString().replace('.000Z','Z');
    }
    case 'country_code':  return pick(COUNTRIES, r);
    case 'currency_code': return pick(CURRENCIES, r);
  }

  if (field.type === 'enum' || (field.enumVals && field.enumVals.length)) return pick(field.enumVals || SEGMENTS, r);
  if (field.type === 'uuid' || field.type === 'objectid') return uuid(r);
  if (field.type === 'boolean') return r() < 0.5;
  if (field.type === 'integer') {
    if (field.check) {
      const m = field.check.match(/(-?\d+)\s*\.\.\s*(-?\d+)/);
      if (m) return Math.floor(+m[1] + r() * (+m[2] - +m[1] + 1));
    }
    return Math.floor(r() * 120);
  }
  if (field.type === 'decimal' || /^numeric/.test(field.type || '')) return Number((r() * 4200 + 9.9).toFixed(2));
  if (field.type === 'date') return `2025-${pad(1 + Math.floor(r()*12),2)}-${pad(1 + Math.floor(r()*27),2)}`;
  if (['datetime','timestamp','Instant'].includes(field.type)) {
    const d = new Date(Date.UTC(2024, Math.floor(r() * 18), 1 + Math.floor(r() * 27), Math.floor(r() * 24), Math.floor(r() * 60)));
    return d.toISOString().replace('.000Z','Z');
  }
  if (typeof field.type === 'string' && (/^char|^varchar/.test(field.type) || ['string','String'].includes(field.type))) {
    const ln = (field.name || '').toLowerCase();
    if (ln.includes('city')) return pick(loc.cities, r);
    if (ln.includes('street')) return `${pick(loc.streets, r)} ${1 + Math.floor(r()*120)}`;
    if (ln.includes('zip') || ln.includes('postal')) return pad(10000 + Math.floor(r()*89999), 5);
    if (ln.includes('status')) return pick(STATUSES, r);
    if (ln.includes('segment')) return pick(SEGMENTS, r);
    if (ln.includes('country')) return pick(COUNTRIES, r);
    return `${pick(loc.last, r)}-${pad(Math.floor(r()*999), 3)}`;
  }
  return '—';
}

function regexGen(pattern, r) {
  let out = '';
  let i = 0;
  while (i < pattern.length) {
    if (pattern[i] === '\\' && pattern[i+1]) {
      const cls = pattern[i+1];
      i += 2;
      const repAfter = pattern.slice(i).match(/^\{(\d+)(?:,(\d+))?\}/);
      const cnt = repAfter ? (repAfter[2] ? +repAfter[1] + Math.floor(r() * (+repAfter[2] - +repAfter[1] + 1)) : +repAfter[1]) : 1;
      if (repAfter) i += repAfter[0].length;
      for (let k = 0; k < cnt; k++) {
        if (cls === 'd') out += Math.floor(r() * 10);
        else if (cls === 'w') out += String.fromCharCode(97 + Math.floor(r() * 26));
        else if (cls === 's') out += ' ';
        else out += cls;
      }
      continue;
    }
    if (pattern[i] === '[') {
      const end = pattern.indexOf(']', i);
      if (end === -1) { out += pattern[i]; i++; continue; }
      const cls = pattern.slice(i + 1, end);
      i = end + 1;
      const repAfter = pattern.slice(i).match(/^\{(\d+)(?:,(\d+))?\}/);
      const cnt = repAfter ? (repAfter[2] ? +repAfter[1] + Math.floor(r() * (+repAfter[2] - +repAfter[1] + 1)) : +repAfter[1]) : 1;
      if (repAfter) i += repAfter[0].length;
      const expanded = expandCharClass(cls);
      for (let k = 0; k < cnt; k++) out += expanded[Math.floor(r() * expanded.length)];
      continue;
    }
    out += pattern[i]; i++;
  }
  return out;
}
function expandCharClass(cls) {
  const out = [];
  for (let i = 0; i < cls.length; i++) {
    if (cls[i+1] === '-' && cls[i+2]) {
      const start = cls.charCodeAt(i), end = cls.charCodeAt(i+2);
      for (let c = start; c <= end; c++) out.push(String.fromCharCode(c));
      i += 2;
    } else out.push(cls[i]);
  }
  return out;
}

function flattenPrimary(schema) {
  const primary = schema.entities.find(e => !e.nested) || schema.entities[0];
  if (!primary) return { entity: null, fields: [] };
  const fields = primary.fields.filter(f => !/^(object|array)/.test(f.type || ''));
  return { entity: primary, fields };
}

function generateRows(schema, opts = {}) {
  const { rows = 20, seed = 42, nullRatio = 0.0, locale = 'de-DE', overrides = {}, mask = false, ri = true, unique = true } = opts;
  if (!schema || schema.blocked) return [];
  const { fields } = flattenPrimary(schema);
  if (!fields.length) return [];
  const r = rngOf(seed);
  const out = [];
  const uniqVals = {};
  const fkPools = {};
  if (ri) {
    for (const f of fields) {
      if (f.fk) {
        const pool = [];
        const poolSize = Math.max(8, Math.min(rows, 200));
        const rPool = rngOf(seed ^ 0x9e3779b1);
        for (let i = 0; i < poolSize; i++) {
          pool.push(genValue({ name: (f.fk.split('.')[1] || 'id'), type: 'uuid', sem: 'id' }, rPool, i, { locale, overrides, mask }));
        }
        fkPools[f.name] = pool;
      }
    }
  }
  for (let i = 0; i < rows; i++) {
    const row = {};
    for (const f of fields) {
      const ov = overrides[f.name] || {};
      const fieldNullPct = ov.nullPct != null ? ov.nullPct / 100 : nullRatio;
      const nullable = (f.nullable || (!f.nn && !f.pk));
      if (nullable && r() < fieldNullPct) { row[f.name] = null; continue; }
      if (ri && f.fk && fkPools[f.name]) { row[f.name] = pick(fkPools[f.name], r); continue; }
      let v = genValue(f, r, i, { locale, overrides, mask });
      if (unique && f.unique) {
        uniqVals[f.name] = uniqVals[f.name] || new Set();
        let attempts = 0;
        while (uniqVals[f.name].has(v) && attempts < 5) { v = genValue(f, r, i + attempts * 1000 + 1, { locale, overrides, mask }); attempts++; }
        uniqVals[f.name].add(v);
      }
      row[f.name] = v;
    }
    out.push(row);
  }
  return out;
}

// ─── Job/audit fixtures ─────────────────────────────────────────────
const JOBS = [
  { id: 'job_2804', schema: 'Customer + Orders · SQL', fmt: 'SQL DDL',   rows: 250000, seed: 42,     status: 'ok',      when: 'just now',   who: 'a.lovelace', conf: 0.99, output: 'JSON' },
  { id: 'job_2803', schema: 'Customer · TS interface', fmt: 'TypeScript', rows: 100000, seed: 17,     status: 'ok',      when: '12 min ago', who: 'h.koenig',   conf: 0.95, output: 'Parquet' },
  { id: 'job_2802', schema: 'PolicyHolder · Java',     fmt: 'Java POJO', rows:  50000, seed: 2026,   status: 'partial', when: '42 min ago', who: 's.weber',    conf: 0.74, output: 'CSV' },
  { id: 'job_2801', schema: 'Customer · Pydantic',     fmt: 'Python',    rows:  10000, seed: 1337,   status: 'ok',      when: '1 h ago',    who: 'a.lovelace', conf: 0.93, output: 'JSON' },
  { id: 'job_2800', schema: 'Broken fragment',         fmt: 'Malformed', rows:      0, seed: 0,      status: 'blocked', when: '2 h ago',    who: 's.weber',    conf: 0.17, output: '—' },
  { id: 'job_2799', schema: 'Vehicle · Avro',          fmt: 'Avro',      rows:1000000, seed: 9000,   status: 'ok',      when: 'Yesterday',  who: 't.moser',    conf: 0.97, output: 'Parquet' },
  { id: 'job_2798', schema: 'Order · proto3',          fmt: 'Protobuf',  rows: 200000, seed: 101,    status: 'ok',      when: 'Yesterday',  who: 'h.koenig',   conf: 0.94, output: 'JSON' },
  { id: 'job_2797', schema: 'Customer · NL prose',     fmt: 'NL',        rows:  75000, seed: 77,     status: 'partial', when: '2 d ago',    who: 'a.lovelace', conf: 0.68, output: 'JSON' },
];

const AUDIT = [
  { when: '2026-04-24 09:12:04', who: 'a.lovelace', event: 'UPLOAD',   detail: 'customer_orders.sql · 2.3 KB · checksum 0x8af1…' },
  { when: '2026-04-24 09:12:11', who: 'a.lovelace', event: 'PARSE',    detail: 'SQL DDL → canonical · confidence 0.99' },
  { when: '2026-04-24 09:12:44', who: 'a.lovelace', event: 'GENERATE', detail: 'seed=42 · rows=250000 · format=JSON' },
  { when: '2026-04-24 09:14:02', who: 'a.lovelace', event: 'EXPORT',   detail: 'JSON · 182 MB · dl by requester' },
  { when: '2026-04-24 09:22:17', who: 's.weber',    event: 'UPLOAD',   detail: 'broken.frag · 412 B' },
  { when: '2026-04-24 09:22:18', who: 'system',     event: 'BLOCK',    detail: 'Confidence 0.17 below threshold (0.55)' },
];

// ─── Window export ──────────────────────────────────────────────────
Object.assign(window, {
  Icon, TEMPLATES,
  SAMPLE_JSON, SAMPLE_SQL, SAMPLE_JAVA, SAMPLE_TS, SAMPLE_PY, SAMPLE_GO, SAMPLE_AVRO, SAMPLE_PROTO, SAMPLE_YAML, SAMPLE_NL, SAMPLE_MESSY, SAMPLE_BROKEN,
  JOBS, AUDIT,
  parseSchema, detectLanguage,
  generateRows, flattenPrimary, rngOf,
});
