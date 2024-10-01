import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import { IconArrowUp } from "@tabler/icons-react";
import {
  Breadcrumb,
  Card,
  Checkbox,
  Col,
  Divider,
  Flex,
  Modal,
  Row,
  Tabs,
  TabsProps,
  Typography,
} from "antd";
import ListNeedApproval from "./components/ListNeedApproval";
import TableReceiveOut from "./components/TableReceiveOut";
import AlertMove from "./components/AlertMove";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import Dragger from "antd/es/upload/Dragger";

const CheckboxGroup = Checkbox.Group;

const { Title } = Typography;

const plainOptions = ["FM2234 - INGENICO", "FM3455 - INGENICO", "PX2334 - PAX"];

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Move Partial",
    children: (
      <>
        <Checkbox>Check all</Checkbox>
        <Divider />
        <CheckboxGroup options={plainOptions} />
      </>
    ),
  },
  {
    key: "2",
    label: "Upload Bulk",
    children: (
      <Dragger>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Only support .xlsx or .xls format
        </p>
      </Dragger>
    ),
  },
];

const onChange = (key: string) => {
  console.log(key);
};

const ReceiveOut = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const onOke = () => setModalOpen(false);
  const onCancel = () => setModalOpen(false);

  const onMoveEDC = () => setModalOpen(true);

  return (
    <Page title={"Receive Out"}>
      <PageLabel
        title={<span className="font-semibold text-2xl">Receive Out</span>}
        subtitle={
          <Breadcrumb
            items={[
              {
                href: "",
                title: (
                  <Flex align={"end"}>
                    <IconArrowUp />
                    <span>Receive Out</span>
                  </Flex>
                ),
              },
            ]}
          />
        }
      />
      <Modal
        title="Move EDC"
        open={isModalOpen}
        onOk={onOke}
        onCancel={onCancel}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Modal>
      <PageContent>
        <div className="mb-3">
          <AlertMove onMoveEDC={onMoveEDC} />
        </div>
        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Card>
              <Title level={5}>Waiting for Approval</Title>
              <ListNeedApproval />
            </Card>
          </Col>
          <Col xs={24} md={18}>
            <Card>
              <Title level={5}>Already Approved</Title>
              <TableReceiveOut />
            </Card>
          </Col>
        </Row>
      </PageContent>
    </Page>
  );
};

export default ReceiveOut;
