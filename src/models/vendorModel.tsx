export interface IVendorModel {  
	id: number;  
	name: string;  
	code: string;  
	jenis: string;
	description: string | null;  
	created_by: number;  
	updated_by: number;  
	created_at: string;  
	updated_at: string;  
	deleted_at: string | null;  
  }