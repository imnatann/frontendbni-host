// src/components/FormWrapper.tsx

import { Form } from "antd";
import React from "react";

type FormWrapperProps<T> = {
  children: React.ReactNode;
  name?: string;
  onFinish: (value: T) => void;
};

const FormWrapper = <T extends unknown>({
  children,
  name,
  onFinish,
}: FormWrapperProps<T>) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout={"vertical"} name={name} onFinish={onFinish}>
      {children}
    </Form>
  );
};

export default FormWrapper;
