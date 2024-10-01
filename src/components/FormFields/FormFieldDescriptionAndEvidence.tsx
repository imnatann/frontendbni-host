import { Form, Input } from "antd"
import UploadDragger from "../UploadDragger"

const { TextArea } = Input

const normFile = (e: any) => {
	if (Array.isArray(e)) {
		return e
	}
	return e?.fileList
}

export type FormFieldDescriptionAndEvidenceProps = {
	description: string
	evidence: FileList[]
	optional?: FileList[]
}

const FormFieldDescriptionAndEvidence = () => {
	return (
		<div>
			<Form.Item
				label={"Keterangan"}
				name={"information"}
				rules={[
					{
						required: true,
						message: "Dibutuhkan",
					},
				]}
			>
				<TextArea rows={4} />
			</Form.Item>
			<Form.Item
				name="evidence"
				valuePropName="evidence"
				getValueFromEvent={normFile}
				rules={[
					{
						required: true,
						message: "Dibutuhkan",
					},
				]}
			>
				<UploadDragger uploadText="Klik atau Tarik File untuk Upload Bukti Kunjungan" />
			</Form.Item>
			<Form.Item
				name="optional"
				valuePropName="optional"
				getValueFromEvent={normFile}
			>
				<UploadDragger uploadText="Klik atau Tarik File untuk Upload Foto Opsional" />
			</Form.Item>
		</div>
	)
}

export default FormFieldDescriptionAndEvidence
