import { IProps } from "@smpm/models";
import { appGetter, toggleSidebarCollapsed } from "@smpm/store/appSlice";
import {
  IconBuildingStore,
  IconCalculator,
  IconChartInfographic,
  IconReportAnalytics,
  IconSortDescendingNumbers,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Layout, Menu, MenuProps } from "antd";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Header from "./header";
import Sidebar from "./sideBar";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "dashboard", <IconChartInfographic size="1.2rem" />),
  getItem(
    "Menu Management",
    "menu-management",
    <IconUsersGroup size="1.2rem" />,
    [
      getItem("Role", "menu-management/role"),
      getItem("User", "menu-management/user"),
      getItem("Wilayah", "menu-management/region"),
      getItem("Vendor", "menu-management/vendor"),
    ]
  ),
  getItem(
    "Job Order",
    "job-order",
    <IconSortDescendingNumbers size="1.2rem" />,
    [
      getItem("Open Job Order", "job-order/open"),
      getItem("Activity Job Order", "job-order/activity"),
    ]
  ),
  getItem("Merchant", "merchant", <IconBuildingStore size="1.2rem" />, [
    getItem("List Merchant", "merchant/list-merchant"),
    getItem("Maintenance Merchant", "merchant/maintenance-merchant"),
  ]),
  getItem("Inventory", "inventory", <IconCalculator size="1.2rem" />, [
    getItem("Warehouse EDC", "inventory/warehouse-edc"),
    getItem("EDC Terpasang", "inventory/attached-edc"),
    getItem("EDC Tersedia", "inventory/available-edc"),
    getItem("Receive In", "inventory/receive-in"),
    getItem("Receive Out", "inventory/receive-out"),
  ]),
  getItem("Report", "report", <IconReportAnalytics size="1.2rem" />),
  // getItem("Live Chat", "live-chat", <IconMessageReport size="1.2rem" />),
  // getItem("Audit", "audit", <IconListDetails size="1.2rem" />),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const Navigation: React.FC<IProps> = ({ children }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const { sidebarCollapsed } = useSelector(appGetter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const transformWidth = useMemo(() => {
    return isDesktopOrLaptop ? (sidebarCollapsed ? 50 : 250) : 0;
  }, [sidebarCollapsed, isDesktopOrLaptop]);

  const isCollapsed = useMemo(() => {
    return sidebarCollapsed;
  }, [sidebarCollapsed]);

  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <>
      <Header
        collapsed={sidebarCollapsed ? true : false}
        toggle={() => dispatch(toggleSidebarCollapsed())}
        className="fixed z-50 h-[46px]"
      />
      <Layout>
        <Sidebar collapsed={isCollapsed} className="md:relative z-40 ">
          <Menu
            mode="inline"
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            items={items}
            onClick={({ key }) => navigate(key)}
          ></Menu>
          <div className="h-36 " />
        </Sidebar>
        <Layout
          className="mt-[46px] h-full"
          style={{
            marginLeft: transformWidth,
            transition: "0.3s",
          }}
        >
          {children}
        </Layout>
      </Layout>
    </>
  );
};

export default Navigation;
