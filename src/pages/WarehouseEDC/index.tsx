import { PlusOutlined } from "@ant-design/icons";
import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import { IconUpload, IconWashMachine } from "@tabler/icons-react";
import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Flex,
  Modal,
  Typography,
} from "antd";
import TableEDC from "./components/TableEDC";
import { useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";

const { Title } = Typography;

const onChange = (key: string) => {
  console.log(key);
};

const WarehouseEDC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const onOke = () => setModalOpen(false);
  const onCancel = () => setModalOpen(false);

  const onAddNewEDC = () => navigate("/inventory/warehouse-edc/add");

  const onAddBulk = () => setModalOpen(true);

  return (
    <Page title={"Warehouse EDC"}>
      <PageLabel
        title={<span className="font-semibold text-2xl">Warehouse EDC</span>}
        subtitle={
          <Breadcrumb
            items={[
              {
                href: "",
                title: (
                  <Flex align={"end"}>
                    <IconWashMachine />
                    <span>Warehouse EDC</span>
                  </Flex>
                ),
              },
            ]}
          />
        }
      />
      <PageContent>
        <Modal
          title="Upload Bulk"
          open={isModalOpen}
          onOk={onOke}
          onCancel={onCancel}
        >
          <Dragger>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Only support .xlsx or .xls
              format
            </p>
          </Dragger>
        </Modal>
        <Card>
          <Flex justify="space-between" align="flex-end">
            <Title level={3}>Warehouse EDC</Title>
            <Flex align={"center"} gap={3}>
              <Button type={"primary"} onClick={onAddBulk}>
                <Flex align={"center"} gap={5}>
                  <IconUpload />
                  <span>Upload Bulk</span>
                </Flex>
              </Button>
              <Button
                type={"primary"}
                icon={<PlusOutlined />}
                onClick={onAddNewEDC}
              >
                Add New
              </Button>
            </Flex>
          </Flex>
          <Divider />
          <TableEDC />
        </Card>
      </PageContent>
    </Page>
  );
};

export default WarehouseEDC;
