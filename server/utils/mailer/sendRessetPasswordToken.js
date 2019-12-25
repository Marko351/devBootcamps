import nodemailer from 'nodemailer';
import ErrorResponse from '../errorResponse';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

export const sendRessetPasswordToken = async (options, user, next) => {
  return new Promise(async (resolve, reject) => {
    const message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message
    };

    const info = await transporter.sendMail(message, async function(error) {
      if (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        console.log(
          'Error from sending email for resset password token'.red,
          error
        );
        next(new ErrorResponse('Email could not be sent', 500, true));
      } else {
        console.log('Email for resset password error sent.'.green);
        resolve();
      }
    });
  });
};
