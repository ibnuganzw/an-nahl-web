import type { ReactNode } from "react";

export default function PageHead({
  title,
  desc,
  action,
}: {
  title: string;
  desc?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border bg-white px-7 py-6">
      <div>
        <h1 className="m-0 font-serif text-[26px] font-bold tracking-[-0.01em] text-navy">
          {title}
        </h1>
        {desc && <p className="m-0 mt-1 text-sm text-muted">{desc}</p>}
      </div>
      {action}
    </div>
  );
}
