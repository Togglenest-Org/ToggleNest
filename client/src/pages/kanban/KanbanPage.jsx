import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useEffect, useMemo, useState } from 'react';
import { GripVertical, Plus } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../services/projectService';
import taskService from '../../services/taskService';

const defaultColumns = ['To Do', 'In Progress', 'In Review', 'Done'];
const emptyForm = { title: '', description: '', priority: 'medium', dueDate: '' };

const priorityVariant = (priority) => {
  if (priority === 'high' || priority === 'urgent') return 'danger';
  if (priority === 'medium') return 'warning';
  return 'default';
};

const formatDate = (date) => {
  if (!date) return 'No due date';
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? 'No due date' : parsed.toLocaleDateString();
};

export default function KanbanPage() {
  const { token, user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(Boolean(token));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState('To Do');
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    let active = true;
    if (!token) return () => { active = false; };

    const loadBoard = async () => {
      setLoading(true);
      try {
        const [loadedProjects, loadedTasks] = await Promise.all([
          projectService.list(token),
          taskService.list(token),
        ]);
        if (active) {
          setProjects(loadedProjects);
          setTasks(loadedTasks);
        }
      } catch (requestError) {
        if (active) setError(requestError.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadBoard();
    return () => { active = false; };
  }, [token]);

  const requestedProjectId = searchParams.get('projectId');
  const selectedProjectId = projects.some((project) => project._id === requestedProjectId)
    ? requestedProjectId
    : projects[0]?._id || '';
  const selectedProject = projects.find((project) => project._id === selectedProjectId);
  const projectTasks = useMemo(
    () => tasks.filter((task) => (task.project?._id || task.project) === selectedProjectId),
    [tasks, selectedProjectId],
  );
  const columns = useMemo(() => {
    const titles = [...(selectedProject?.columns?.length ? selectedProject.columns : defaultColumns)];
    projectTasks.forEach((task) => {
      if (task.column && !titles.includes(task.column)) titles.push(task.column);
    });
    return titles.map((title) => ({
      id: title,
      title,
      tasks: projectTasks.filter((task) => task.column === title),
    }));
  }, [projectTasks, selectedProject]);

  const openTaskDialog = (columnTitle) => {
    setActiveColumn(columnTitle);
    setForm(emptyForm);
    setError('');
    setDialogOpen(true);
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();
    if (!selectedProjectId) {
      setError('Create a project before adding tasks.');
      return;
    }

    setSaving(true);
    setError('');
    setNotice('');
    try {
      const created = await taskService.create({
        title: form.title.trim(),
        description: form.description.trim(),
        projectId: selectedProjectId,
        priority: form.priority,
        dueDate: form.dueDate || '',
        column: activeColumn,
      }, token);
      setTasks((current) => [created, ...current]);
      setDialogOpen(false);
      setNotice('Task added to the board.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const movedTask = tasks.find((task) => task._id === draggableId);
    if (!movedTask) return;

    const nextTasks = [...tasks];
    const oldIndex = nextTasks.findIndex((task) => task._id === draggableId);
    nextTasks.splice(oldIndex, 1);
    const destinationColumnTasks = columns.find((column) => column.id === destination.droppableId)?.tasks || [];
    const targetTask = destinationColumnTasks.filter((task) => task._id !== draggableId)[destination.index];
    let insertIndex = targetTask ? nextTasks.findIndex((task) => task._id === targetTask._id) : -1;
    if (insertIndex < 0) {
      nextTasks.forEach((task, index) => {
        if ((task.project?._id || task.project) === selectedProjectId && task.column === destination.droppableId) {
          insertIndex = index + 1;
        }
      });
    }
    if (insertIndex < 0) insertIndex = nextTasks.length;

    const updatedTask = { ...movedTask, column: destination.droppableId };
    nextTasks.splice(insertIndex, 0, updatedTask);

    if (source.droppableId !== destination.droppableId) {
      try {
        const savedTask = await taskService.update(draggableId, { column: destination.droppableId }, token);
        nextTasks[insertIndex] = savedTask;
      } catch (requestError) {
        setError(requestError.message);
        return;
      }
    }
    setError('');
    setTasks(nextTasks);
  };

  const pageError = error || (!token ? 'Sign in to use the Kanban board.' : '');

  return (
    <PageLayout>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Kanban"
          title="Workflow board"
          description="Drag tasks between columns to update workflow state."
          actions={projects.length ? (
            <label className="flex items-center gap-2 text-sm font-medium text-neutral-600">
              Project
              <select
                value={selectedProjectId}
                onChange={(event) => {
                  const projectId = event.target.value;
                  setSearchParams({ projectId }, { replace: true });
                }}
                className="h-10 max-w-56 rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
              >
                {projects.map((project) => <option key={project._id} value={project._id}>{project.title}</option>)}
              </select>
            </label>
          ) : null}
        />

        {pageError ? <p role="alert" className="rounded-md bg-rose-50 px-4 py-3 text-sm text-rose-700">{pageError}</p> : null}
        {notice ? <p role="status" className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p> : null}

        {loading && token ? (
          <p role="status" className="text-sm text-neutral-500">Loading board…</p>
        ) : !projects.length ? (
          <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center">
            <h2 className="font-semibold text-neutral-900">Create a project to start a board</h2>
            <p className="mt-1 text-sm text-neutral-500">Kanban tasks are organized inside projects.</p>
            <Link to="/projects" className="mt-4 inline-flex rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">Go to projects</Link>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid gap-4 xl:grid-cols-3">
              {columns.map((column) => (
                <Droppable key={column.id} droppableId={column.id}>
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
                          <Draggable key={task._id} draggableId={task._id} index={index}>
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
                                    {task.description ? <p className="mt-1 line-clamp-2 text-xs text-neutral-500">{task.description}</p> : null}
                                    <p className="mt-1 text-xs text-neutral-500">Owner: {task.assignedTo?.[0]?.name || user?.name || 'You'}</p>
                                    <div className="mt-3 flex items-center justify-between">
                                      <Badge variant={priorityVariant(task.priority)} className="px-2.5 py-0.5 text-[11px]">
                                        {task.priority}
                                      </Badge>
                                      <span className="text-xs text-neutral-400">{formatDate(task.dueDate)}</span>
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
                        onClick={() => openTaskDialog(column.title)}
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
        )}
      </div>

      {dialogOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !saving) setDialogOpen(false);
        }}>
          <div role="dialog" aria-modal="true" aria-labelledby="kanban-task-dialog-title" className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 id="kanban-task-dialog-title" className="text-lg font-semibold text-neutral-900">Add task to {activeColumn}</h2>
            <p className="mt-1 text-sm text-neutral-500">Project: {selectedProject?.title}</p>
            {error ? <p role="alert" className="mt-4 text-sm text-rose-600">{error}</p> : null}
            <form className="mt-5 space-y-4" onSubmit={handleCreateTask}>
              <label className="block text-sm font-medium text-neutral-700">
                Task name
                <input
                  autoFocus
                  required
                  maxLength={200}
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="mt-1.5 flex h-10 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                />
              </label>
              <label className="block text-sm font-medium text-neutral-700">
                Description
                <textarea
                  rows={3}
                  maxLength={1000}
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  className="mt-1.5 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-neutral-700">
                  Priority
                  <select
                    value={form.priority}
                    onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}
                    className="mt-1.5 h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </label>
                <label className="block text-sm font-medium text-neutral-700">
                  Due date
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))}
                    className="mt-1.5 h-10 w-full rounded-md border border-neutral-200 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                  />
                </label>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>Cancel</Button>
                <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Add task'}</Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </PageLayout>
  );
}
