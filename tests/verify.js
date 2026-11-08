// A feladatgenerátorok és az átalakítások ellenőrzése: node tests/verify.js
const fs = require('fs');
const html = fs.readFileSync(require('path').join(__dirname, '..', 'index.html'), 'utf8');
const eng = html.split('// ENGINE START')[1].split('// ENGINE END')[0];
const E = new Function(eng + '; return {TOPICS, makeQuestion, applyOp, nextOp, doneValue, solve, F, feq, r, rnz, parseEquation, parseOp};')();
const { F, feq } = E;
let bad = 0, count = 0;
const fail = (...a) => { bad++; if (bad < 10) console.log('HIBA', ...a); };

for (const t of E.TOPICS.filter(x => x.gen)) for (const L of [1, 2, 3]) for (let i = 0; i < 2000; i++) {
  const q = E.makeQuestion(t.id, L, ''); count++;
  if (L < 3 && q.x.d !== 1) fail('nem egész megoldás', t.id, L, q.key);
  if (/NaN|undefined/.test(q.key + JSON.stringify(q.rows))) fail('hibás megjelenítés', t.id, L, q.key);
  // néhány véletlen (de helyes) átalakítás, utána a javasolt lépések
  let cur = q.E;
  for (let k = 0; k < 4 && !E.doneValue(cur); k++) {
    const c = E.r(1, 5);
    const op = c === 1 ? { k: 'add', a: F(E.rnz(-3, 3)), b: F(0) } : c === 2 ? { k: 'add', a: F(0), b: F(E.rnz(-9, 9)) }
      : c === 3 ? { k: 'mul', v: F(E.rnz(-4, 4)) } : c === 4 ? { k: 'expand' } : { k: 'combine' };
    const res = E.applyOp(cur, op);
    if (res.E) { cur = res.E; if (!feq(E.solve(cur), q.x)) fail('nem ekvivalens átalakítás', t.id, L, q.key); }
  }
  let op, g = 0;
  while ((op = E.nextOp(cur)) && g++ < 30) cur = E.applyOp(cur, op).E;
  const v = E.doneValue(cur);
  if (!v || !feq(v, q.x)) fail('a levezetés nem jut el a megoldásig', t.id, L, q.key);
}

// beírt egyenletek és műveletek értelmezése
const eq = E.parseEquation('(x+3)/4 = 2x - 1,5');
if (!(feq(eq.L.a, F(1, 4)) && feq(eq.L.b, F(3, 4)) && feq(eq.R.a, F(2)) && feq(eq.R.b, F(-3, 2)))) fail('parseEquation');
const op = E.parseOp(':(−3)');
if (!(op.k === 'div' && feq(op.v, F(-3)))) fail('parseOp');

console.log('ellenőrzött feladat:', count, 'hibás:', bad);
process.exit(bad ? 1 : 0);
