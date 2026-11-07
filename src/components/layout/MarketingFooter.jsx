import { Link } from 'react-router-dom';
import Logo from '../Logo';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Boards', to: '/organization' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#features' },
      { label: 'Blog', href: '#features' },
      { label: 'Careers', href: '#features' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help center', href: '#features' },
      { label: 'Community', href: '#features' },
      { label: 'Contact', href: '#features' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/login' },
      { label: 'Terms of Service', to: '/login' },
    ],
  },
];

export default function MarketingFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
              The simple, flexible way to organize projects and move work forward with your team.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-neutral-900">{column.title}</p>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} className="text-sm text-neutral-500 transition hover:text-neutral-900">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-sm text-neutral-500 transition hover:text-neutral-900">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-neutral-200 pt-6 sm:flex-row">
          <p className="text-xs text-neutral-400">© 2026 ToggleNest. All rights reserved.</p>
          <p className="text-xs text-neutral-400">Made for teams that move work forward.</p>
        </div>
      </div>
    </footer>
  );
}
