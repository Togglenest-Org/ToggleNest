import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Menu, X } from 'lucide-react';
import Logo from '../Logo';
import { buttonClassName } from '../ui/buttonClassName';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Product', href: '#product' },
  { label: 'Testimonials', href: '#testimonials' },
];

export default function MarketingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/login" className={buttonClassName({ size: 'sm', variant: 'ghost' })}>
            Login
          </Link>
          <Link to="/register" className={buttonClassName({ size: 'sm' })}>
            Get ToggleNest for free
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer noopener"
            className={buttonClassName({ size: 'icon', variant: 'ghost' })}
            aria-label="ToggleNest on GitHub"
          >
            <GitBranch className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-md p-2 text-neutral-700 transition hover:bg-neutral-100 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="animate-fade-in border-t border-neutral-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex gap-2">
              <Link to="/login" className={buttonClassName({ size: 'sm', variant: 'outline', className: 'flex-1' })}>
                Login
              </Link>
              <Link to="/register" className={buttonClassName({ size: 'sm', className: 'flex-1' })}>
                Get started
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
