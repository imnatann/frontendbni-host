import { Checkbox, Col, Form, Row } from "antd"

const CheckboxGroup = Checkbox.Group

const EDC_DONGLE_CHECKLIST = [
	{ label: "Tutup Baterai", value: "battery_cover" },
	{ label: "Baterai", value: "battery" },
	{ label: "Adaptor Dongle", value: "edc_adapter" },
	{ label: "Adaptor EDC", value: "edc_bracket" },
	{ label: "Bracket EDC", value: "edc_holder" },
	{ label: "Dudukan Dongle", value: "dongle_holder" },
	{ label: "Dudukan EDC", value: "dongle_adapter" },
	{ label: "Kabel ECR", value: "cable_ecr" },
	{ label: "Kabel LAN", value: "cable_lan" },
	{ label: "Kabel Line Telepon", value: "cable_telephone_line" },
	{ label: "Label MID/TID", value: "mid_tid" },
	{ label: "Magic Box", value: "magic_box" },
	{ label: "Panduan Transaksi", value: "transaction_guide" },
	{ label: "Pin Cover", value: "pin_cover" },
	{ label: "Spliter Line Telepon", value: "telephone_line_splitter" },
	{ label: "Sticker Bank", value: "sticker_bank" },
	{ label: "Sticker Dongle", value: "sticer_dongle" },
	{ label: "Sticker GPN", value: "sticer_gpn" },
	{ label: "Sticker QR Code", value: "sticker_qrcode" },
]

const PROMOTIONAL_MATERIAL_CHECKLIST = [
	{ label: "Flayer", value: "flyer" },
	{ label: "Tendcard", value: "tent_card" },
	{ label: "Card Holder", value: "holder_card" },
	{ label: "Pen Holder", value: "holder_pen" },
	{ label: "Bill Holder", value: "holder_bill" },
	{ label: "Sign Pad", value: "sign_pad" },
	{ label: "Pen", value: "pen" },
	{ label: "Acrylic Open Close", value: "acrylic_open_close" },
	{ label: "Sticker Logo", value: "logo_sticker" },
	{ label: "Banner", value: "banner" },
]

const TRAINING_MATERIAL_CHECKLIST = [
	{ label: "Fraud Awareness", value: "fraud_awareness" },
	{ label: "Sale/Void/Settlement/Logon", value: "sale_void_settlement_logon" },
	{ label: "Installment", value: "installment" },
	{ label: "Audit Report", value: "audit_report" },
	{ label: "Top Up", value: "top_up" },
	{ label: "Redeem Point", value: "redeem_point" },
	{ label: "Cardver/Pre Auth/Offline", value: "cardverif_preauth_offline" },
	{ label: "Manual Key In", value: "manual_key_in" },
	{ label: "Tips and Adjust", value: "tips_adjust" },
	{ label: "Mini ATM", value: "mini_atm" },
	{ label: "Fare & Non Fare", value: "fare_non_fare" },
	{ label: "DCC/Download BIN", value: "dcc_download_bin" },
	{ label: "First Level Maintenance", value: "first_level_maintenance" },
	{
		label: "Penyimpanan Struk Transaksi",
		value: "transaction_receipt_storage",
	},
]

type JobChecklistProps = {
	hide?: boolean
}

const JobChecklist: React.FC<JobChecklistProps> = ({ hide }) => {
	return (
		<div style={{ display: hide ? "none" : "block" }}>
			<Row>
				<Col xs={12} md={8}>
					<Form.Item label={"Kelengkapan EDC Dongle"} name={"edc_dongle_equipment"}>
						<CheckboxGroup
							options={EDC_DONGLE_CHECKLIST}
							style={{ display: "grid" }}
						/>
					</Form.Item>
				</Col>
				<Col xs={12} md={8}>
					<Form.Item label={"Material Promo"} name={"material_promo"}>
						<CheckboxGroup
							options={PROMOTIONAL_MATERIAL_CHECKLIST}
							style={{ display: "grid" }}
						/>
					</Form.Item>
				</Col>
				<Col xs={12} md={8}>
					<Form.Item label={"Materi Training"} name={"material_training"}>
						<CheckboxGroup
							options={TRAINING_MATERIAL_CHECKLIST}
							style={{ display: "grid" }}
						/>
					</Form.Item>
				</Col>
			</Row>
		</div>
	)
}

export default JobChecklist
