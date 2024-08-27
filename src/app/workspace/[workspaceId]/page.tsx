interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = ({ params }: WorkspaceIdPageProps) => {
  return <div>WorkspaceIdPage {params.workspaceId}</div>;
};

export default WorkspaceIdPage;
