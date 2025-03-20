import { EmailTemplate } from "../../email/template-email";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
    email: string;
    name: string;
}

export default async function SendEmail({ email, name }: SendEmailParams) {
    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "Finalisation inscription",
            react: await EmailTemplate({ Name: name }),
        });

        if (error) {
            return { sucess: false, error: error.message, data: null };
        }
        return { success: true, data: data, error: null };
    } catch (error) {
        return { success: false, error, data: null };
    }
}
