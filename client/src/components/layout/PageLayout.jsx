import PlatformNavbar from './PlatformNavbar';
import Sidebar from './Sidebar';

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <PlatformNavbar />
      <main className="mx-auto max-w-6xl px-4 pt-20 md:pt-24 2xl:max-w-screen-xl">
        <div className="flex gap-x-7">
          <div className="hidden w-64 shrink-0 md:block">
            <Sidebar />
          </div>
          <div className="mb-20 min-w-0 flex-1">{children}</div>
        </div>
      </main>
    </div>
  );
}
