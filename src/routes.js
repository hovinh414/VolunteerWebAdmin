import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineSignpost,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Trang chủ",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Quản lý bài viết",
    layout: "/admin",
    path: "/posts",
    icon: (
      <Icon
        as={MdOutlineSignpost}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Quản lý minh chứng",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/authenticate",
    component: DataTables,
  },
  {
    name: "Quản lý tài khoản",
    layout: "/admin",
    path: "/users",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "" ,
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} color='#fff' />,
    component: SignInCentered,
  },

];

export default routes;
