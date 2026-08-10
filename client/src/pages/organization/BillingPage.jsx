import { Check, CreditCard, Crown, X } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Separator from '../../components/ui/Separator';
import OrganizationInfo from '../../components/organization/OrganizationInfo';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { workspace, boards, MAX_FREE_BOARDS } from '../../data/mockData';

const invoices = [
  { id: 'INV-0021', date: 'Aug 1, 2026', amount: '$0.00', status: 'Paid' },
  { id: 'INV-0020', date: 'Jul 1, 2026', amount: '$0.00', status: 'Paid' },
  { id: 'INV-0019', date: 'Jun 1, 2026', amount: '$0.00', status: 'Paid' },
];

export default function BillingPage() {
  const boardsLeft = Math.max(0, MAX_FREE_BOARDS - boards.length);

  return (
    <PageLayout>
      <div className="w-full">
        <OrganizationInfo />
        <Separator className="my-5" />

        <div className="space-y-6 px-2 md:px-4">
          <div className="max-w-2xl">
            <h2 className="text-lg font-semibold text-neutral-900">Billing</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Manage your plan, payment method, and invoices.
            </p>
          </div>

          {/* Current plan */}
          <div className="relative max-w-2xl overflow-hidden rounded-lg bg-neutral-900 p-6 text-white shadow-lg">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-amber-400" />
                  <p className="text-lg font-semibold">ToggleNest Free</p>
                  <Badge variant="warning" className="bg-white/10 text-amber-300">Current plan</Badge>
                </div>
                <p className="mt-2 text-sm text-neutral-300">
                  {workspace.isPro
                    ? 'You are on ToggleNest Pro with unlimited boards.'
                    : `You have ${boardsLeft} of ${MAX_FREE_BOARDS} free boards available.`}
                </p>
              </div>
              {!workspace.isPro ? (
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-orange-500 text-white hover:opacity-90"
                  size="lg"
                >
                  Upgrade to Pro — $8/mo
                </Button>
              ) : null}
            </div>

            <div className="relative mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-orange-400"
                style={{ width: `${Math.min(100, (boards.length / MAX_FREE_BOARDS) * 100)}%` }}
              />
            </div>
            <p className="relative mt-2 text-xs text-neutral-400">
              {boards.length} of {MAX_FREE_BOARDS} free boards in use
            </p>
          </div>

          {/* Feature comparison */}
          <div className="max-w-2xl">
            <Card className="overflow-hidden p-0">
              <div className="grid grid-cols-3 border-b border-neutral-200 bg-neutral-50 px-6 py-4 text-sm font-semibold text-neutral-700">
                <span>Features</span>
                <span className="text-center">Free</span>
                <span className="text-center">Pro</span>
              </div>
              {[
                { label: 'Open boards', free: '5', pro: 'Unlimited' },
                { label: 'Cards', free: 'Unlimited', pro: 'Unlimited' },
                { label: 'Activity history', free: 'Basic', pro: 'Full' },
                { label: 'Automation', free: <X className="mx-auto h-4 w-4 text-neutral-300" />, pro: <Check className="mx-auto h-4 w-4 text-emerald-500" /> },
                { label: 'Priority support', free: <X className="mx-auto h-4 w-4 text-neutral-300" />, pro: <Check className="mx-auto h-4 w-4 text-emerald-500" /> },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-3 border-b border-neutral-100 px-6 py-3.5 text-sm last:border-0">
                  <span className="font-medium text-neutral-800">{row.label}</span>
                  <span className="text-center text-neutral-500">{row.free}</span>
                  <span className="text-center text-neutral-500">{row.pro}</span>
                </div>
              ))}
            </Card>
          </div>

          {/* Payment method */}
          <div className="max-w-2xl">
            <Card>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
                <CreditCard className="h-5 w-5 text-neutral-400" /> Payment method
              </h3>
              <p className="mt-1 text-sm text-neutral-500">No card on file — you are on the free plan.</p>
            </Card>
          </div>

          {/* Invoice history */}
          <div className="max-w-2xl">
            <Card>
              <h3 className="text-lg font-semibold text-neutral-900">Invoice history</h3>
              <Separator className="my-4" />
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 transition hover:border-neutral-300"
                  >
                    <div>
                      <p className="text-sm font-medium text-neutral-800">{invoice.id}</p>
                      <p className="text-xs text-neutral-500">{invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-neutral-700">{invoice.amount}</span>
                      <Badge variant="success">{invoice.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
