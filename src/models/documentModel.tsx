export interface DocMerchantModel {
  merchant_name: string;
  file1: string;
  file2: string;
  location: string;
}

export interface IUpdateDocMerchantDto {
  file1?: string;
  file2?: string;
  updated_by?: number;
}

export interface DocVendorModel {  
  name: string;  
  jenis_jo: string;  
  vendor_name: string;  
  merk_edc: string;  
  tipe_edc: string;  
  tanggal_masuk: string;  
  file1: string;  
  file2: string;  
}

export interface IUpdateDocVendorDto {
  file1?: string;
  file2?: string;
  updated_by?: number;
}
