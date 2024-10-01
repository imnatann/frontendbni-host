import { Col, DatePicker, Form, Input, InputNumber, Row } from "antd"

export type FormFieldInputDetailJobActivityProps = {
	arrival_time: Date
	start_time: Date
	end_time: Date
	communication_line: string
	direct_line_number: string
	simcard_provider: string
	paper_supply: string
	merchant_pic: string
	phone_provider: string
	swipe_cash_indication: string
}

const FormFieldInputDetailJobActivity = () => {
	return (
		<>
			<Row gutter={16}>
				<Col xs={24} md={8}>
					<Form.Item label={"Waktu Kedatangan"} name={"arrival_time"}>
						<DatePicker className="w-full" showTime />
					</Form.Item>
				</Col>
				<Col xs={24} md={8}>
					<Form.Item label={"Waktu Mulai"} name={"start_time"}>
						<DatePicker className="w-full" showTime />
					</Form.Item>
				</Col>
				<Col xs={24} md={8}>
					<Form.Item label={"Waktu Selesai"} name={"end_time"}>
						<DatePicker className="w-full" showTime />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col xs={24} md={8}>
					<Form.Item label={"Line Komunikasi"} name={"communication_line"}>
						<Input />
					</Form.Item>
				</Col>
				<Col xs={24} md={8}>
					<Form.Item label={"No. Direct Line"} name={"direct_line_number"}>
						<Input />
					</Form.Item>
				</Col>
				<Col xs={24} md={8}>
					<Form.Item label={"Operator Seluler"} name={"simcard_provider"}>
						<Input />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col xs={24} md={6}>
					<Form.Item label={"Supply Kertas"} name={"paper_supply"}>
						<InputNumber className="w-full" />
					</Form.Item>
				</Col>
				<Col xs={24} md={6}>
					<Form.Item label={"PIC Merchant"} name={"merchant_pic"}>
						<Input />
					</Form.Item>
				</Col>
				<Col xs={24} md={6}>
					<Form.Item label={"Phone"} name={"merchant_pic_phone"}>
						<Input />
					</Form.Item>
				</Col>
				<Col xs={24} md={6}>
					<Form.Item label={"Indikasi Gesek Tunai"} name={"swipe_cash_indication"}>
						<Input />
					</Form.Item>
				</Col>
			</Row>
		</>
	)
}

export default FormFieldInputDetailJobActivity
