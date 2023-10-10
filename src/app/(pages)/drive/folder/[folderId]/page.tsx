import React from "react";

const FolderPage = ({ params }: { params: { folderId: string } }) => {
  return <div>FolderPage: {params.folderId}</div>;
};

export default FolderPage;
