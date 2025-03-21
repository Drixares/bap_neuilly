"use server"

import { verifyToken as serverVerifyToken } from "@/lib/email-token";

export async function verifyTokenAction(token: string) {
  try {
    const decoded = await serverVerifyToken(token);
    // Return only what the client needs
    return { 
      success: true, 
      email: typeof decoded === 'object' && 'email' in decoded 
        ? String(decoded.email) 
        : null 
    };
  } catch (error) {
    return { success: false, email: null, message: error.message };
  }
}