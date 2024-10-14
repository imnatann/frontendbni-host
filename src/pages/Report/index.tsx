import { Layout, Tabs, TabsProps, Typography } from "antd";
import React, { useState } from "react";
import JobOrder from "./ReportComponents/JobOrder";
import PreventiveMaintenance from "./ReportComponents/PreventiveMaintenance";
import Inventory from "./ReportComponents/Inventory";
import Page from "@smpm/components/pageTitle";

function Report() {
  const [tabActive, setTabActive] = useState<string>("1");
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "JOB ORDER REPORT",
    },
    {
      key: "2",
      label: "PREVENTIVE MAINTENANCE REPORT",
    },
    {
      key: "3",
      label: "INVENTORY REPORT",
    },
  ];

  const onChange = (key: string) => {
    setTabActive(key);
  };

  return (
    <Page title={"Report"}>  
    <Layout
      style={{
        backgroundColor: "white",
        padding: "30px",
      }}
    >
      <Tabs defaultActiveKey={tabActive} items={items} onChange={onChange} />
      {tabActive === "1" ? (
        <JobOrder />
      ) : tabActive === "2" ? (
        <PreventiveMaintenance />
      ) : tabActive === "3" ? (
        <Inventory />
      ) : (
        <Typography>Invalid Tab</Typography>
      )}
    </Layout>
    </Page>
  );
}

export default Report;
