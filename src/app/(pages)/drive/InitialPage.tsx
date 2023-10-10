import Icon from "@/components/Icon";
import Image from "next/image";
import React from "react";

const InitialPage = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-4 h-[calc(100%_-_100px)]">
      <p className="text-3xl font-semibold text-center">
        A place for all of your files
      </p>
      <div className="flex justify-center gap-6">
        <div className="max-md:hidden flex gap-2 items-center">
          <Icon name="file-text" />
          <Icon name="image" />
          <Icon name="sheet" />
        </div>
        <Image src={"/drive.png"} alt="drive image" width={150} height={150} />
        <div className="flex max-md:hidden items-center gap-2">
          <Icon name="package-open" /> <Icon name="figma" />
          <Icon name="file-code" />
        </div>
      </div>
      <p>You can drag files or folder right into drive</p>
    </div>
  );
};

export default InitialPage;
