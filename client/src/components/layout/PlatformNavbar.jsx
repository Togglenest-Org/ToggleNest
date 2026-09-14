import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Activity,
  CalendarClock,
  FolderKanban,
  KanbanSquare,
  Layout,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Settings,
  User,
  X,
} from 'lucide-react';
import Logo from '../Logo';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { workspace } from '../../data/mockData';
import { cn } from '../../lib/utils';

const navLinks = [
  { label: 'Boards', icon: Layout, to: '/organization' },
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Projects', icon: FolderKanban, to: '/projects' },
  { label: 'Tasks', icon: CalendarClock, to: '/tasks' },
  { label: 'Kanban', icon: KanbanSquare, to: '/kanban' },
  { label: 'Activity', icon: Activity, to: '/organization/activity' },
  { label: 'Profile', icon: User, to: '/profile' },
  { label: 'Settings', icon: Settings, to: '/organization/settings' },
];

export default function PlatformNavbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/');
  };

  const handleCreate = () => {
    setMenuOpen(false);
    navigate('/organization');
  };

  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b border-neutral-200 bg-white px-4 shadow-sm">
      <div className="flex items-center gap-x-3">
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="rounded-md p-2 text-neutral-700 transition hover:bg-neutral-100 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden md:block">
          <Logo />
        </div>

        <Button
          size="sm"
          onClick={handleCreate}
          className="h-auto rounded-sm px-2 py-1.5 md:flex md:gap-x-1"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden md:block">Create</span>
        </Button>
      </div>

      <div className="ml-auto flex items-center gap-x-2">
        <div className="hidden items-center gap-x-2 rounded-md border border-neutral-200 px-3 py-1.5 text-sm lg:flex">
          <img
            src={workspace.imageUrl}
            alt="Workspace"
            className="h-6 w-6 rounded-sm object-cover"
          />
          <span className="font-medium text-neutral-700">{workspace.name}</span>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white ring-2 ring-transparent transition hover:ring-neutral-200">
          {user?.name?.charAt(0) || 'U'}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="hidden items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900 md:inline-flex"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen ? (
        <div className="animate-fade-in absolute left-0 right-0 top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto border-b border-neutral-200 bg-white px-4 py-4 shadow-lg md:hidden">
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-neutral-50 px-3 py-2.5">
            <img src={workspace.imageUrl} alt={workspace.name} className="h-7 w-7 rounded-sm object-cover" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-neutral-900">{workspace.name}</p>
              <p className="text-xs text-neutral-500">{user?.email || 'Workspace'}</p>
            </div>
          </div>

          <div className="space-y-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition',
                      isActive ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100',
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          <div className="mt-3 border-t border-neutral-200 pt-3">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
