import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Activity,
  CalendarClock,
  KanbanSquare,
  Layout,
  LayoutDashboard,
  Plus,
  Settings,
  Shield,
  User,
  CreditCard,
  FolderKanban,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { buttonClassName } from '../ui/buttonClassName';
import { workspace } from '../../data/mockData';

const workspaceRoutes = [
  { label: 'Boards', icon: Layout, path: '/organization', end: true },
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', end: true },
  { label: 'Projects', icon: FolderKanban, path: '/projects', end: true },
  { label: 'Tasks', icon: CalendarClock, path: '/tasks', end: true },
  { label: 'Kanban', icon: KanbanSquare, path: '/kanban', end: true },
  { label: 'Activity', icon: Activity, path: '/organization/activity', end: true },
];

const manageRoutes = [
  { label: 'Profile', icon: User, path: '/profile', end: true },
  { label: 'Settings', icon: Settings, path: '/organization/settings', end: true },
  { label: 'Billing', icon: CreditCard, path: '/organization/billing', end: true },
];

function SidebarLink({ route }) {
  const Icon = route.icon;
  return (
    <NavLink
      key={route.path}
      to={route.path}
      end={route.end}
      className={({ isActive }) =>
        cn(
          'group mb-1 flex w-full items-center justify-start rounded-md py-2 pl-3 pr-3 text-sm font-normal transition hover:bg-neutral-100',
          isActive ? 'bg-neutral-900/10 text-neutral-900' : 'text-neutral-700',
        )
      }
    >
      <Icon className="mr-2.5 h-4 w-4 shrink-0 text-neutral-400 transition group-hover:text-neutral-700" />
      {route.label}
    </NavLink>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      <div className="mb-2 flex items-center px-1 text-xs font-semibold uppercase tracking-wider text-neutral-400">
        <span>Workspaces</span>
        <button
          type="button"
          onClick={() => navigate('/organization')}
          className={cn(buttonClassName({ size: 'icon', variant: 'ghost' }), 'ml-auto h-7 w-7')}
          aria-label="Create workspace"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="flex w-full items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 transition hover:bg-neutral-500/10"
        >
          <img src={workspace.imageUrl} alt={workspace.name} className="h-7 w-7 rounded-sm object-cover" />
          <span className="text-sm font-medium">{workspace.name}</span>
        </button>

        {expanded ? (
          <div className="pt-1">
            <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Workspace
            </p>
            <div className="space-y-0.5">
              {workspaceRoutes.map((route) => (
                <SidebarLink key={route.path} route={route} />
              ))}
            </div>

            <div className="mt-4 border-t border-neutral-200 pt-3">
              <p className="mb-1 flex items-center gap-1 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                <Shield className="h-3 w-3" /> Manage
              </p>
              <div className="space-y-0.5">
                {manageRoutes.map((route) => (
                  <SidebarLink key={route.path} route={route} />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
