
import {
  IBaseResponseService,
  IPaginationRequest,
  IPaginationResponse,
} from "@smpm/models";
import { IAuditTrail } from "@smpm/models/auditModel";
import axios from "@smpm/services/axios";

export const getAuditTrails = async (
  param: IPaginationRequest
): Promise<IBaseResponseService<IPaginationResponse<IAuditTrail>>> => {
  try {
    const response = await axios.get("/audit", {
      params: {
        page: param.page,
        take: param.take,
        order: param.order,
        search: param.search,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching audit trails:', error);
    throw error;
  }
};

export const exportAuditTrails = async (
  param: IPaginationRequest
): Promise<Blob> => {
  const response = await axios.get("/audit/export", {
    params: param,
    responseType: 'blob',
  });
  return response.data;
};
