import { getBrand, getBrandType } from "@smpm/services/edcService"
import { useQuery } from "@tanstack/react-query"
import { Col, Form, Input, Row, Select } from "antd"
import { useState } from "react"

// const { Option } = Select

export type FormFieldSerialNumberSecondEDCProps = {
	brand_second: string
	brand_second_type: string
	serial_second_number: string
	notes_second: string
	action_second: string
}

const FormFieldReceivedOutEDC = () => {
	const [selectedBrand, setSelectedBrand] = useState("")

	const { data: brand, isLoading: isLoadingBrand } = useQuery({
		queryKey: ["select-brand"],
		queryFn: () => getBrand(),
	})

	const { data: brandType, isLoading: _isLoadingBrandType } = useQuery({
		queryKey: ["select-brand-type", selectedBrand],
		queryFn: () =>
			getBrandType({
				brand: selectedBrand,
			}),
	})

	return (
		<Row gutter={16}>
			<Col xs={24} md={4}>
				<Form.Item
					label={"Merk EDC"}
					name={"edc_second_brand"}
					rules={[{ required: true, message: "Dibutuhkan" }]}
				>
					<Select
						loading={isLoadingBrand}
						virtual={true}
						allowClear
						onChange={(value) => {
							setSelectedBrand(value ?? "")
						}}
					>
						{brand?.result.map((item: any) => (
							<Select.Option value={item.brand}>{item.brand}</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col xs={24} md={4}>
				<Form.Item
					label={"Tipe EDC"}
					name={"edc_second_brand_type"}
					rules={[{ required: true, message: "Dibutuhkan" }]}
				>
					<Select loading={isLoadingBrand} virtual={true} allowClear>
						{brandType?.result.map((item: any) => (
							<Select.Option value={item.type}>{item.type}</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Col>
			<Col xs={24} md={4}>
				<Form.Item
					label={"Serial Number"}
					name={"edc_second_serial_number"}
					rules={[{ required: true, message: "Dibutuhkan" }]}
				>
					<Input />
				</Form.Item>
			</Col>
			<Col xs={24} md={4}>
				<Form.Item label={"Notes"} name={"edc_second_note"}>
					<Input />
				</Form.Item>
			</Col>
			<Col xs={24} md={4}>
				<Form.Item label={"Action"} name={"edc_second_action"}>
					<Input />
				</Form.Item>
			</Col>
		</Row>
	)
}

export default FormFieldReceivedOutEDC