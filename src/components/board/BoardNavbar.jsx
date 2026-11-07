import { Link } from 'react-router-dom';
import { MoreHorizontal, Share2, Star } from 'lucide-react';
import Button from '../ui/Button';

export default function BoardNavbar({ board }) {
  return (
    <div className="fixed top-14 z-40 flex h-14 w-full items-center gap-x-3 bg-black/50 px-4 text-white backdrop-blur-sm md:px-6">
      <Link
        to="/organization"
        className="hidden items-center rounded-md bg-black/30 px-3 py-1.5 text-sm font-medium transition hover:bg-black/50 sm:inline-flex"
      >
        All boards
      </Link>

      <h1 className="truncate text-lg font-semibold">{board.title}</h1>

      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 transition hover:bg-white/20 hover:text-white"
        aria-label="Star board"
      >
        <Star className="h-4 w-4" />
      </button>

      <div className="ml-auto flex items-center gap-x-2">
        <Button size="sm" variant="transparent" className="rounded-md">
          <Share2 className="mr-1.5 h-4 w-4" />
          Share
        </Button>
        <Button size="sm" variant="transparent" className="rounded-md">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
