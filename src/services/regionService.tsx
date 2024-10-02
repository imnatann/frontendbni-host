
import {
  IBaseResponseService,
  IPaginationRequest,
  IPaginationResponse,
} from "@smpm/models"
import { IRegionModel } from "@smpm/models/regionModel"
import axios from "@smpm/services/axios"

export const getRegion = async (
  param: IPaginationRequest
): Promise<IBaseResponseService<IPaginationResponse<IRegionModel>>> => {
  const response = await axios.get("/region", {
    params: param,
  })
  return response.data
}

export const getAllRegion = async (): Promise<
  IBaseResponseService<IRegionModel[]>
> => {
  const response = await axios.get("/region/get/all")
  return response.data
}

export const updateRegion = async (
  id: string | number,
  data: Partial<IRegionModel>
): Promise<IBaseResponseService<IRegionModel>> => {
  const response = await axios.put(`/region/${id}`, data)
  return response.data
}
