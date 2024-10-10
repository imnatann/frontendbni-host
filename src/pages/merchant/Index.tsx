import {
  HomeOutlined,
 } from "@ant-design/icons";
import PageContent from "@smpm/components/PageContent";
import { IconBuildingStore } from "@tabler/icons-react";
import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Flex,
  Typography,
} from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Page from "@smpm/components/pageTitle";
import PageLabel from "@smpm/components/pageLabel";
import TableView from "./components/TableView";
  const { Title } = Typography;

const Region = () => {
  const [ReportModalVisible, setReportModalVisible] = useState(false);
  const navigate = useNavigate();
  const onAddNewMerchant = () => navigate("/merchant/list-merchant/add");

  return (
    <>
      <Page title="Merchant List">
        <PageLabel
          title={<span className="font-semibold text-2xl">Merchant List</span>}
          subtitle={
            <Breadcrumb
              items={[
                {
                  href: "/",
                  title: (
                    <>
                      <HomeOutlined />
                      <span>Home</span>
                    </>
                  ),
                },
                {
                  title: (
                    <div className="flex gap-1">
                      <IconBuildingStore size="1rem" />
                      <span>Merchant</span>
                    </div>
                  ),
                },
                {
                  title: "List",
                },
              ]}
            />
          }
          // endSection={
          //   <Space>
          //     <Button icon={<CloudUploadOutlined />}>Export</Button>
          //     <Button
          //       type="primary"
          //       icon={<VerticalAlignTopOutlined />}
          //       onClick={() => setReportModalVisible(true)}
          //     >
          //       Upload Data
          //     </Button>
          //   </Space>
          // }
        />
        <PageContent>
          <Card>
            <Flex justify="space-between" align="flex-end">
              <Title level={3}>Merchant</Title>
              <Button
                type={"primary"}
                icon={<PlusOutlined />}
                onClick={onAddNewMerchant}
              >
                Add New
              </Button>
            </Flex>
            <Divider />
            <TableView />
          </Card>
        </PageContent>
      </Page>
    </>
  );
};

export default Region;
