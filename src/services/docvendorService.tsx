import {
    IBaseResponseService,
    IPaginationRequest,
    IPaginationResponse,
  } from "@smpm/models";
import { DocVendorModel } from "@smpm/models/documentModel";
   import axios from "@smpm/services/axios";
  
  export const findAll = async (
    params: IPaginationRequest
  ): Promise<IBaseResponseService<IPaginationResponse<DocVendorModel>>> => {
    const response = await axios.get("/document-vendor", { params });
    return response.data;
  };
  
  export const findOne = async (id: number): Promise<IBaseResponseService<DocVendorModel>> => {
    const response = await axios.get(`/document-vendor/${id}`);
    return response.data;
  }
  
  export const update = async (
    id: number,
    updateApproveDto: FormData
  ): Promise<IBaseResponseService<DocVendorModel>> => {
    const response = await axios.patch(`/document-vendor/${id}`, updateApproveDto, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };
  
  export const remove = async (id: number): Promise<IBaseResponseService<void>> => {
    const response = await axios.delete(`/document-vendor/${id}`);
    return response.data;
  }