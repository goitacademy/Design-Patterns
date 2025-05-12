// const original = { a: 1, b: { c: 2 } };
// const shallowCopy = { ...original };

// shallowCopy.b.c = 3;

// console.log(`original: ${JSON.stringify(original)}`);
// console.log(`shallowCopy: ${JSON.stringify(shallowCopy)}`);

const original = { a: 1, b: { c: 2 } };
const deepCopy = structuredClone(original) as unknown as {
  a: number;
  b: { c: number };
};

deepCopy.b.c = 3;

console.log(`original: ${JSON.stringify(original)}`);
console.log(`deepCopy: ${JSON.stringify(deepCopy)}`);
