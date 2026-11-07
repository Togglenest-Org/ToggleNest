import { useSearchParams } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import OrganizationInfo from '../../components/organization/OrganizationInfo';
import BoardList from '../../components/organization/BoardList';
import Separator from '../../components/ui/Separator';

export default function BoardsPage() {
  const [searchParams] = useSearchParams();

  return (
    <PageLayout>
      <div className="w-full">
        <OrganizationInfo />
        <Separator className="my-4" />
        <div className="px-2 md:px-4">
          <BoardList key={searchParams.get('create') || 'default'} />
        </div>
      </div>
    </PageLayout>
  );
}
