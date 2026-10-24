// Scroll timing, as fractions (0 to 1) of the pinned scroll distance.
export const FIRST = 0.1; // pause before the first overlap begins
export const LEN = 0.2; // how long each overlap takes
export const STEP = 0.26; // distance between the starts of consecutive overlaps

// The incoming photo starts slightly off-axis and settles into place.
// For a perfectly aligned stack use { x: "0%", rot: 0 }.
export const OFFSET = { x: "-7%", rot: -2 };

export const enter = (k) => {
  if (k === 0) return [-0.2, -0.1];
  const s = FIRST + (k - 1) * STEP;
  return [s, s + LEN];
};