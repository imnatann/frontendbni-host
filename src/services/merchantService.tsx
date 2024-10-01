import {
  IBaseResponseService,
  IPaginationRequest,
  IPaginationResponse,
} from "@smpm/models";
import { IMerchantModel } from "@smpm/models/merchantModel";
import axios from "@smpm/services/axios";

export const createDataMerchant = async (
  data: IMerchantModel
): Promise<any> => {
  const response = await axios.post("/merchant", data);
  return response.data;
};

export const updateDataMerchant = async (
  data: IMerchantModel
): Promise<any> => {
  const response = await axios.patch(`/merchant/${data.id}`, data);
  return response.data;
};

export const getDataMerchant = async (
  param: IPaginationRequest
): Promise<IBaseResponseService<IPaginationResponse<IMerchantModel>>> => {
  const response = await axios.get("/merchant", {
    params: param,
  });
  return response.data;
};

export const getDataMerchantById = async (
  id: number
): Promise<IBaseResponseService<IMerchantModel>> => {
  const response = await axios.get(`/merchant/${id}`);
  return response.data;
};

export const deleteDataMerchant = async (
  id: number
): Promise<IBaseResponseService<IMerchantModel>> => {
  const response = await axios.delete(`/merchant/${id}`);
  return response.data;
};
