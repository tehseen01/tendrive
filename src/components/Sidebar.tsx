import React from "react";
import { Button } from "./ui/button";
import Icon from "./Icon";
import NewDropdown from "./NewDropdown";
import Logout from "./dialog/Logout";
import Link from "next/link";

const Sidebar = () => {
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
              <Link href={`/drive/${link.value}`}>
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
    label: "Recent",
    value: "recent",
    icon: <Icon name="clock-4" strokeWidth={1.25} />,
  },
  {
    label: "Stared",
    value: "stared",
    icon: <Icon name="star" strokeWidth={1.25} />,
  },
  {
    label: "Spam",
    value: "spam",
    icon: <Icon name="info" strokeWidth={1.25} />,
  },
  {
    label: "Bin",
    value: "trash",
    icon: <Icon name="trash" strokeWidth={1.25} />,
  },
  {
    label: "Storage",
    value: "storage",
    icon: <Icon name="cloud" strokeWidth={1.25} />,
  },
];
