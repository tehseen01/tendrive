"use client";

import React from "react";
import { Button } from "./ui/button";
import Icon from "./Icon";
import NewDropdown from "./NewDropdown";
import Logout from "./dialog/Logout";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setOpenMobileNav } from "@/redux/commonSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const { openMobileNav } = useAppSelector((state) => state.common);

  return (
    <div className="p-4">
      <div className="max-md:hidden">
        <NewDropdown>
          <Button>
            <span>
              <Icon name="plus" strokeWidth={1.5} />
            </span>
            New
          </Button>
        </NewDropdown>
      </div>
      <ul className="mt-4">
        {Links.map((link) => (
          <li key={link.label} className="w-full">
            <Button
              variant={"ghost"}
              className="w-full justify-start gap-4"
              asChild
            >
              <Link
                href={`/drive/${link.value}`}
                onClick={() => dispatch(setOpenMobileNav(false))}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            </Button>
          </li>
        ))}
        <Logout>
          <li className="w-full mt-4">
            <Button
              variant={"ghost"}
              className="w-full justify-start gap-4 hover:bg-destructive"
            >
              <Icon name="log-out" /> Log out
            </Button>
          </li>
        </Logout>
      </ul>
    </div>
  );
};

export default Sidebar;

const Links = [
  {
    label: "My Drive",
    value: "",
    icon: <Icon name="folder" strokeWidth={1.25} />,
  },
  {
    label: "Share with me",
    value: "share-with-me",
    icon: <Icon name="users-2" strokeWidth={1.25} />,
  },
  {
    label: "Notes",
    value: "",
    icon: <Icon name="lightbulb" strokeWidth={1.25} />,
  },
  {
    label: "Stared",
    value: "",
    icon: <Icon name="star" strokeWidth={1.25} />,
  },
  {
    label: "Spam",
    value: "",
    icon: <Icon name="info" strokeWidth={1.25} />,
  },
  {
    label: "Bin",
    value: "trash",
    icon: <Icon name="trash" strokeWidth={1.25} />,
  },
  {
    label: "Storage",
    value: "",
    icon: <Icon name="cloud" strokeWidth={1.25} />,
  },
];
