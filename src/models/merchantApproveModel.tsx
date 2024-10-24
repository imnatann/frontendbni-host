export interface IApproveMerchantModel {
  id?: number;
  merchant_id?: number;
  type: 'Add' | 'Edit' | 'Delete';
  status: 'Waiting' | 'Approved' | 'Rejected';
  reason?: string;
  info_remark?: string;
  DataBefore: string;
  DataAfter: string;
  approved_by?: number;
  rejected_by?: number;
  created_by?: number;
  updated_by?: number;
  created_at?: Date | string; // Bisa menggunakan Date jika data menggunakan tipe Date
  updated_at?: Date | string;
  deleted_at?: Date | string;

  merchant?: IMerchantModel;
}

export interface IMerchantModel {
  id?: number;
  region_id: number;
  mid: string;
  name: string;
  category: string;
  customer_name: string;
  telephone?: string;
  pic: string;
  phone1: string;
  phone2?: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  district?: string;
  subdistrict?: string;
  city?: string;
  province?: string;
  postal_code: string;
  status: string;
  created_by?: number;
  updated_by?: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;

  region?: IRegionModel;
}

export interface IRegionModel {
  id: number;
  name: string;
  // Tambahkan field lain sesuai kebutuhan
}
