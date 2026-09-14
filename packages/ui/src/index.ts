export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export const PROJECT_COLORS: Record<string, string> = {
  NAV: '#5e6ad2',
  LTH: '#26b5ce',
  KEEL: '#f2c94c',
  DFT: '#4cb782',
  MAR: '#eb5757',
  BCN: '#f2994a',
};
