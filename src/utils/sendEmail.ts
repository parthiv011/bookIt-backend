import { createTransport } from 'nodemailer';

interface EmailTypes {
  to: string;
  subject: string;
  text: string;
}
// export const sendEmail = async ({ to, subject, text }: EmailTypes) => {
//   const transporter = createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   await transporter.sendMail({
//     to,
//     subject,
//     text,
//   });
// };
