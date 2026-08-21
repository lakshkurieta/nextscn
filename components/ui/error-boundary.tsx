"use client";

import React from "react";

/**
 * Catches a failing subtree and renders a fallback instead of taking the page
 * down with it.
 *
 * This exists for the globe. three.js throws when it cannot get a WebGL context
 * — hardware acceleration off, a sandboxed GPU process, or the browser's live
 * context budget already spent — and an uncaught throw there blanks the whole
 * route over one decorative element.
 *
 * Must be a class: error boundaries have no hooks equivalent.
 */
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Subtree failed; rendering fallback instead.", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Is a WebGL context actually obtainable right now?
 *
 * Feature-detects by really creating one, because the failure modes that matter
 * are runtime conditions, not missing APIs: `WebGLRenderingContext` exists on
 * the window even when the GPU process refuses to hand out contexts.
 *
 * The probe context is released immediately. Browsers cap how many can be live
 * at once (~16 in Chrome) and evict the oldest when that is exceeded — a leaked
 * probe would count against the very budget the real renderer needs.
 */
export function canUseWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}
