import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "daryl.roberts@gmail.com",
    pass: process.env.SMTP_PASSWORD,
  },
});

export const mailer = (ctx, next) => {
  ctx.sendMail = (prefix, title, text) =>
    new Promise((resolve, reject) => {
      const subject = `Flink Community Packages - [${prefix}] - ${title}`;

      setTimeout(() => {
        if (!process.env.SMTP_PASSWORD) return;
        transporter.sendMail(
          {
            // @TODO this will change based on how this runs when it eventually
            // get sto apache.
            to: "daryl.roberts@gmail.com",
            from: "daryl.roberts@gmail.com",
            subject,
            text,
          },
          (err, info) => {
            if (err) reject(err);
            else resolve(info);
          }
        );
      });
    });
  return next();
};
