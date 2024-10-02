
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
  try {
    const response = await axios.get("/vendor", {
      params: param,
    })
    return response.data
  } catch (error) {
    console.error('Error in getVendor:', error);
    throw error;
  }
}

export const updateVendor = async (
  id: number,
  vendorData: Partial<IVendorModel>
): Promise<IBaseResponseService<IVendorModel>> => {
  try {
    const response = await axios.patch(`/vendor/${id}`, vendorData);
    return response.data;
  } catch (error: any) {
    console.error('Error in updateVendor:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'Server responded with an error');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error setting up the request');
    }
  }
};

export const getAllVendor = async (): Promise<
  IBaseResponseService<IVendorModel[]>
> => {
  try {
    const response = await axios.get("/vendor/get/all")
    return response.data
  } catch (error) {
    console.error('Error in getAllVendor:', error);
    throw error;
  }
}

export const createVendor = async (
  vendorData: Omit<IVendorModel, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'created_by' | 'updated_by'>
): Promise<IBaseResponseService<IVendorModel>> => {
  try {
    const response = await axios.post("/vendor", vendorData);
    return response.data;
  } catch (error) {
    console.error('Error in createVendor:', error);
    throw error;
  }
};
