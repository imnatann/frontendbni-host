
import axios from "@smpm/services/axios";
import { IAuditTrail } from "@smpm/models/auditModel";

interface ApiResponse {
  status: {
    code: number;
    description: string;
  };
  result: {
    result: IAuditTrail[];
  };
}

export const getAuditTrails = async (): Promise<ApiResponse> => {  
  try {  
    const response = await axios.get<ApiResponse>("/audit/all");  
    return response.data;
  } catch (error) {  
    console.error('Error fetching audit trails:', error);  
    throw error;
  }  
};