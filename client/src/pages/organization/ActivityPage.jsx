import { History } from 'lucide-react';
import PageLayout from '../../components/layout/PageLayout';
import Separator from '../../components/ui/Separator';
import OrganizationInfo from '../../components/organization/OrganizationInfo';
import { activityLog, teamMembers } from '../../data/mockData';

const avatarFor = (name) => {
  const member = teamMembers.find((item) => item.name === name);
  return member?.avatar;
};

export default function ActivityPage() {
  return (
    <PageLayout>
      <div className="w-full">
        <OrganizationInfo />
        <Separator className="my-5" />

        <div className="px-2 md:px-4">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-900">
            <History className="h-5 w-5 text-neutral-400" />
            Organization activity
          </h2>

          {activityLog.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50 py-16 text-center">
              <History className="h-8 w-8 text-neutral-300" />
              <p className="mt-3 text-sm font-medium text-neutral-600">No activity yet</p>
              <p className="mt-1 text-xs text-neutral-400">Activity will appear here as your team works.</p>
            </div>
          ) : (
            <div className="relative space-y-3 pl-6">
              <div aria-hidden className="absolute bottom-2 left-[13px] top-2 w-px bg-neutral-200" />
              {activityLog.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
                >
                  <span className="absolute -left-6 top-6 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-neutral-900 ring-1 ring-neutral-200 transition group-hover:bg-neutral-700" />
                  <img
                    src={avatarFor(item.member)}
                    alt={item.member}
                    className="mt-0.5 h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-neutral-800">{item.text}</p>
                    <p className="mt-1 text-xs text-neutral-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
