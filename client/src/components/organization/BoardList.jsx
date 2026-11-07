import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FolderKanban, Plus } from 'lucide-react';
import { workspace } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../services/projectService';
import Button from '../ui/Button';

export default function BoardList() {
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(() => searchParams.get('create') === '1');
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    let active = true;
    if (!token) return () => { active = false; };

    projectService.list(token)
      .then((result) => { if (active) setProjects(result); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, [token]);

  const handleCreate = async (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    setError('');
    try {
      const project = await projectService.create({ title: name.trim(), description: description.trim() }, token);
      setProjects((current) => [project, ...current]);
      setName('');
      setDescription('');
      setCreating(false);
      setSearchParams({}, { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center text-lg font-semibold text-neutral-900">
          <FolderKanban className="mr-2 h-5 w-5 text-neutral-500" /> Your project boards
        </h2>
        <Button size="sm" onClick={() => { setError(''); setCreating((current) => !current); }}>
          <Plus className="mr-1.5 h-4 w-4" /> Create board
        </Button>
      </div>

      {error ? <p role="alert" className="rounded-md bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

      {creating ? (
        <form onSubmit={handleCreate} className="grid gap-3 rounded-lg border border-neutral-200 bg-white p-4 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
          <label className="block text-sm font-medium text-neutral-700">
            Board name
            <input
              autoFocus
              required
              maxLength={100}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1.5 h-10 w-full rounded-md border border-neutral-200 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            />
          </label>
          <label className="block text-sm font-medium text-neutral-700">
            Description
            <input
              maxLength={500}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="mt-1.5 h-10 w-full rounded-md border border-neutral-200 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            />
          </label>
          <Button type="submit" disabled={saving}>{saving ? 'Creating…' : 'Create'}</Button>
          <Button type="button" variant="outline" onClick={() => { setCreating(false); setSearchParams({}, { replace: true }); }} disabled={saving}>Cancel</Button>
        </form>
      ) : null}

      {loading ? (
        <p role="status" className="text-sm text-neutral-500">Loading boards…</p>
      ) : projects.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <Link
              key={project._id}
              to={`/kanban?projectId=${encodeURIComponent(project._id)}`}
              style={{ backgroundImage: `url(${workspace.imageUrl})` }}
              className="group relative flex aspect-video flex-col justify-between overflow-hidden rounded-md bg-neutral-700 bg-cover bg-center p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span aria-hidden className="absolute inset-0 bg-black/40 transition group-hover:bg-black/55" />
              <p className="relative truncate font-semibold text-white drop-shadow">{project.title}</p>
              <p className="relative line-clamp-2 text-xs text-white/80">{project.description || 'Open board'}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 py-14 text-center">
          <FolderKanban className="mx-auto h-8 w-8 text-neutral-300" />
          <p className="mt-3 text-sm font-medium text-neutral-700">No boards yet</p>
          <p className="mt-1 text-xs text-neutral-500">Create a board to start organizing your projects.</p>
        </div>
      )}
    </div>
  );
}
