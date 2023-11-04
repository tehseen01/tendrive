"use client";

import Files from "@/components/Files";
import Folders from "@/components/Folders";
import { useAppSelector } from "@/hooks/hooks";
import React from "react";

const SearchPage = () => {
  const { searchFiles, searchFolders } = useAppSelector(
    (state) => state.common
  );

  return (
    <div className="p-4 pb-24 overflow-y-auto h-full">
      {searchFolders && searchFolders.total !== 0 && (
        <Folders data={searchFolders} />
      )}

      {searchFiles && searchFiles.total !== 0 && (
        <Files filesData={searchFiles} />
      )}

      {!searchFolders?.total && !searchFiles?.total && (
        <div className="flex items-center justify-center flex-col h-[calc(100%_-_100px)]">
          <h2 className="text-2xl font-semibold text-center">
            None of your files or folders matched this search
          </h2>
          <p>Try another search</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
