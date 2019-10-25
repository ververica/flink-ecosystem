import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_ADDRESS,
        serviceClient: process.env.EMAIL_SERVICE_CLIENT,
        privateKey: eval(process.env.EMAIL_PRIVATE_KEY)
    }
});

export const mailer = (ctx, next) => {
    ctx.sendMail = (prefix, title, text) =>
        new Promise((resolve, reject) => {
            const subject = `flink-packages.org - [${prefix}] - ${title}`;

            setTimeout(() => {
                if (!process.env.EMAIL_PRIVATE_KEY) {
                    console.log(`Email delivery is disabled (trying to deliver email with subject '${subject}')`)
                    return;
                }
                try {
                    transporter.verify();
                    transporter.sendMail({
                            to: process.env.EMAIL_TO_ADDRESS,
                            from: process.env.EMAIL_ADDRESS,
                            subject,
                            text,
                        },
                        (err, info) => {
                            if (err) reject(err);
                            else resolve(info);
                        }
                    );
                } catch (err) {
                    console.error(err);
                }
            });
        });
    return next();
};