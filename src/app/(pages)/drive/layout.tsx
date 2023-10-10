import Icon from "@/components/Icon";
import NewDropdown from "@/components/NewDropdown";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import React from "react";

const DriveLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-[calc(100vh_-_73px)]">
      <aside className="w-1/4 border-r max-md:hidden">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <NewDropdown>
              <Button variant={"secondary"} className="flex gap-4">
                My Drive <Icon name="chevron-down" />
              </Button>
            </NewDropdown>
            <div>
              <Button size={"icon"} variant={"ghost"}>
                <Icon name="layout-grid" />
              </Button>
              <Button size="icon" variant={"ghost"}>
                <Icon name="info" />
              </Button>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default DriveLayout;
