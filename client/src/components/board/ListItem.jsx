import { useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Plus, X } from 'lucide-react';
import Button from '../ui/Button';
import CardItem from './CardItem';
import CardForm from './CardForm';
import ListHeader from './ListHeader';
import { cn } from '../../lib/utils';

export default function ListItem({ data, index, onAddCard }) {
  const [showCardForm, setShowCardForm] = useState(false);

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="h-full w-[272px] shrink-0 select-none"
        >
          <div {...provided.dragHandleProps} className="w-full rounded-md bg-[#f2f2f4] pb-2 shadow-md">
            <ListHeader title={data.title} onAddCard={() => setShowCardForm(true)} />

            <Droppable droppableId={data.id} type="card">
              {(dropProvided) => (
                <ol
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}
                  className={cn('mx-1 flex flex-col gap-y-2 px-1 py-0.5', data.cards.length > 0 ? 'mt-2' : 'mt-0')}
                >
                  {data.cards.map((card, cardIndex) => (
                    <CardItem key={card.id} index={cardIndex} data={card} />
                  ))}
                  {dropProvided.placeholder}
                </ol>
              )}
            </Droppable>

            {showCardForm ? (
              <CardForm
                onAddCard={(title) => {
                  onAddCard(data.id, title);
                  setShowCardForm(false);
                }}
                onClose={() => setShowCardForm(false)}
              />
            ) : (
              <div className="px-2 pt-2">
                <Button
                  onClick={() => setShowCardForm(true)}
                  size="sm"
                  variant="ghost"
                  className="h-auto w-full justify-start px-2 py-1.5 text-sm text-neutral-500"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add a card
                </Button>
              </div>
            )}
          </div>
        </li>
      )}
    </Draggable>
  );
}

export function ListForm({ onAddList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    onAddList(title.trim());
    setTitle('');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="h-full w-[272px] shrink-0 select-none">
        <form onSubmit={handleSubmit} className="w-full space-y-4 rounded-md bg-white p-3 shadow-md">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter list title..."
            className="h-7 w-full rounded-md border border-neutral-200 px-2 py-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            autoFocus
          />
          <div className="flex items-center gap-x-1">
            <Button type="submit" size="sm">
              Add list
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="flex w-full items-center rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add a list
      </button>
    </li>
  );
}
