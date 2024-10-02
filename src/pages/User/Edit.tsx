
import { FC } from 'react';
import FormFieldUser, { TFormFieldUser } from "@smpm/components/FormFields/FormFieldUser";
import FormWrapper from "@smpm/components/FormWrapper";
import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import { getUserById, updateUser } from "@smpm/services/userService";
import { IconUser } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Breadcrumb, Button, Card, Flex, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const EditUser: FC = () => {
  const { id: userId } = useParams<{ id: string }>();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const editMutation = useMutation({
    mutationFn: updateUser,
  });

  const onFinish = (data: TFormFieldUser) => {
    editMutation.mutate(
      { ...data, id: Number(userId) },
      {
        onSuccess: () => {
          api.success({
            message: "User updated successfully.",
          });
          navigate("/user/list");
        },
        onError: () => {
          api.error({
            message: "Failed to update user.",
          });
        },
      }
    );
  };

  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(Number(userId)),
    enabled: !!userId,
  });

  return (
    <>
      {contextHolder}
      <Page title="Edit User">
        <PageLabel
          title={<span className="font-semibold text-2xl">Edit User</span>}
          subtitle={
            <Breadcrumb
              items={[
                {
                  href: "/user/list",
                  title: (
                    <Flex align="center" gap="small">
                      <IconUser size={16} />
                      <span>User List</span>
                    </Flex>
                  ),
                },
                {
                  title: "Edit User",
                },
              ]}
            />
          }
        />
        <PageContent>
          {isSuccess ? (
            <FormWrapper onFinish={onFinish}>
              <Card title="Edit User">
                <FormFieldUser
                  initialValues={{
                    id: user?.id,
                    name: user?.name,
                    email: user?.email,
                    role: user?.role,
                    status: user?.status,
                  }}
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={editMutation.isPending}
                >
                  Update User
                </Button>
              </Card>
            </FormWrapper>
          ) : (
            "Loading..."
          )}
        </PageContent>
      </Page>
    </>
  );
};

export default EditUser;
