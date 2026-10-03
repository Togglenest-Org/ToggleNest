import { useState } from 'react';
import { Camera, Mail, Shield, UserRound } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Separator from '../../components/ui/Separator';
import { currentUser, workspace } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const details = [
  { icon: UserRound, label: 'Name', value: currentUser.name },
  { icon: Mail, label: 'Email', value: currentUser.email },
  { icon: Shield, label: 'Role', value: currentUser.role },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || currentUser.name,
    email: user?.email || currentUser.email,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <PageLayout>
      <div className="space-y-8">
        <PageHeader
          eyebrow="Profile"
          title="Account settings"
          description="Manage your personal details and preferences."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="flex flex-col items-center py-10 text-center">
            <div className="group relative">
              <img
                src={currentUser.imageUrl}
                alt={currentUser.name}
                className="h-28 w-28 rounded-full object-cover ring-4 ring-neutral-100"
              />
              <button
                type="button"
                className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md transition hover:bg-neutral-700"
                aria-label="Change avatar"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h2 className="mt-5 text-xl font-semibold text-neutral-900">{currentUser.name}</h2>
            <p className="mt-1 text-sm text-neutral-500">{currentUser.role}</p>
            <Badge className="mt-3 bg-neutral-100 text-neutral-600">{workspace.name} workspace</Badge>

            <div className="mt-8 w-full space-y-4 border-t border-neutral-100 pt-6">
              {details.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-neutral-500">
                      <Icon className="h-4 w-4 text-neutral-400" /> {item.label}
                    </span>
                    <span className="font-medium text-neutral-800">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-neutral-900">Edit details</h3>
            <p className="mt-1 text-sm text-neutral-500">Changes are saved to your workspace account.</p>
            <Separator className="my-5" />
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                label="Display name"
                name="name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
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
              <div className="flex items-center gap-3 pt-2">
                <Button type="submit">Save changes</Button>
                {saved ? (
                  <span className="animate-fade-in text-sm font-medium text-emerald-600">Saved ✓</span>
                ) : null}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
