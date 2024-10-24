// src/models/edcModel.ts

export interface ElectronicDataCaptureMachine {
  id: number;
  owner_id: number;
  merchant_id: number;
  mid: string;
  tid: string;
  brand: string;
  brand_type: string;
  serial_number: string;
  status_owner: string;
  status_owner_desc: string;
  status_machine: string;
  status_machine_desc: string;
  status_active: boolean;
  simcard_provider?: string;
  simcard_number: string;
  status_edc: string;
  info?: string;
  kondisibarang?: string;
  region: string;
  created_by?: number;
  updated_by?: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  owner: Owner;
  merchant: Merchant;
  ReceivedIn: ReceivedIn[]; // Jika relevan
  ReceivedOut: ReceivedOut[];
  ActivityVendorReport: ActivityVendorReport[];
}

export interface Owner {
  id: number;
  name: string;
  code: string;
  description: string | null;
  created_by: number | null;
  updated_by: number | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface Merchant {
  id: number;
  region_id: number;
  mid: string;
  name: string;
  category: string;
  customer_name: string;
  telephone: string;
  pic: string;
  phone1: string;
  phone2: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  district: string;
  subdistrict: string;
  city: string;
  province: string;
  postal_code: string;
  status: string;
  created_by: number | null;
  updated_by: number | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface ReceivedIn {
  // Definisikan properti yang sesuai jika diperlukan
}

export interface ReceivedOut {
  id: number;
  id_joborder: number;
  id_edc: number;
  id_region: number;
  id_vendor: number;
  id_merchant: number | null;
  petugas: string;
  kondisibarang: string;
  status: string;
  approved_by: number;
  created_by: number | null;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
  serial_number: string;
  tid: string;
  deleted_at: Date | null;
}

export interface ReceivedIn {
  id: number;
  id_joborder: number;
  id_edc: number;
  id_region: number;
  id_vendor: number;
  id_merchant: number | null;
  petugas: string;
  kondisibarang: string;
  status: string;
  approved_by: number;
  created_by: number | null;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
  serial_number: string;
  tid: string;
  deleted_at: Date | null;
}

export interface ActivityVendorReport {
  id: number;
  job_order_no: string;
  vendor_id: number;
  mid: string;
  nominal: string;
  tid: string;
  status: string;
  jenis: string;
  description: string;
  amount: number;
  petugas: string;
  edc_brand: string;
  edc_brand_type: string;
  edc_serial_number: string;
  edc_note: string;
  edc_action: string;
  information: string;
  arrival_time: Date;
  start_time: Date;
  end_time: Date;
  communication_line: string;
  direct_line_number: string;
  simcard_provider: string;
  paper_supply: string;
  merchant_pic: string;
  merchant_pic_phone: string;
  swipe_cash_indication: string;
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}


export interface GetEdcBrandTypeDto {
  brand: string;
}

export interface IFilterEDC {
  brand?: string;
  type?: string;
}
