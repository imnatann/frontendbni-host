import AlertValidation from "@smpm/components/AlertValidation"
import { IFormSignIn } from "@smpm/models/authModel"
import { Button, Form, Input } from "antd"
import React from "react"

const FormSignIn: React.FC<IFormSignIn> = ({
	onFinish,
	initialValues,
	isLoading = false,
}) => {
	const [form] = Form.useForm()

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={initialValues}
			onFinish={onFinish}
		>
			<AlertValidation errorKey="sign-in" />
			<Form.Item
				label="Email"
				name="email"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input placeholder="Masukkan username" />
			</Form.Item>
			<Form.Item
				label="Password"
				name="password"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input.Password placeholder="Masukkan password" />
			</Form.Item>
			<Form.Item>
				<Button type="primary" loading={isLoading} htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default FormSignIn
