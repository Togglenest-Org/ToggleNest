import { Link, Navigate } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  GripVertical,
  KanbanSquare,
  Medal,
  Plus,
  Users,
  Zap,
} from 'lucide-react';
import MarketingLayout from '../../components/layout/MarketingLayout';
import { buttonClassName } from '../../components/ui/buttonClassName';
import { useAuth } from '../../context/AuthContext';

function MiniCard({ title, accent = 'bg-neutral-200' }) {
  return (
    <div className="group flex items-start gap-2 rounded-md border border-neutral-200 bg-white p-2.5 shadow-sm transition hover:border-neutral-300 hover:shadow">
      <GripVertical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-300" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-neutral-800">{title}</p>
        <div className="mt-2 flex items-center gap-1.5">
          <span className={`h-2 w-2 rounded-full ${accent}`} />
          <span className="h-1.5 flex-1 rounded-full bg-neutral-100" />
        </div>
      </div>
    </div>
  );
}

function MiniList({ title, count, cards }) {
  return (
    <div className="w-[168px] shrink-0 rounded-lg bg-neutral-100 p-2">
      <div className="mb-2 flex items-center justify-between px-1">
        <p className="text-xs font-semibold text-neutral-700">{title}</p>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200 text-[10px] font-semibold text-neutral-500">
          {count}
        </span>
      </div>
      <div className="space-y-2">{cards}</div>
    </div>
  );
}

function ProductMockup() {
  return (
    <div className="animate-fade-in-up relative mx-auto mt-16 w-full max-w-4xl" style={{ animationDelay: '250ms' }}>
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-tr from-cyan-200/50 via-transparent to-orange-200/50 blur-2xl" />

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-900/10">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-neutral-200 bg-neutral-50 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-300" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-300" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-neutral-400 ring-1 ring-neutral-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            app.togglenest.com
          </div>
          <div className="hidden h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white sm:flex">
            AM
          </div>
        </div>

        {/* Board */}
        <div className="bg-gradient-to-br from-sky-500 to-indigo-600 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-black/20 text-white">
                <KanbanSquare className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Product Roadmap</p>
                <p className="text-[11px] text-white/70">Product Team workspace</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1.5 rounded-md bg-black/20 px-2 py-1 text-[11px] font-medium text-white sm:flex">
                <Users className="h-3 w-3" /> 12 members
              </div>
              <span className="rounded-md bg-white px-2 py-1 text-[11px] font-semibold text-indigo-600">Share</span>
            </div>
          </div>

          <div className="flex gap-3 overflow-hidden">
            <MiniList
              title="To Do"
              count={3}
              cards={
                <>
                  <MiniCard title="Scope the dashboard" accent="bg-cyan-400" />
                  <MiniCard title="Gather team feedback" accent="bg-amber-400" />
                </>
              }
            />
            <MiniList
              title="In Progress"
              count={2}
              cards={<MiniCard title="Update project roadmap" accent="bg-violet-400" />}
            />
            <MiniList
              title="Done"
              count={4}
              cards={<MiniCard title="Finalize onboarding copy" accent="bg-emerald-400" />}
            />
            <div className="flex h-14 w-[168px] shrink-0 items-center justify-center rounded-lg bg-black/20 text-sm font-medium text-white transition hover:bg-black/30">
              <Plus className="mr-1.5 h-4 w-4" /> Add a list
            </div>
          </div>
        </div>
      </div>

      {/* Floating stat chips */}
      <div className="animate-fade-in-up absolute -left-4 top-1/3 hidden rounded-xl border border-neutral-200 bg-white p-3 shadow-xl shadow-neutral-900/10 lg:block" style={{ animationDelay: '350ms' }}>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
            <Zap className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-neutral-900">95% velocity</p>
            <p className="text-[11px] text-neutral-500">Above sprint target</p>
          </div>
        </div>
      </div>
      <div className="animate-fade-in-up absolute -right-4 top-1/4 hidden rounded-xl border border-neutral-200 bg-white p-3 shadow-xl shadow-neutral-900/10 lg:block" style={{ animationDelay: '500ms' }}>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
            <Check className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-neutral-900">27 tasks done</p>
            <p className="text-[11px] text-neutral-500">This week</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/organization" replace />;
  }

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-16 md:pt-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700">
            <Medal className="h-4 w-4" />
            No. 1 task management platform
          </div>

          <h1 className="animate-fade-in-up mt-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl" style={{ animationDelay: '50ms' }}>
            ToggleNest helps your team{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-orange-500 bg-clip-text text-transparent">
              move work forward
            </span>
          </h1>

          <p className="animate-fade-in-up mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg" style={{ animationDelay: '100ms' }}>
            Collaborate, manage projects, and reach new productivity peaks. From high rises to home
            offices — accomplish it all with ToggleNest.
          </p>

          <div className="animate-fade-in-up mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: '150ms' }}>
            <Link to="/login" className={buttonClassName({ size: 'lg', variant: 'outline', className: 'w-full sm:w-auto' })}>
              Sign In
            </Link>
            <Link to="/register" className={buttonClassName({ size: 'lg', className: 'w-full sm:w-auto' })}>
              Sign Up
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <p className="animate-fade-in-up mt-5 text-xs text-neutral-400" style={{ animationDelay: '200ms' }}>
            Free forever · No credit card required · Set up in minutes
          </p>
        </div>

        <ProductMockup />
      </section>
    </MarketingLayout>
  );
}
