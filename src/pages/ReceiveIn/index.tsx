import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import { IconArrowDown } from "@tabler/icons-react";
import { Breadcrumb, Card, Col, Divider, Flex, Row, Typography } from "antd";
import TableReceiveIn from "./components/TableReceiveIn";
import ListNeedApproval from "./components/ListNeedApproval";

const { Title } = Typography;

const ReceiveIn = () => {
  return (
    <Page title={"Receive In"}>
      <PageLabel
        title={<span className="font-semibold text-2xl">Receive In</span>}
        subtitle={
          <Breadcrumb
            items={[
              {
                href: "",
                title: (
                  <Flex align={"end"}>
                    <IconArrowDown />
                    <span>Receive In</span>
                  </Flex>
                ),
              },
            ]}
          />
        }
      />
      <PageContent>
        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Card>
              <Title level={5}>Need Approval</Title>
              <ListNeedApproval />
            </Card>
          </Col>
          <Col xs={24} md={18}>
            <Card>
              <Title level={5}>Already Approved </Title>
              <TableReceiveIn />
            </Card>
          </Col>
        </Row>
      </PageContent>
    </Page>
  );
};

export default ReceiveIn;
