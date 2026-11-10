import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
const code = readFileSync(new URL('../public/vendor/framerusercontent.com/sites/6yCywluy3f19AABuNXU8BE/framer.DXhjOmyi.mjs', import.meta.url), 'utf8');
class Node {}
const warnings = [];
const equals = runInNewContext('const Wm=Object.keys,Gm=Symbol();' + code.slice(code.indexOf('function Qe('), code.indexOf('function ut(')) + ';lt', { Node, console: { warn: (...args) => warnings.push(args) } });
const first = new Node(), second = new Node();
first.__reactFiber = { stateNode: first }; second.__reactFiber = { stateNode: second };
assert.equal(equals([{ ref: { current: first }, target: 'section' }], [{ ref: { current: second }, target: 'section' }]), false);
assert.equal(equals([{ ref: { current: first } }], [{ ref: { current: first } }]), true);
assert.equal(equals({ values: [1, { opacity: 0.5 }] }, { values: [1, { opacity: 0.5 }] }), true);
assert.equal(equals({ values: [1, { opacity: 0.5 }] }, { values: [1, { opacity: 1 }] }), false);
assert.deepEqual(warnings, []);
console.log('DOM reference comparison and plain-data equality checks passed');
