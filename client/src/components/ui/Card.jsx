import { cn } from '../../lib/utils';

export default function Card({ title, children, className = '' }) {
  return (
    <div className={cn('rounded-lg border border-neutral-200 bg-white p-6 shadow-sm', className)}>
      {title ? <h3 className="mb-4 text-lg font-semibold text-neutral-900">{title}</h3> : null}
      {children}
    </div>
  );
}
