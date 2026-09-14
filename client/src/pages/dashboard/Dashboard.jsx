import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock3, History } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { dashboardStats, recentActivity, upcomingDeadlines, currentUser } from '../../data/mockData';

const quickActions = [
  { label: 'Create project', to: '/projects' },
  { label: 'Add team member', to: '/organization/settings' },
  { label: 'Review overdue tasks', to: '/tasks' },
];

export default function Dashboard() {
  return (
    <PageLayout>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Welcome back"
          title={`Good to see you, ${currentUser.name.split(' ')[0]} 👋`}
          description="Here's what's happening across your workspace today."
          actions={<Badge variant="success">Focused sprint</Badge>}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <Card key={stat.title} className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{stat.title}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">{stat.value}</p>
              <p className="mt-2 text-sm text-neutral-500">{stat.detail}</p>
              <p className="mt-2 text-xs font-medium text-emerald-600">{stat.delta}</p>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card title="Recent activity">
            {recentActivity.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50 py-10 text-center">
                <History className="h-6 w-6 text-neutral-300" />
                <p className="mt-2 text-sm font-medium text-neutral-600">No activity yet</p>
                <p className="mt-0.5 text-xs text-neutral-400">Recent activity will appear here.</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {recentActivity.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 rounded-lg bg-neutral-50 p-4 transition hover:bg-neutral-100"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white">
                        {item.member.charAt(0)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-neutral-700">{item.text}</p>
                        <p className="mt-0.5 text-xs text-neutral-400">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    to="/organization/activity"
                    className="inline-flex items-center gap-1 text-sm font-medium text-neutral-700 transition hover:text-neutral-900"
                  >
                    View all activity <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </>
            )}
          </Card>

          <div className="space-y-6">
            <Card title="Upcoming deadlines">
              <div className="space-y-3">
                {upcomingDeadlines.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 p-3 transition hover:border-neutral-300"
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock3 className="h-4 w-4 shrink-0 text-neutral-400" />
                      <span className="text-sm text-neutral-700">{task.title}</span>
                    </div>
                    <Badge variant={task.priority === 'High' ? 'danger' : task.priority === 'Medium' ? 'warning' : 'default'}>
                      {task.due}
                    </Badge>
                  </div>
                ))}
              </div>
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
              <p className="font-semibold">Sprint goal is 84% complete</p>
              <p className="mt-1 text-sm text-neutral-300">Three tasks remain — keep the momentum going.</p>
            </div>
          </div>
          <Link to="/kanban">
            <Button variant="transparent" size="sm" className="border border-white/30 hover:bg-white/10">
              Open sprint board <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
