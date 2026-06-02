/**
 * True when the app is running inside an iframe (e.g. the homepage hero's live
 * demo previews). Used to hide chrome that shouldn't appear inside a preview.
 */
export const isEmbedded =
  typeof window !== "undefined" && window.self !== window.top;
