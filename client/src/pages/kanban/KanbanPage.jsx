import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { GripVertical, Plus } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { kanbanColumns } from '../../data/mockData';

const priorityVariant = (priority) => {
  if (priority === 'High') return 'danger';
  if (priority === 'Medium') return 'warning';
  return 'default';
};

export default function KanbanPage() {
  const [columns, setColumns] = useState(kanbanColumns);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceTasks = Array.from(columns[source.droppableId].tasks);
    const [moved] = sourceTasks.splice(source.index, 1);
    const destinationTasks = Array.from(columns[destination.droppableId].tasks);
    destinationTasks.splice(destination.index, 0, moved);

    setColumns((prev) => ({
      ...prev,
      [source.droppableId]: { ...prev[source.droppableId], tasks: sourceTasks },
      [destination.droppableId]: { ...prev[destination.droppableId], tasks: destinationTasks },
    }));
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Kanban"
          title="Workflow board"
          description="Drag tasks between columns to update workflow state."
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid gap-4 xl:grid-cols-3">
            {Object.entries(columns).map(([columnId, column]) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`rounded-lg border p-3 transition ${
                      snapshot.isDraggingOver ? 'border-neutral-400 bg-neutral-100' : 'border-neutral-200 bg-neutral-50'
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between px-1">
                      <h2 className="text-sm font-semibold text-neutral-800">{column.title}</h2>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-200 text-[11px] font-semibold text-neutral-600">
                        {column.tasks.length}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {column.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(dragProvided, snapshot) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              className={`rounded-md border bg-white p-3.5 shadow-sm transition ${
                                snapshot.isDragging
                                  ? 'border-neutral-900 shadow-lg'
                                  : 'border-neutral-200 hover:border-neutral-300 hover:shadow'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-neutral-300" />
                                <div className="min-w-0 flex-1">
                                  <h3 className="text-sm font-semibold text-neutral-900">{task.title}</h3>
                                  <p className="mt-1 text-xs text-neutral-500">Owner: {task.owner}</p>
                                  <div className="mt-3 flex items-center justify-between">
                                    <Badge variant={priorityVariant(task.priority)} className="px-2.5 py-0.5 text-[11px]">
                                      {task.priority}
                                    </Badge>
                                    <span className="text-xs text-neutral-400">{task.due}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>

                    <button
                      type="button"
                      className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-neutral-300 py-2 text-sm font-medium text-neutral-500 transition hover:border-neutral-400 hover:bg-white hover:text-neutral-800"
                    >
                      <Plus className="h-4 w-4" /> Add task
                    </button>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </PageLayout>
  );
}
