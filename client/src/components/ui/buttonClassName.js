import { cn } from '../../lib/utils';

export const variants = {
  default: 'bg-neutral-900 text-neutral-50 hover:bg-neutral-800',
  outline: 'border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50',
  secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
  ghost: 'hover:bg-neutral-100 hover:text-neutral-900',
  primary: 'bg-sky-700 text-white hover:bg-sky-600',
  transparent: 'bg-transparent text-white hover:bg-white/20',
  gray: 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
};

export const sizes = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
  inline: 'h-auto px-2 py-1.5 text-sm',
};

export function buttonClassName({ variant = 'default', size = 'default', className = '' } = {}) {
  return cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  );
}
