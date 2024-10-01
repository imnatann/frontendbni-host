
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  PlusOutlined,
  CloudUploadOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { IconBuildingStore } from "@tabler/icons-react";
import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Flex,
  Modal,
  Space,
  Typography,
} from "antd";

import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import TableView from "./components/TableView";
import ModalUpload from "./components/ModalUpload";

const { Title } = Typography;

const MaintenanceIndex: React.FC = () => {
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const navigate = useNavigate();

  const onAddNewMaintenance = () => navigate("/maintenance/add");

  const showUploadModal = () => setUploadModalVisible(true);
  const hideUploadModal = () => setUploadModalVisible(false);

  const handleUploadSuccess = () => {
    // Refresh data or perform any necessary actions after successful upload
    hideUploadModal();
  };

  return (
    <Page title="Maintenance List">
      <PageLabel
        title={<span className="font-semibold text-2xl">Maintenance List</span>}
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
                title: "Maintenance",
              },
            ]}
          />
        }
        endSection={
          <Space>
            <Button icon={<CloudUploadOutlined />}>Export</Button>
            <Button
              type="primary"
              icon={<VerticalAlignTopOutlined />}
              onClick={showUploadModal}
            >
              Upload Data
            </Button>
          </Space>
        }
      />
      <PageContent>
        <Card>
          <Flex justify="space-between" align="flex-end">
            <Title level={3}>Maintenance</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onAddNewMaintenance}
            >
              Add New
            </Button>
          </Flex>
          <Divider />
          <TableView />
        </Card>
      </PageContent>
      <ModalUpload
        isModalVisible={uploadModalVisible}
        handleCancel={hideUploadModal}
        onUploadSuccess={handleUploadSuccess}
      />
    </Page>
  );
};

export default MaintenanceIndex;
