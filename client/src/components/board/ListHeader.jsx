import { MoreHorizontal, Plus } from 'lucide-react';
import Button from '../ui/Button';

export default function ListHeader({ title, onAddCard }) {
  return (
    <div className="flex items-center justify-between gap-x-1 px-2 pt-2">
      <div className="w-full cursor-text truncate px-2.5 py-1.5 text-sm font-semibold text-neutral-800">
        {title}
      </div>
      <div className="flex shrink-0 items-center gap-x-0.5">
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 rounded p-0 text-neutral-500 transition hover:bg-neutral-200/70 hover:text-neutral-800"
          onClick={onAddCard}
          aria-label="Add card"
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 rounded p-0 text-neutral-500 transition hover:bg-neutral-200/70 hover:text-neutral-800"
          aria-label="List options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
