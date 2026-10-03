import { cn } from '../../lib/utils';

export default function Input({ label, className = '', ...props }) {
  return (
    <label className="block text-sm font-medium text-neutral-700">
      {label ? <span className="mb-2 block">{label}</span> : null}
      <input
        className={cn(
          'flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    </label>
  );
}
