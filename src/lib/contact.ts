import { supabase } from './supabase';
import emailjs from 'emailjs-com';

const SERVICE_ID = 'service_2k3zumn';
const TEMPLATE_ID = 'template_nz0rajl';
const PUBLIC_KEY = 'lEffOimipgzgEMs7t';

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
  try {
    // Step 1: Submit to Supabase
    const { error } = await supabase
      .from('contact_submissions')
      .insert([data]);

    if (error) throw error;

    // Step 2: Send email via EmailJS
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        source: data.source,
        product_id: data.product_id || 'N/A',
        business_name: data.business_name || 'N/A'
      },
      PUBLIC_KEY
    );

    return { success: true };
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
}