import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Logo({ className }) {
  return (
    <Link to="/" className={cn('flex items-center gap-x-2 transition hover:opacity-75', className)}>
      <img src="/logo.svg" alt="ToggleNest logo" height={30} width={30} className="h-[30px] w-[30px]" />
      <p className="font-heading pb-1 text-lg text-neutral-700">ToggleNest</p>
    </Link>
  );
}
