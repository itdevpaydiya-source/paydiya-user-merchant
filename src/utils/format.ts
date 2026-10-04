export const formatINR = (n: number) =>
  '₹' + n.toLocaleString('en-IN');

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
