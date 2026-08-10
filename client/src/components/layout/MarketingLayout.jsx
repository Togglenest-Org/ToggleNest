import MarketingNavbar from './MarketingNavbar';
import MarketingFooter from './MarketingFooter';

export default function MarketingLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <MarketingNavbar />
      <main className="flex-1 pt-14">{children}</main>
      <MarketingFooter />
    </div>
  );
}
