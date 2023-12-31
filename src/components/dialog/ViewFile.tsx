"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import React, { useEffect, useRef } from "react";
import Icon from "../Icon";
import { Button } from "../ui/button";
import { setOpenFile } from "@/redux/fileSlice";
import Image from "next/image";
import storageService from "@/appwrite/storageService";
import { cn } from "@/lib/utils";

const ViewFile = () => {
  const zoomRef = useRef(1);

  const dispatch = useAppDispatch();
  const { viewFileData } = useAppSelector((state) => state.file);

  const handlePrint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (viewFileData) {
      const URL = storageService.getFileView({ fileId: viewFileData.$id }).href;
      window.open(URL, "_blank");
    }
  };

  const handleZoomIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (zoomRef.current < 1.6) {
      zoomRef.current += 0.1;
      document.documentElement.style.setProperty(
        "--zoom-file",
        zoomRef.current.toFixed(1).toString()
      );
    }
  };

  const handleZoomOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (zoomRef.current > 1.0) {
      zoomRef.current -= 0.1;
      document.documentElement.style.setProperty(
        "--zoom-file",
        zoomRef.current.toFixed(1).toString()
      );
    }
  };

  const handleZoomReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    zoomRef.current = 1;
    document.documentElement.style.setProperty("--zoom-file", "1");
  };

  useEffect(() => {
    zoomRef.current = 1;
    document.documentElement.style.setProperty("--zoom-file", "1");
  }, []);

  return (
    <div
      className="fixed inset-0 md:bg-black/60 bg-black z-50"
      onClick={() => dispatch(setOpenFile(false))}
    >
      <header className="flex items-center gap-4 justify-between md:p-4 p-2 relative z-40">
        <div className="flex items-center md:gap-4 gap-2 text-white">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="rounded-full cursor-pointer text-white"
            onClick={() => dispatch(setOpenFile(false))}
            aria-label="Close"
            title="Back button"
          >
            <Icon name="arrow-left" />
          </Button>
          {viewFileData && viewFileData.mimeType.startsWith("image") && (
            <>
              <span>
                <Icon name="image" strokeWidth={1.5} />
              </span>
              <span className="text-white">
                {viewFileData.name.length > 15
                  ? viewFileData.name.slice(0, 15) + "..."
                  : viewFileData.name}
              </span>
            </>
          )}
        </div>
        <div className="text-white flex items-center md:gap-4">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="rounded-full max-md:hidden"
            onClick={handlePrint}
          >
            <Icon name="printer" />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
            asChild
            aria-label="Download button"
            title="Download button"
          >
            <a
              href={storageService.downloadFile(viewFileData?.$id!).href}
              download
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="download" />
            </a>
          </Button>
          <Button variant={"ghost"} size={"icon"} className="rounded-full">
            <Icon name="more-vertical" />
          </Button>
        </div>
      </header>
      <div className="flex items-center justify-center h-[calc(100vh_-_130px)] md:w-[90%] m-auto">
        {viewFileData && viewFileData.mimeType.startsWith("image") && (
          <Image
            src={
              storageService.getFilePreview({ fileId: viewFileData?.$id }).href
            }
            width={700}
            height={700}
            alt={viewFileData?.name}
            className={cn(
              viewFileData.mimeType.endsWith("png") && "pngPattern",
              "object-contain max-h-full transition-transform"
            )}
            onClick={(e) => {
              e.stopPropagation(), console.log("hello there");
            }}
            style={{ transform: `scale(var(--zoom-file))` }}
          />
        )}
      </div>
      <div className="flex items-center justify-center max-md:hidden">
        <div className="flex items-center gap-2 bg-black/30 rounded-md p-1 text-white z-40">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
            onClick={handleZoomOut}
          >
            <Icon name="minus" size={20} />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
            onClick={handleZoomReset}
          >
            <Icon name="search-x" size={20} />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-full"
            onClick={handleZoomIn}
          >
            <Icon name="plus" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewFile;
