import {
	IBaseResponseService,
	IPaginationRequest,
	IPaginationResponse,
} from "@smpm/models"
import {
	IFormInputImportJobOrder,
	IJobOrderModel,
} from "@smpm/models/jobOrderModel"
import axios from "@smpm/services/axios"
import { saveAs } from "file-saver"

export const getOpenJobOrder = async (
	param: IPaginationRequest
): Promise<IBaseResponseService<IPaginationResponse<IJobOrderModel>>> => {
	const response = await axios.get("/job-order/open", {
		params: param,
	})
	return response.data
}

export const getActivityJobOrder = async (
	param: IPaginationRequest
): Promise<IBaseResponseService<IPaginationResponse<IJobOrderModel>>> => {
	const response = await axios.get("/job-order/activity", {
		params: param,
	})
	return response.data
}

export const downloadTemplateJobOrderNew = async () => {
	const response = await axios.get("/job-order/template/download", {
		responseType: "blob",
	})

	const filenameMatch =
		response.headers["content-disposition"].match(/filename=([^;]+)/)
	const filename = filenameMatch
		? filenameMatch[1].trim()
		: "job-order-template.xlsx"

	saveAs(response.data, filename)
}

export const downloadTemplateJobOrderAcknowledge = async () => {
	const response = await axios.get("/job-order/template-acknowledge/download", {
		responseType: "blob",
	})

	const filenameMatch =
		response.headers["content-disposition"].match(/filename=([^;]+)/)
	const filename = filenameMatch
		? filenameMatch[1].trim()
		: "job-order-acknowledge-template.xlsx"

	saveAs(response.data, filename)
}

export const uploadJobOrderNew = async (data: IFormInputImportJobOrder) => {
	const response = await axios.post("/job-order/bulk/upload", data, {
		headers: { "content-type": "multipart/form-data" },
	})
	return response.data
}

export const uploadJobOrderAcknowledge = async (
	data: IFormInputImportJobOrder
) => {
	const response = await axios.post("/job-order/bulk/acknowledge", data, {
		headers: { "content-type": "multipart/form-data" },
	})
	return response.data
}

export const findJobOrder = async (no_jo: string) => {
	const response = await axios.get(`/job-order/${no_jo}/show`)
	return response.data
}

export const jobOrderActivity = async (payload: any) => {
	const response = await axios.post(`/job-order/activity`, payload, {
		headers: { "content-type": "multipart/form-data" },
	})
	return response.data
}
