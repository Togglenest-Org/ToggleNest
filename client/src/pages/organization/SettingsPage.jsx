import { useState } from 'react';
import { Bell, Building2, Trash2 } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Separator from '../../components/ui/Separator';
import OrganizationInfo from '../../components/organization/OrganizationInfo';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { workspace } from '../../data/mockData';

export default function SettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: workspace.name,
    displayName: user?.name || 'Alex Morgan',
    email: user?.email || 'alex@example.com',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const toggleRow = 'flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3';

  return (
    <PageLayout>
      <div className="w-full">
        <OrganizationInfo />
        <Separator className="my-5" />

        <div className="max-w-2xl space-y-6 px-2 md:px-4">
          <Card>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
              <Building2 className="h-5 w-5 text-neutral-400" /> Workspace settings
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Update how your workspace appears to members.
            </p>
            <Separator className="my-5" />
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                label="Workspace name"
                name="name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                required
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Display name"
                  name="displayName"
                  value={form.displayName}
                  onChange={(event) => setForm({ ...form, displayName: event.target.value })}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  required
                />
              </div>
              <div className="flex items-center gap-3 pt-1">
                <Button type="submit">Save changes</Button>
                {saved ? (
                  <span className="animate-fade-in text-sm font-medium text-emerald-600">Saved ✓</span>
                ) : null}
              </div>
            </form>
          </Card>

          <Card>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900">
              <Bell className="h-5 w-5 text-neutral-400" /> Notifications
            </h2>
            <p className="mt-1 text-sm text-neutral-500">Choose what activity you want to hear about.</p>
            <Separator className="my-5" />
            <div className="space-y-3">
              <label className={toggleRow}>
                <div>
                  <p className="text-sm font-medium text-neutral-800">Card assignments</p>
                  <p className="text-xs text-neutral-500">When a card is assigned to you</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-neutral-900" />
              </label>
              <label className={toggleRow}>
                <div>
                  <p className="text-sm font-medium text-neutral-800">Due date reminders</p>
                  <p className="text-xs text-neutral-500">One day before a card is due</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-neutral-900" />
              </label>
              <label className={toggleRow}>
                <div>
                  <p className="text-sm font-medium text-neutral-800">Weekly digest</p>
                  <p className="text-xs text-neutral-500">A summary every Monday morning</p>
                </div>
                <input type="checkbox" className="h-4 w-4 accent-neutral-900" />
              </label>
            </div>
          </Card>

          <Card className="border-rose-200">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-rose-600">
              <Trash2 className="h-5 w-5" /> Danger zone
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Deleting this workspace removes all boards and cards. This action cannot be undone.
            </p>
            <div className="mt-5">
              <Button variant="destructive" className="w-full sm:w-auto">
                Delete workspace
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
