import {
	IBaseResponseService,
	IPaginationRequest,
	IPaginationResponse,
} from "@smpm/models"
import { ElectronicDataCaptureMachine } from "@smpm/models/edcModel"
import axios from "@smpm/services/axios"

export const createDataEDC = async (data: any): Promise<any> => {
	const response = await axios.post("/electronic-data-capture", data)
	return response.data
}

export const getDataEDC = async (
	param: IPaginationRequest
): Promise<
	IBaseResponseService<IPaginationResponse<ElectronicDataCaptureMachine>>
> => {
	const response = await axios.get("/electronic-data-capture", {
		params: param,
	})
	return response.data
}

export const getBrand = async () => {
	const response = await axios.get("/electronic-data-capture/brand/show")
	return response.data
}

export const getBrandType = async (params: { brand: string }) => {
	const response = await axios.get("/electronic-data-capture/brand-type/show", {
		params,
	})
	return response.data
}
