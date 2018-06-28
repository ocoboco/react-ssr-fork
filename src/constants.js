export const CAN_USE_DOM =
  typeof window !== 'undefined' &&
  typeof window.document === 'object' &&
  typeof window.document.createElement === 'function'
;