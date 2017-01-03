export const getPositions = (stripLength) => new Array(stripLength).fill(0).map((x, i) => i);

export const random = (cap) => Math.floor(Math.random() * (cap - 1)) + 1;
