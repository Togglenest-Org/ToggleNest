import { useEffect, useState } from 'react';
import { CheckSquare, Pencil, Plus, Square, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../services/projectService';
import taskService from '../../services/taskService';

const emptyForm = { title: '', description: '', projectId: '', priority: 'medium', dueDate: '' };

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

export default function TasksPage() {
  const { token, user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(Boolean(token));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    let active = true;
    if (!token) return () => { active = false; };

    const loadData = async () => {
      setLoading(true);
      try {
        const [loadedTasks, loadedProjects] = await Promise.all([
          taskService.list(token),
          projectService.list(token),
        ]);
        if (active) {
          setTasks(loadedTasks);
          setProjects(loadedProjects);
        }
      } catch (requestError) {
        if (active) setError(requestError.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadData();
    return () => { active = false; };
  }, [token]);

  const pageError = error || (!token ? 'Sign in to view your tasks.' : '');

  const openCreateDialog = () => {
    setEditingTask(null);
    setForm({ ...emptyForm, projectId: projects[0]?._id || '' });
    setError('');
    setDialogOpen(true);
  };

  const openEditDialog = (task) => {
    setEditingTask(task);
    setForm({
      title: task.title || '',
      description: task.description || '',
      projectId: task.project?._id || task.project || '',
      priority: task.priority || 'medium',
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '',
    });
    setError('');
    setDialogOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.projectId) {
      setError('Create a project before adding tasks.');
      return;
    }

    setSaving(true);
    setError('');
    setNotice('');
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      projectId: form.projectId,
      priority: form.priority,
      dueDate: form.dueDate || '',
    };

    try {
      if (editingTask) {
        const updated = await taskService.update(editingTask._id, payload, token);
        setTasks((current) => current.map((task) => task._id === updated._id ? updated : task));
        setNotice('Task updated.');
      } else {
        const created = await taskService.create(payload, token);
        setTasks((current) => [created, ...current]);
        setNotice('Task created.');
      }
      setDialogOpen(false);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleTask = async (task) => {
    setError('');
    setNotice('');
    try {
      const updated = await taskService.update(
        task._id,
        { column: task.column === 'Done' ? 'To Do' : 'Done' },
        token,
      );
      setTasks((current) => current.map((item) => item._id === updated._id ? updated : item));
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const handleDelete = async (task) => {
    if (!window.confirm(`Delete “${task.title}”? This cannot be undone.`)) return;
    setError('');
    setNotice('');
    try {
      await taskService.remove(task._id, token);
      setTasks((current) => current.filter((item) => item._id !== task._id));
      setNotice('Task deleted.');
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Tasks"
          title="Team backlog"
          description="A shared list of everything the team needs to get done."
          actions={<Button onClick={openCreateDialog}><Plus className="mr-1.5 h-4 w-4" /> Create task</Button>}
        />

        {pageError && !dialogOpen ? <p role="alert" className="rounded-md bg-rose-50 px-4 py-3 text-sm text-rose-700">{pageError}</p> : null}
        {notice ? <p role="status" className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p> : null}

        {loading && token ? (
          <p role="status" className="text-sm text-neutral-500">Loading tasks…</p>
        ) : tasks.length === 0 ? (
          <Card className="py-12 text-center">
            <CheckSquare className="mx-auto h-8 w-8 text-neutral-400" />
            <h2 className="mt-3 font-semibold text-neutral-900">No tasks yet</h2>
            {projects.length ? (
              <>
                <p className="mt-1 text-sm text-neutral-500">Create a task to start tracking work.</p>
                <Button className="mt-5" onClick={openCreateDialog}><Plus className="mr-1.5 h-4 w-4" /> Create task</Button>
              </>
            ) : (
              <p className="mt-1 text-sm text-neutral-500">
                Create a <Link to="/projects" className="font-medium text-neutral-900 underline">project</Link> first, then add tasks to it.
              </p>
            )}
          </Card>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {tasks.map((task) => {
              const isDone = task.column === 'Done';
              const assignee = task.assignedTo?.[0]?.name || user?.name || 'You';
              return (
                <Card key={task._id} className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <button
                        type="button"
                        onClick={() => toggleTask(task)}
                        aria-label={isDone ? `Mark ${task.title} as not done` : `Mark ${task.title} as done`}
                        aria-pressed={isDone}
                        className="mt-0.5 shrink-0 rounded text-neutral-400 transition hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                      >
                        {isDone ? <CheckSquare className="h-5 w-5 text-emerald-600" /> : <Square className="h-5 w-5" />}
                      </button>
                      <div className="min-w-0">
                        <h2 className={`font-semibold ${isDone ? 'text-neutral-400 line-through' : 'text-neutral-900'}`}>{task.title}</h2>
                        <p className="mt-1 text-sm text-neutral-500">
                          {task.project?.title || 'Project'} · Due <span className="font-medium text-neutral-700">{formatDate(task.dueDate)}</span>
                        </p>
                        {task.description ? <p className="mt-2 line-clamp-2 text-sm text-neutral-500">{task.description}</p> : null}
                      </div>
                    </div>
                    <Badge variant={priorityVariant(task.priority)}>{task.priority}</Badge>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
                    <span className="text-sm text-neutral-500">Assigned to {assignee}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditDialog(task)}
                        className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2.5 py-1.5 text-xs text-neutral-700 transition hover:bg-neutral-200"
                      >
                        <Pencil className="h-3 w-3" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(task)}
                        className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2.5 py-1.5 text-xs text-rose-600 transition hover:bg-rose-100"
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {dialogOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !saving) setDialogOpen(false);
        }}>
          <div role="dialog" aria-modal="true" aria-labelledby="task-dialog-title" className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 id="task-dialog-title" className="text-lg font-semibold text-neutral-900">
              {editingTask ? 'Edit task' : 'Create task'}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {editingTask ? 'Update the task details below.' : 'Add a task to one of your projects.'}
            </p>
            {error ? <p role="alert" className="mt-4 text-sm text-rose-600">{error}</p> : null}
            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
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
                Project
                <select
                  required
                  value={form.projectId}
                  onChange={(event) => setForm((current) => ({ ...current, projectId: event.target.value }))}
                  className="mt-1.5 h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                >
                  <option value="" disabled>Select a project</option>
                  {projects.map((project) => <option key={project._id} value={project._id}>{project.title}</option>)}
                </select>
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
                <Button type="submit" disabled={saving || projects.length === 0}>{saving ? 'Saving…' : editingTask ? 'Save changes' : 'Create task'}</Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </PageLayout>
  );
}
