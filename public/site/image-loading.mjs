// Keep the first-screen imagery eager; defer other images without changing their bytes.
const heroImages = ["vmBrxvzwFbWhCxDWh25xpdZfEU","wX62SMRMN1v1X6SFoJaoNdwo","93NVWJJQujdEcPewVpg3Xp7ip4","3R1ieE0tQwdtUPl2URw3LpH6I"];
/** @param {string} src @param {string | undefined} [requested] */
export function imageLoading(src, requested) {
  return requested || (heroImages.some(name => String(src).includes(name)) ? 'eager' : 'lazy');
}
