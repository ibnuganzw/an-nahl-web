"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Render konten Markdown artikel jadi tampilan rapi & konsisten.
 * Mendukung: heading (##, ###), tebal, miring, kutipan, daftar, tautan,
 * dan gambar dengan caption (teks alt tampil kecil di bawah gambar).
 */
export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ ...p }) => (
          <h2
            className="mb-3 mt-10 font-serif text-[clamp(24px,4vw,30px)] font-bold tracking-[-0.01em] text-navy"
            {...p}
          />
        ),
        h2: ({ ...p }) => (
          <h2
            className="mb-3 mt-9 font-serif text-[clamp(22px,3.5vw,27px)] font-semibold tracking-[-0.01em] text-navy"
            {...p}
          />
        ),
        h3: ({ ...p }) => (
          <h3
            className="mb-2.5 mt-7 font-serif text-[20px] font-semibold text-navy"
            {...p}
          />
        ),
        p: ({ ...p }) => <p className="mb-6" {...p} />,
        em: ({ ...p }) => <em className="italic" {...p} />,
        strong: ({ ...p }) => (
          <strong className="font-semibold text-navy" {...p} />
        ),
        ul: ({ ...p }) => <ul className="mb-6 list-disc pl-[22px]" {...p} />,
        ol: ({ ...p }) => <ol className="mb-6 list-decimal pl-[22px]" {...p} />,
        li: ({ ...p }) => <li className="mb-2.5" {...p} />,
        blockquote: ({ ...p }) => (
          <blockquote
            className="my-8 rounded-[0_12px_12px_0] border-l-[3px] border-gold bg-bg-soft px-6 py-5 italic text-muted"
            {...p}
          />
        ),
        a: ({ ...p }) => (
          <a
            className="font-medium text-teal underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
            {...p}
          />
        ),
        img: ({ src, alt }) => (
          <figure className="my-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={typeof src === "string" ? src : ""}
              alt={alt ?? ""}
              className="w-full rounded-[12px] border border-border"
            />
            {alt ? (
              <figcaption className="mt-2.5 text-center text-[13px] italic text-light">
                {alt}
              </figcaption>
            ) : null}
          </figure>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
