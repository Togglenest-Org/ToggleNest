import { cn } from '../../lib/utils';
import { buttonClassName, sizes, variants } from './buttonClassName';

export default function Button({
  children,
  className = '',
  variant = 'default',
  size = 'default',
  ...props
}) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
