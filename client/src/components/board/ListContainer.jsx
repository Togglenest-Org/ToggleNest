import { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import ListItem, { ListForm } from './ListItem';

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function ListContainer({ initialLists }) {
  const [lists, setLists] = useState(initialLists);

  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    if (type === 'list') {
      setLists((prev) => reorder(prev, source.index, destination.index));
      return;
    }

    if (type === 'card') {
      setLists((prev) => {
        const next = prev.map((list) => ({ ...list, cards: [...list.cards] }));

        const sourceList = next.find((list) => list.id === source.droppableId);
        const destinationList = next.find((list) => list.id === destination.droppableId);
        if (!sourceList || !destinationList) return prev;

        const [movedCard] = sourceList.cards.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
          sourceList.cards.splice(destination.index, 0, movedCard);
        } else {
          destinationList.cards.splice(destination.index, 0, movedCard);
        }

        return next;
      });
    }
  };

  const handleAddCard = (listId, title) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, cards: [...list.cards, { id: `card-${Date.now()}`, title }] }
          : list,
      ),
    );
  };

  const handleAddList = (title) => {
    setLists((prev) => [...prev, { id: `list-${Date.now()}`, title, cards: [] }]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol ref={provided.innerRef} {...provided.droppableProps} className="flex h-full gap-x-3">
            {lists.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} onAddCard={handleAddCard} />
            ))}
            {provided.placeholder}
            <ListForm onAddList={handleAddList} />
            <div aria-hidden className="w-1 shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}
