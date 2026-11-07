import { CreditCard } from 'lucide-react';
import { workspace } from '../../data/mockData';

export default function OrganizationInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="relative h-[60px] w-[60px] overflow-hidden rounded-lg ring-1 ring-neutral-200">
        <img
          src={workspace.imageUrl}
          alt={workspace.name}
          className="h-[60px] w-[60px] object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <div className="space-y-1">
        <p className="text-xl font-semibold tracking-tight text-neutral-900">{workspace.name}</p>
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <CreditCard className="h-3.5 w-3.5" />
          {workspace.isPro ? 'Pro plan' : 'Free plan'}
        </div>
      </div>
    </div>
  );
}
