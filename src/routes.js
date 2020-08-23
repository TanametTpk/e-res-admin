/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
// import Dashboard from "@material-ui/icons/Dashboard";
// import Person from "@material-ui/icons/Person";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
// import DashboardPage from "./views/Dashboard/Dashboard.js";
import UserProfile from "./views/UserProfile/UserProfile.js";
import TableList from "./views/TableList/TableList.js";
import Products from './views/Products/Products';
import BorderClearIcon from '@material-ui/icons/BorderClear';
import AssignmentIcon from '@material-ui/icons/Assignment';

import AllInboxIcon from '@material-ui/icons/AllInbox';
// import Typography from "./views/Typography/Typography.js";
// import Icons from "./views/Icons/Icons.js";
// import NotificationsPage from "./views/Notifications/Notifications.js";

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   rtlName: "لوحة القيادة",
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: "/admin"
  // },
  {
    path: "/zones",
    name: "Zone Manager",
    icon: BorderClearIcon,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "Products",
    icon: AllInboxIcon,
    component: Products,
    layout: "/admin"
  },
  {
    path: "/orders",
    name: "Orders",
    icon: AssignmentIcon,
    component: TableList,
    layout: "/admin"
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
