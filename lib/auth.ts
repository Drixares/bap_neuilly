import { db } from "@/db"; // your drizzle instance
import { EmailTemplate } from "@/emails/email-template";
import { render } from "@react-email/components";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, magicLink } from "better-auth/plugins";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    plugins: [
        admin(), 
        nextCookies(), 
        magicLink({
            sendMagicLink: async ({ email, url }) => {
                const html = await render(
                    EmailTemplate({
                        url,
                    })
                );                

                await resend.emails.send({
                    from: process.env.RESEND_FROM_EMAIL || "Resend <onboarding@resend.dev>",
                    to: [email],
                    subject: "Finaliser votre inscription",
                    html,
                });

            }
        }),
    ],
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
});
