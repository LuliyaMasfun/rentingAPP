import HomeIcon from "@heroicons/react/outline";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import React from "react";

export const NavItems = [
  { title: "Home", path: "/", icon: <WindowOutlinedIcon /> },
  { title: "Activity", path: "/activity", icon: <EqualizerOutlinedIcon /> },
  {
    title: "Task",
    path: "/services",
    icon: <AssignmentTurnedInOutlinedIcon />,
  },
  { title: "Users", path: "/users", icon: <PermIdentityOutlinedIcon /> },
  {
    title: "Noticiation",
    path: "/contact",
    icon: <NotificationsNoneOutlinedIcon />,
  },
];
