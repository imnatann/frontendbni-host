// src/pages/Add.tsx

import FormFieldEDC from "@smpm/components/FormFields/FormFieldEDC";
import FormWrapper from "@smpm/components/FormWrapper";
import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import { createDataEDC } from "@smpm/services/edcService";
import { IconWashMachine } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Breadcrumb, Button, Card, Flex, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";

interface BackendErrorResponse {
  status: {
    code: number;
    description: string;
  };
  result: any;
}

const Add = () => {
  const navigate = useNavigate();

  // State to hold error message
  const [formError, setFormError] = useState<string | null>(null);

  const addMutation = useMutation({
    mutationFn: createDataEDC,
    onError: (error: unknown) => {
      // Log the entire error for debugging
      console.error("Mutation Error:", error);

      // Type guard to ensure error is an AxiosError with response data
      if (isAxiosErrorWithResponse(error)) {
        const backendError = error.response?.data as BackendErrorResponse;

        if (
          backendError &&
          backendError.status &&
          backendError.status.description
        ) {
          setFormError(backendError.status.description);
        } else {
          setFormError("Terjadi kesalahan saat menambahkan EDC.");
        }
      } else {
        // Fallback for non-Axios errors
        setFormError("Terjadi kesalahan saat menambahkan EDC.");
      }
    },
    onSuccess: () => {
      navigate("/inventory/warehouse-edc");
    },
  });

  const onFinish = (data: any) => {
    // Reset formError before submission
    setFormError(null);

    addMutation.mutate({
      ...data,
      status_active: true,
      status_machine_desc: "oke",
    });
  };

  return (
    <Page title={"Add New EDC"}>
      <PageLabel
        title={<span className="text-2xl font-semibold">Add New EDC</span>}
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
        <Card title={"Add New EDC"}>
          {/* Render Alert if there's an error */}
          {formError && (
            <Alert
              message="Error"
              description={formError}
              type="error"
              showIcon
              closable
              style={{ marginBottom: 16 }}
              onClose={() => setFormError(null)}
            />
          )}
          <FormWrapper onFinish={onFinish}>
            <FormFieldEDC />
            <Button
              type={"primary"}
              htmlType={"submit"}
              loading={addMutation.isLoading}
              style={{ marginTop: 16 }}
            >
              Submit
            </Button>
          </FormWrapper>
        </Card>
      </PageContent>
    </Page>
  );
};

// Type guard to check if error is AxiosError with response
const isAxiosErrorWithResponse = (
  error: unknown
): error is AxiosError<BackendErrorResponse> => {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError
  );
};

export default Add;
