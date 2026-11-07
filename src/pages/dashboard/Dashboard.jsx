import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock3, FolderKanban, Layout, ListTodo } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../services/projectService';
import taskService from '../../services/taskService';

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString();
};

const getDaysUntil = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return Math.ceil((date - today) / 86400000);
};

const quickActions = [
  { label: 'Create a project', to: '/projects' },
  { label: 'Create a task', to: '/tasks' },
  { label: 'Open Kanban board', to: '/kanban' },
];

export default function Dashboard() {
  const { token, user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(Boolean(token));
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    if (!token) return () => { active = false; };

    const loadDashboard = async () => {
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

    loadDashboard();
    return () => { active = false; };
  }, [token]);

  const openTasks = tasks.filter((task) => task.column !== 'Done');
  const completedTasks = tasks.length - openTasks.length;
  const dueSoon = useMemo(
    () => openTasks
      .filter((task) => {
        const days = task.dueDate ? getDaysUntil(task.dueDate) : null;
        return days !== null && days >= 0 && days <= 7;
      })
      .sort((left, right) => new Date(left.dueDate) - new Date(right.dueDate)),
    [openTasks],
  );
  const completion = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const firstProject = projects[0];
  const pageError = error || (!token ? 'Sign in to view your dashboard.' : '');

  const stats = [
    { title: 'Projects', value: projects.length, detail: 'Projects you can access', icon: FolderKanban },
    { title: 'Open tasks', value: openTasks.length, detail: 'Tasks not marked Done', icon: ListTodo },
    { title: 'Completed tasks', value: completedTasks, detail: 'Tasks marked Done', icon: CheckCircle2 },
    { title: 'Due in 7 days', value: dueSoon.length, detail: 'Upcoming task deadlines', icon: Clock3 },
  ];

  return (
    <PageLayout>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Dashboard"
          title={`Good to see you, ${user?.name?.split(' ')[0] || 'there'}`}
          description="A live overview of your projects and tasks."
          actions={<Badge variant="info">Workspace overview</Badge>}
        />

        {pageError ? <p role="alert" className="rounded-md bg-rose-50 px-4 py-3 text-sm text-rose-700">{pageError}</p> : null}

        {loading ? (
          <p role="status" className="py-8 text-sm text-neutral-500">Loading your dashboard…</p>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title} className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-start justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{stat.title}</p>
                      <Icon className="h-4 w-4 text-neutral-400" />
                    </div>
                    <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">{stat.value}</p>
                    <p className="mt-2 text-sm text-neutral-500">{stat.detail}</p>
                  </Card>
                );
              })}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <Card title="Your project boards">
                {projects.length ? (
                  <div className="space-y-2">
                    {projects.slice(0, 5).map((project) => (
                      <Link
                        key={project._id}
                        to={`/kanban?projectId=${encodeURIComponent(project._id)}`}
                        className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 px-4 py-3 text-sm transition hover:border-neutral-300 hover:bg-neutral-50"
                      >
                        <span className="flex min-w-0 items-center gap-2.5">
                          <FolderKanban className="h-4 w-4 shrink-0 text-neutral-400" />
                          <span className="truncate font-medium text-neutral-800">{project.title}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400" />
                      </Link>
                    ))}
                    <Link to="/organization" className="inline-flex items-center gap-1 pt-2 text-sm font-medium text-neutral-700 hover:text-neutral-900">
                      View all projects <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50 px-6 text-center">
                    <Layout className="h-7 w-7 text-neutral-400" />
                    <p className="mt-3 text-sm text-neutral-600">Create a project to organize tasks on a board.</p>
                    <Link to="/projects" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-neutral-800 hover:text-neutral-500">
                      Create a project <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </Card>

              <div className="space-y-6">
                <Card title="Upcoming deadlines">
                  {dueSoon.length ? (
                    <div className="space-y-3">
                      {dueSoon.slice(0, 5).map((task) => {
                        const days = getDaysUntil(task.dueDate);
                        return (
                          <div key={task._id} className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 p-3">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-neutral-800">{task.title}</p>
                              <p className="mt-0.5 truncate text-xs text-neutral-500">{task.project?.title || 'Project'} · {formatDate(task.dueDate)}</p>
                            </div>
                            <Badge variant={days === 0 ? 'danger' : days <= 2 ? 'warning' : 'default'}>
                              {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `${days} days`}
                            </Badge>
                          </div>
                        );
                      })}
                      <Link to="/tasks" className="inline-flex items-center gap-1 pt-1 text-sm font-medium text-neutral-700 hover:text-neutral-900">
                        View tasks <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <p className="py-8 text-center text-sm text-neutral-500">No tasks due in the next 7 days.</p>
                  )}
                </Card>

                <Card title="Quick actions">
                  <div className="space-y-2.5">
                    {quickActions.map((action) => (
                      <Link
                        key={action.label}
                        to={action.to}
                        className="flex w-full items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50"
                      >
                        {action.label}
                        <ArrowRight className="h-4 w-4 text-neutral-400" />
                      </Link>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 rounded-lg bg-neutral-900 p-6 text-white sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <p className="font-semibold">{completion}% of your tasks are complete</p>
                  <p className="mt-1 text-sm text-neutral-300">
                    {tasks.length ? `${completedTasks} of ${tasks.length} tasks marked Done.` : 'Create your first task to start tracking progress.'}
                  </p>
                </div>
              </div>
              <Link to={firstProject ? `/kanban?projectId=${encodeURIComponent(firstProject._id)}` : '/projects'}>
                <Button variant="transparent" size="sm" className="border border-white/30 hover:bg-white/10">
                  {firstProject ? 'Open project board' : 'Create a project'} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
