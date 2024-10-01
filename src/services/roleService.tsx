import {
  IBaseResponseService,
  IPaginationRequest,
  IPaginationResponse,
} from "@smpm/models";
import axios from "@smpm/services/axios";

export const getRole = async (
  param: IPaginationRequest
): Promise<IBaseResponseService<IPaginationResponse<any>>> => {
  const response = await axios.get("/role", {
    params: param,
  });
  return response.data;
};
