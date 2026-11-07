import { Draggable } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';

export default function CardItem({ data, index, onOpen }) {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          role="button"
          tabIndex={0}
          onClick={() => onOpen?.(data)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onOpen?.(data);
          }}
          className={`group flex items-center gap-1.5 rounded-md border-2 bg-white px-3 py-2 text-sm shadow-sm transition ${
            snapshot.isDragging
              ? 'rotate-2 border-neutral-900 shadow-xl'
              : 'border-transparent hover:border-neutral-300 hover:shadow-md'
          }`}
        >
          <GripVertical className="h-3.5 w-3.5 shrink-0 text-neutral-300 opacity-0 transition group-hover:opacity-100" />
          <span className="min-w-0 flex-1 truncate">{data.title}</span>
        </div>
      )}
    </Draggable>
  );
}
