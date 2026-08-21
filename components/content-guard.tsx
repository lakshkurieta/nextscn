"use client";

import { useEffect } from "react";

/**
 * Deterrents against casual copying: no text selection, no right-click save,
 * no dragging images out.
 *
 * The carve-out matters as much as the guard. Form fields stay fully
 * selectable, copyable and pasteable — without that, a visitor could not fix a
 * typo in their own email address or paste one in, which would quietly break
 * the contact form. Every handler below checks for that first.
 *
 * Scope of what this can actually do: it stops the ordinary gestures —
 * select-and-copy, right-click "Save image as", drag-to-desktop. It cannot stop
 * anyone determined, because the browser has already been sent the files in
 * order to render them; view-source, devtools, the network tab and screenshots
 * all remain. Treat it as a speed bump, not a lock.
 */

const isFormField = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.closest("input, textarea, select, [contenteditable='true']") !== null
  );
};

export function ContentGuard() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      if (isFormField(e.target)) return; // keep paste available
      e.preventDefault();
    };

    const onCopyOrCut = (e: ClipboardEvent) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    };

    const onDragStart = (e: DragEvent) => {
      const t = e.target;
      if (t instanceof HTMLElement && (t.tagName === "IMG" || t.tagName === "VIDEO")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("copy", onCopyOrCut);
    document.addEventListener("cut", onCopyOrCut);
    document.addEventListener("dragstart", onDragStart);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("copy", onCopyOrCut);
      document.removeEventListener("cut", onCopyOrCut);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
