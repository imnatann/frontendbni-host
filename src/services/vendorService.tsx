import {
	IBaseResponseService,
	IPaginationRequest,
	IPaginationResponse,
} from "@smpm/models"
import { IVendorModel } from "@smpm/models/vendorModel"
import axios from "@smpm/services/axios"

export const getVendor = async (
	param: IPaginationRequest
): Promise<IBaseResponseService<IPaginationResponse<IVendorModel>>> => {
	const response = await axios.get("/vendor", {
		params: param,
	})
	return response.data
}

export const getAllVendor = async (): Promise<
	IBaseResponseService<IVendorModel[]>
> => {
	const response = await axios.get("/vendor/get/all")
	return response.data
}
