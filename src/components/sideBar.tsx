import { Layout } from "antd";
import React from "react";
import { useMediaQuery } from "react-responsive";
import PerfectScrollbar from "react-perfect-scrollbar";

const { Sider } = Layout;

interface ISidebar {
  collapsed: boolean;
  children: React.ReactNode;
  className: string;
}

const Sidebar: React.FC<ISidebar> = ({ collapsed, children, className }) => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  return (
    <Sider
      trigger={null}
      collapsible={isDesktopOrLaptop}
      collapsed={collapsed ? true : false}
      width={250}
      breakpoint="lg"
      className={className}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 46,
        bottom: 0,
      }}
      theme="light"
      collapsedWidth={isDesktopOrLaptop ? 50 : 0}
    >
      <PerfectScrollbar>{children}</PerfectScrollbar>
    </Sider>
  );
};

export default Sidebar;
