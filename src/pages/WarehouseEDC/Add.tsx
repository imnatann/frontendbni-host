import FormFieldEDC from "@smpm/components/FormFields/FormFieldEDC";
import FormWrapper from "@smpm/components/FormWrapper";
import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import { createDataEDC } from "@smpm/services/edcService";
import { IconWashMachine } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Breadcrumb, Button, Card, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const addMutation = useMutation({
    mutationFn: createDataEDC,
  });

  const onFinish = (data) => {
    addMutation.mutate(
      {
        ...data,
        status_active: true,
        status_machine_desc: "oke",
      },
      {
        onSuccess: () => {
          navigate("/inventory/warehouse-edc");
        },
      }
    );
  };

  return (
    <Page title={"Add New EDC"}>
      <PageLabel
        title={<span className="font-semibold text-2xl">Add New EDC</span>}
        subtitle={
          <Breadcrumb
            items={[
              {
                href: "/inventory/warehouse-edc",
                title: (
                  <Flex align={"end"}>
                    <IconWashMachine />
                    <span>Warehouse EDC</span>
                  </Flex>
                ),
              },
              {
                href: "",
                title: (
                  <Flex align={"end"}>
                    <span>Add New EDC</span>
                  </Flex>
                ),
              },
            ]}
          />
        }
      />
      <PageContent>
        <FormWrapper onFinish={onFinish}>
          <Card title={"Add New EDC"}>
            <FormFieldEDC />
            <Button
              type={"primary"}
              htmlType={"submit"}
              loading={addMutation.isPending}
            >
              Submit
            </Button>
          </Card>
        </FormWrapper>
      </PageContent>
    </Page>
  );
};

export default Add;
