import { FolderKanban, Pencil, Plus, Trash2 } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { projects } from '../../data/mockData';

const statusVariant = (status) => {
  if (status === 'In Progress') return 'warning';
  if (status === 'Review') return 'success';
  return 'default';
};

export default function ProjectsPage() {
  return (
    <PageLayout>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Projects"
          title="All projects"
          description="Track the status of every initiative across your workspace."
          actions={<Button><Plus className="mr-1.5 h-4 w-4" /> Create project</Button>}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="group flex flex-col transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition group-hover:bg-neutral-900 group-hover:text-white">
                    <FolderKanban className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-semibold text-neutral-900">{project.name}</h2>
                    <p className="mt-0.5 text-sm text-neutral-500">{project.tasks} active tasks</p>
                  </div>
                </div>
                <Badge variant={statusVariant(project.status)}>{project.status}</Badge>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>Progress</span>
                  <span className="font-semibold text-neutral-700">{project.progress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-neutral-900 transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-2 border-t border-neutral-100 pt-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700 transition hover:bg-neutral-200"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md bg-rose-50 px-3 py-1.5 text-sm text-rose-600 transition hover:bg-rose-100"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
