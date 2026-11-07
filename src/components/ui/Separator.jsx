import { cn } from '../../lib/utils';

export default function Separator({ className = '' }) {
  return <div className={cn('shrink-0 bg-neutral-200 h-[1px] w-full', className)} />;
}
