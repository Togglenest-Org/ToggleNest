import { CheckSquare, Pencil, Plus, Trash2 } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { teamTasks, teamMembers } from '../../data/mockData';

const priorityVariant = (priority) => {
  if (priority === 'High') return 'danger';
  if (priority === 'Medium') return 'warning';
  return 'default';
};

const avatarFor = (name) => {
  const member = teamMembers.find((item) => item.name === name);
  return member?.avatar;
};

export default function TasksPage() {
  return (
    <PageLayout>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Tasks"
          title="Team backlog"
          description="A shared list of everything the team needs to get done."
          actions={<Button><Plus className="mr-1.5 h-4 w-4" /> Create task</Button>}
        />

        <div className="grid gap-4 xl:grid-cols-2">
          {teamTasks.map((task) => (
            <Card key={task.id} className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-neutral-200 text-neutral-300 transition hover:border-neutral-400 hover:text-neutral-600">
                    <CheckSquare className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <h2 className="font-semibold text-neutral-900">{task.title}</h2>
                    <p className="mt-1 text-sm text-neutral-500">
                      Due <span className="font-medium text-neutral-700">{task.due}</span>
                    </p>
                  </div>
                </div>
                <Badge variant={priorityVariant(task.priority)}>{task.priority}</Badge>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
                <div className="flex items-center gap-2">
                  <img
                    src={avatarFor(task.assignee)}
                    alt={task.assignee}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <span className="text-sm text-neutral-500">Assigned to {task.assignee}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2.5 py-1.5 text-xs text-neutral-700 transition hover:bg-neutral-200"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2.5 py-1.5 text-xs text-rose-600 transition hover:bg-rose-100"
                  >
                    <Trash2 className="h-3 w-3" /> Delete
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
