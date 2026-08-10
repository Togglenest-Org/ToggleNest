import { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

export default function CardForm({ onAddCard, onClose }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    onAddCard(title.trim());
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="m-1 space-y-4 px-1 py-0.5">
      <textarea
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a title for this card..."
        className="min-h-[56px] w-full resize-none rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
        autoFocus
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
          }
          if (event.key === 'Escape') onClose();
        }}
      />
      <div className="flex items-center gap-x-1">
        <Button type="submit" size="sm">
          Add card
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
