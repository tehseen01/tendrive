"use client";

import React, { useEffect, useState } from "react";
import Icon from "./Icon";
import { Input } from "./ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import service from "@/appwrite/services";
import conf from "@/lib/conf";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setSearchFiles, setSearchFolders } from "@/redux/commonSlice";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SearchState = { search: string };

const Search = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [focus, setFocus] = useState(false);

  const { user } = useAppSelector((state) => state.user);
  const { searchFiles, searchFolders, mobileSearchBar } = useAppSelector(
    (state) => state.common
  );

  const { register, handleSubmit, watch } = useForm<SearchState>();
  const search = watch("search");
  const onSubmit: SubmitHandler<SearchState> = async (data) => {
    try {
      router.push(`/drive/search?q=${data.search}`);
      setFocus(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  const debounce = useDebounce(search, 500);

  useEffect(() => {
    const searchFilter = async () => {
      try {
        if (user) {
          if (debounce && debounce.length !== 0) {
            const searchFilesData = await service.searchFilter({
              collectionId: conf.appwriteFileCollectionId,
              query: debounce,
              userId: user.$id,
            });

            const searchFoldersData = await service.searchFilter({
              collectionId: conf.appwriteFolderCollectionId,
              query: debounce,
              userId: user.$id,
            });

            dispatch(setSearchFiles(searchFilesData));
            dispatch(setSearchFolders(searchFoldersData));
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    searchFilter();
  }, [debounce, user, dispatch]);

  useEffect(() => {
    function handleClick() {
      setFocus(false);
    }

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <form
      className={cn(
        mobileSearchBar ? "max-md:flex" : "max-md:hidden",
        "flex relative basis-1/2"
      )}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Icon name="search" className="absolute left-2 top-2" strokeWidth={1.5} />
      <Input
        {...register("search", { required: true })}
        placeholder="Search here..."
        className="pl-10"
        onFocus={() => setFocus(true)}
        onClick={(e) => e.stopPropagation()}
      />
      {focus && (
        <>
          {(searchFiles && searchFiles.total !== 0) ||
          (searchFolders && searchFolders.total !== 0) ? (
            <div className="absolute left-0 w-full bg-white p-2 shadow-lg top-12 rounded-md">
              {searchFiles &&
                searchFiles.total !== 0 &&
                searchFiles.documents.map((file) => (
                  <div
                    key={file.$id}
                    className="flex items-center justify-between p-1 hover:bg-gray-100 rounded-md cursor-pointer"
                  >
                    <div className="flex items-center">
                      <span className="text-sm mr-2">
                        <Icon name="file" strokeWidth={1.5} />
                      </span>
                      <span>{file.name}</span>
                    </div>
                    <span className="text-sm">
                      {format(new Date(file.$createdAt), "dd MMM")}
                    </span>
                  </div>
                ))}

              {searchFolders &&
                searchFolders.total > 0 &&
                searchFolders.documents.map((folder) => (
                  <Link
                    href={`/drive/folder/${folder.$id}`}
                    key={folder.$id}
                    className="flex items-center justify-between p-1 hover:bg-gray-100 rounded-md"
                    onClick={() => setFocus(false)}
                  >
                    <div className="flex items-center">
                      <span className="text-sm mr-2">
                        <Icon name="folder" strokeWidth={1.5} />
                      </span>
                      <span>{folder.name}</span>
                    </div>
                    <span className="text-sm">
                      {format(new Date(folder.$createdAt), "dd MMM")}
                    </span>
                  </Link>
                ))}
            </div>
          ) : null}
        </>
      )}
    </form>
  );
};

export default Search;
