import { ChatCircle } from "@/components/icons";

import { mockActivityNotes } from "@/data/activities";

export function HistoryTab() {
  return (
    <ul className="flex flex-col gap-3 px-4 py-3">
      {mockActivityNotes.map((note) => (
        <li key={note.id} className="rounded-md border border-surface-gray-200 bg-surface-white p-3">
          <div className="flex items-center gap-2 text-xs text-ink-subtle">
            <ChatCircle size={13} className="text-brand-500" />
            <span className="font-medium text-ink">{note.author}</span>
            <span>&middot;</span>
            <span>{note.timestamp}</span>
          </div>
          <p className="mt-1.5 text-sm text-ink">{note.note}</p>
        </li>
      ))}
    </ul>
  );
}
