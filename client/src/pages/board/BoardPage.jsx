import { Navigate, useParams } from 'react-router-dom';
import PlatformNavbar from '../../components/layout/PlatformNavbar';
import BoardNavbar from '../../components/board/BoardNavbar';
import ListContainer from '../../components/board/ListContainer';
import { boards, initialBoardLists } from '../../data/mockData';

export default function BoardPage() {
  const { boardId } = useParams();
  const board = boards.find((item) => item.id === boardId);
  const lists = initialBoardLists[boardId];

  if (!board) {
    return <Navigate to="/organization" replace />;
  }

  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
    >
      <PlatformNavbar />
      <BoardNavbar board={board} />
      <div aria-hidden className="absolute inset-0 bg-black/10" />
      <main className="relative h-full min-h-screen overflow-x-auto pt-28">
        <div className="h-full p-4">
          <ListContainer key={boardId} initialLists={lists || []} />
        </div>
      </main>
    </div>
  );
}
