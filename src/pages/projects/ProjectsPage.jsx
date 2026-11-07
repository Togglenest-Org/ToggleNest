import { useEffect, useState } from 'react';
import { FolderKanban, Pencil, Plus, Trash2 } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../services/projectService';

const emptyForm = { title: '', description: '' };

export default function ProjectsPage() {
  const { token, user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(Boolean(token));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    let active = true;
    const loadProjects = async () => {
      setLoading(true);
      try {
        const result = await projectService.list(token);
        if (active) setProjects(result);
      } catch (requestError) {
        if (active) setError(requestError.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    if (token) loadProjects();
    return () => { active = false; };
  }, [token]);

  const pageError = error || (!token ? 'Sign in to view your projects.' : '');

  const openCreateDialog = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setError('');
    setDialogOpen(true);
  };

  const openEditDialog = (project) => {
    setEditingProject(project);
    setForm({ title: project.title || '', description: project.description || '' });
    setError('');
    setDialogOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');
    const payload = { title: form.title.trim(), description: form.description.trim() };

    try {
      if (editingProject) {
        const updated = await projectService.update(editingProject._id, payload, token);
        setProjects((current) => current.map((project) => project._id === updated._id ? updated : project));
        setNotice('Project updated.');
      } else {
        const created = await projectService.create(payload, token);
        setProjects((current) => [created, ...current]);
        setNotice('Project created.');
      }
      setDialogOpen(false);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Delete “${project.title}”? This cannot be undone.`)) return;
    setError('');
    setNotice('');
    try {
      await projectService.remove(project._id, token);
      setProjects((current) => current.filter((item) => item._id !== project._id));
      setNotice('Project deleted.');
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Projects"
          title="All projects"
          description="Track the status of every initiative across your workspace."
          actions={<Button onClick={openCreateDialog}><Plus className="mr-1.5 h-4 w-4" /> Create project</Button>}
        />

        {pageError && !dialogOpen ? <p role="alert" className="rounded-md bg-rose-50 px-4 py-3 text-sm text-rose-700">{pageError}</p> : null}
        {notice ? <p role="status" className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p> : null}

        {loading && token ? (
          <p className="text-sm text-neutral-500" role="status">Loading projects…</p>
        ) : projects.length === 0 ? (
          <Card className="py-12 text-center">
            <FolderKanban className="mx-auto h-8 w-8 text-neutral-400" />
            <h2 className="mt-3 font-semibold text-neutral-900">No projects yet</h2>
            <p className="mt-1 text-sm text-neutral-500">Create a project to start organizing your work.</p>
            <Button className="mt-5" onClick={openCreateDialog}><Plus className="mr-1.5 h-4 w-4" /> Create project</Button>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => {
              const ownerId = project.owner?._id || project.owner;
              const canManage = String(ownerId) === String(user?._id);
              return (
              <Card key={project._id} className="group flex flex-col transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition group-hover:bg-neutral-900 group-hover:text-white">
                    <FolderKanban className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-neutral-900">{project.title}</h2>
                    <p className="mt-1 line-clamp-3 min-h-12 text-sm text-neutral-500">
                      {project.description || 'No description provided.'}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-xs text-neutral-400">
                  Owner: {project.owner?.name || user?.name || 'You'}
                </p>
                {canManage ? <div className="mt-5 flex gap-2 border-t border-neutral-100 pt-4">
                  <button
                    type="button"
                    onClick={() => openEditDialog(project)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-200"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(project)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-rose-50 px-3 py-1.5 text-sm text-rose-600 transition hover:bg-rose-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div> : null}
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
          <div role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 id="project-dialog-title" className="text-lg font-semibold text-neutral-900">
              {editingProject ? 'Edit project' : 'Create project'}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {editingProject ? 'Update the project name or description.' : 'Add a name and description for your project.'}
            </p>
            {error ? <p role="alert" className="mt-4 text-sm text-rose-600">{error}</p> : null}
            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-neutral-700">
                Project name
                <input
                  autoFocus
                  required
                  maxLength={100}
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="mt-1.5 flex h-10 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                />
              </label>
              <label className="block text-sm font-medium text-neutral-700">
                Description
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  className="mt-1.5 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                />
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>Cancel</Button>
                <Button type="submit" disabled={saving}>{saving ? 'Saving…' : editingProject ? 'Save changes' : 'Create project'}</Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </PageLayout>
  );
}
