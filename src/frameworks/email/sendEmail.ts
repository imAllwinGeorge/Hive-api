import transporter from "./nodemailerClient.js"

export const sendMail = async (
    email: string,
    subject: string,
    text: string,
) => {
    const info = await transporter.sendMail({
        to: email,
        subject,
        text,
        html: `<b>${text}</b>`,
    });

    return info;
}