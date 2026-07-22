import { submitContactForm as submitCloudflareContactForm } from './cloudflare';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  product_id?: string;
  business_name?: string;
}

export async function submitContactForm(data: ContactFormData) {
  return submitCloudflareContactForm(data);
}
