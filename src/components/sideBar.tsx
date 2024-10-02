import React, { useState, useEffect } from "react";  
import { Layout } from "antd";  
import { useMediaQuery } from "react-responsive";  
import PerfectScrollbar from "react-perfect-scrollbar";  

const { Sider } = Layout;  

interface ISidebar {  
  collapsed: boolean;  
  onCollapse?: (collapsed: boolean) => void;  
  children: React.ReactNode;  
  className: string;  
}  

const Sidebar: React.FC<ISidebar> = ({ collapsed, onCollapse, children, className }) => {  
  const isDesktop = useMediaQuery({ minWidth: 1224 });  
  const isMedium = useMediaQuery({ minWidth: 768, maxWidth: 1223 });  
  const isMobile = useMediaQuery({ maxWidth: 767 });  

  const [internalCollapsed, setInternalCollapsed] = useState(collapsed);  

  useEffect(() => {  
    setInternalCollapsed(collapsed);  
  }, [collapsed]);  

  const navbarHeight = 46;  

  const handleClick = (e: React.MouseEvent) => {  
    if (isMobile || isMedium) {  
      const target = e.target as HTMLElement;  
      if (target.closest('.ant-menu-item') || target.closest('.ant-menu-submenu-title')) {  
        if (!target.closest('.ant-menu-submenu-title')) {  
          setInternalCollapsed(true);  
          if (onCollapse) {  
            onCollapse(true);  
          }  
        }  
      }  
    }  
  };  

  const getSiderWidth = () => {  
    if (isMobile) return "100%";  
    if (isMedium) return 200;  
    return 250; // Default width for desktop  
  };  

  const getCollapsedWidth = () => {  
    if (isMobile || isMedium) return 0;  
    return 50; // Default collapsed width for desktop  
  };  

  return (  
    <Sider  
      trigger={null}  
      collapsible={isDesktop}  
      collapsed={isDesktop ? collapsed : internalCollapsed}  
      width={getSiderWidth()}  
      breakpoint="lg"  
      className={`${className} ${(isMobile || isMedium) ? 'responsive-sidebar' : ''}`}  
      style={{  
        overflow: "auto",  
        height: (isMobile || isMedium) ? `calc(100vh - ${navbarHeight}px)` : "100vh",  
        position: "fixed",  
        left: 0,  
        top: navbarHeight,  
        bottom: 0,  
        zIndex: (isMobile || isMedium) ? 1000 : 'auto',  
      }}  
      theme="light"  
      collapsedWidth={getCollapsedWidth()}  
    >  
      <PerfectScrollbar>  
        <div onClick={handleClick}>  
          {children}  
        </div>  
      </PerfectScrollbar>  
    </Sider>  
  );  
};  

export default Sidebar;