// src/services/edcService.ts

import {
	IBaseResponseService,
	IPaginationRequest,
	IPaginationResponse,
  } from "@smpm/models";
  import { ElectronicDataCaptureMachine } from "@smpm/models/edcModel";
  import axios from "@smpm/services/axios";
  
  interface IBulkCreateResponse {
	success: number;
	failed: number;
	errors: Array<{
	  row: number;
	  error: string;
	}>;
  }
  
  export const createDataEDC = async (data: any): Promise<any> => {
	const response = await axios.post("/electronic-data-capture", data);
	return response.data;
  };
  
  export const getReceivedInEDCs = async (
	filters: { brand?: string; type?: string }
  ): Promise<IBaseResponseService<ElectronicDataCaptureMachine[]>> => {
	const response = await axios.get("/electronic-data-capture/received-in", {
	  params: filters,
	});
	return response.data;
  };
  
  // Fetch Received Out EDCs
  export const getReceivedOutEDCs = async (
	filters: { brand?: string; type?: string }
  ): Promise<IBaseResponseService<ElectronicDataCaptureMachine[]>> => {
	const response = await axios.get("/electronic-data-capture/received-out", {
	  params: filters,
	});
	return response.data;
  };
  
  export const bulkCreateEDC = async (
	formData: FormData
  ): Promise<IBaseResponseService<IBulkCreateResponse>> => {
	try {
	  const response = await axios.post("/electronic-data-capture/bulk-create", formData, {
		headers: {
		  "Content-Type": "multipart/form-data",
		},
	  });
	  return response.data;
	} catch (error: any) {
	  console.error("Bulk Create EDC Error:", error);
	  throw error;
	}
  };
  
  export const getDataEDC = async (
	param: IPaginationRequest
  ): Promise<IBaseResponseService<IPaginationResponse<ElectronicDataCaptureMachine>>> => {
	const response = await axios.get("/electronic-data-capture", {
	  params: param,
	});
  
	// Pastikan untuk menambahkan properti 'key' ke setiap data item
	const dataWithKey = response.data.result.data.map((item: ElectronicDataCaptureMachine) => ({
	  ...item,
	  key: item.id, // Set key ke id
	}));
  
	return {
	  ...response.data,
	  result: {
		...response.data.result,
		data: dataWithKey,
	  },
	};
  };
  
  export const getBrand = async () => {
	const response = await axios.get("/electronic-data-capture/brand/show");
	return response.data;
  };
  
  export const getBrandType = async (params: { brand: string }) => {
	const response = await axios.get("/electronic-data-capture/brand-type/show", {
	  params,
	});
	return response.data;
  };
  
  export const getEDCById = async (id: number): Promise<ElectronicDataCaptureMachine> => {
	const response = await axios.get(`/electronic-data-capture/${id}`);
	return {
	  ...response.data.result, // Sesuaikan sesuai respons backend
	  key: response.data.result.id, // Tambahkan key untuk Ant Design Table
	};
  };
  
  // **Fungsi Baru: Memperbarui EDC**
  export const updateDataEDC = async (
	id: number,
	data: any
  ): Promise<ElectronicDataCaptureMachine> => {
	const response = await axios.patch(`/electronic-data-capture/${id}`, data);
	return {
	  ...response.data.result, // Sesuaikan sesuai respons backend
	  key: response.data.result.id, // Tambahkan key untuk Ant Design Table
	};
  };
  
  export const deleteDataEDC = async (id: number): Promise<any> => {
	const response = await axios.delete(`/electronic-data-capture/${id}`);
	return response.data;
  };
  
  // **Fungsi Baru: Mengambil EDC berdasarkan Merchant Id**
  export const getEDCsByMerchantId = async (
	merchantId: number
  ): Promise<ElectronicDataCaptureMachine[]> => {
	try {
	  const response = await axios.get(`/electronic-data-capture/merchant/${merchantId}`);
	  // Pastikan response.data.result.data adalah array
	  return Array.isArray(response.data.result.data) ? response.data.result.data : [];
	} catch (error: any) {
	  console.error(`Error fetching EDCs for Merchant ID ${merchantId}:`, error);
	  // Kembalikan array kosong jika terjadi kesalahan
	  return [];
	}
  };
  