"use client";

import { useEffect, type ReactNode } from "react";

export default function AdminModal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-navy-dark/45 p-4 backdrop-blur-[2px] sm:p-8"
      onClick={onClose}
    >
      <div
        className="my-auto w-full max-w-[560px] rounded-[18px] border border-border bg-white shadow-[0_30px_70px_rgba(16,36,63,0.30)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="m-0 font-serif text-[19px] font-semibold text-navy">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-light hover:bg-bg-soft hover:text-navy"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export const adminField =
  "w-full rounded-[10px] border border-border bg-white px-3.5 py-2.5 text-sm text-navy";
export const adminLabel =
  "mb-1.5 block text-[12.5px] font-semibold text-muted2";
