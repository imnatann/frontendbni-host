import {
    IBaseResponseService,
    IPaginationRequest,
    IPaginationResponse,
  } from "@smpm/models";
import { DocVendorModel, IUpdateDocVendorDto } from "@smpm/models/documentModel";
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
    updateApproveDto: Partial<IUpdateDocVendorDto>
  ): Promise<IBaseResponseService<DocVendorModel>> => {
    const response = await axios.patch(`/document-vendor/${id}`, updateApproveDto);
    return response.data;
  }
  
  export const remove = async (id: number): Promise<IBaseResponseService<void>> => {
    const response = await axios.delete(`/document-vendor/${id}`);
    return response.data;
  }