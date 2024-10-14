import {  
  IBaseResponseService,  
  IPaginationRequest,  
  IPaginationResponse,  
} from "@smpm/models";  
import { DocMerchantModel } from "@smpm/models/documentModel";  
import axios from "@smpm/services/axios";  

export const findAll = async (  
  params: IPaginationRequest  
): Promise<IBaseResponseService<IPaginationResponse<DocMerchantModel>>> => {  
  const response = await axios.get("/document-merchant", { params });  
  return response.data;  
};  

export const findOne = async (id: number): Promise<IBaseResponseService<DocMerchantModel>> => {  
  const response = await axios.get(`/document-merchant/${id}`);  
  return response.data;  
}  

export const update = async (
  id: number,
  updateApproveDto: FormData
): Promise<IBaseResponseService<DocMerchantModel>> => {
  const response = await axios.patch(`/document-merchant/${id}`, updateApproveDto, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const remove = async (id: number): Promise<IBaseResponseService<void>> => {  
  const response = await axios.delete(`/document-merchant/${id}`);  
  return response.data;  
}  
