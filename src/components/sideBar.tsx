
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
  const isMobileOrTablet = useMediaQuery({ maxWidth: 1223 });

  // Tinggi navbar, sesuaikan dengan tinggi navbar Anda
  const navbarHeight = 46;

  return (
    <Sider
      trigger={null}
      collapsible={isDesktopOrLaptop}
      collapsed={collapsed}
      width={isMobileOrTablet ? "100%" : 250}
      breakpoint="lg"
      className={`${className} ${isMobileOrTablet ? 'mobile-sidebar' : ''}`}
      style={{
        overflow: "auto",
        height: isMobileOrTablet ? `calc(100vh - ${navbarHeight}px)` : "100vh",
        position: "fixed",
        left: 0,
        top: navbarHeight,
        bottom: 0,
        zIndex: isMobileOrTablet ? 1000 : 'auto',
      }}
      theme="light"
      collapsedWidth={isDesktopOrLaptop ? 50 : 0}
    >
      <PerfectScrollbar>{children}</PerfectScrollbar>
    </Sider>
  );
};

export default Sidebar;
