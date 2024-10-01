import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import { IconWashMachine } from "@tabler/icons-react";
import { Breadcrumb, Card, Divider, Flex, Typography } from "antd";
import TableEDC from "./components/TableEDC";

const { Title } = Typography;

const AttachedEDC = () => {
  return (
    <Page title={"EDC Terpasang"}>
      <PageLabel
        title={<span className="font-semibold text-2xl">EDC Terpasang</span>}
        subtitle={
          <Breadcrumb
            items={[
              {
                href: "",
                title: (
                  <Flex align={"end"}>
                    <IconWashMachine />
                    <span>EDC Terpasang</span>
                  </Flex>
                ),
              },
            ]}
          />
        }
      />
      <PageContent>
        <Card>
          <Flex justify="space-between" align="flex-end">
            <Title level={3}>EDC Terpasang</Title>
          </Flex>
          <Divider />
          <TableEDC />
        </Card>
      </PageContent>
    </Page>
  );
};

export default AttachedEDC;
