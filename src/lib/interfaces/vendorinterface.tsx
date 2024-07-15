export interface Vendor {
  id: number;
  uid: string;
  username: string;
  isAdmin: boolean;
  isApproved: boolean;
  isVendor: boolean;
  email: string;
  address: string;
  age: number;
  name: string;
  license_number: string;
  country: string;
  city: string;
  services_description: string;
  mobile: string;
  document_tradelicense: string;
  document_other: string;
  created_at: string; // Alternatively, use Date if you want to handle it as a Date object
}
