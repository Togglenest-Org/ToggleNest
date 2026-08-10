import { Link } from 'react-router-dom';
import { HelpCircle, Plus, User2 } from 'lucide-react';
import { boards, MAX_FREE_BOARDS, workspace } from '../../data/mockData';

export default function BoardList() {
  const remainingBoards = MAX_FREE_BOARDS - boards.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-900">
        <User2 className="mr-2 h-6 w-6 text-neutral-500" />
        Your boards
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            to={`/board/${board.id}`}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="group relative aspect-video h-full w-full overflow-hidden rounded-md bg-sky-700 bg-cover bg-center bg-no-repeat p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div aria-hidden className="absolute inset-0 bg-black/30 transition duration-200 group-hover:bg-black/45" />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-16 translate-y-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100"
            />
            <p className="relative font-semibold text-white drop-shadow">{board.title}</p>
          </Link>
        ))}

        <button
          type="button"
          className="group relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1.5 rounded-md border border-dashed border-neutral-300 bg-neutral-50 transition duration-200 hover:border-neutral-400 hover:bg-neutral-100"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-500 shadow-sm transition group-hover:bg-neutral-900 group-hover:text-white">
            <Plus className="h-5 w-5" />
          </span>
          <p className="text-sm font-medium text-neutral-700">Create new board</p>
          <span className="text-xs text-neutral-400">
            {workspace.isPro ? 'Unlimited' : `${remainingBoards} remaining`}
          </span>
          <span
            title="Free workspaces can have up to 5 open boards. For unlimited boards, please upgrade this workspace."
            className="absolute bottom-2 right-2 text-neutral-400"
          >
            <HelpCircle className="h-[14px] w-[14px]" />
          </span>
        </button>
      </div>
    </div>
  );
}
