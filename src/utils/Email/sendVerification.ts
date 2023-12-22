
import dotenv from "dotenv";
import { sendCredentials } from "./sendMailGen.js";
import { createTransport } from 'nodemailer';
import { configure } from "./config.js";

dotenv.config();
export const VerifyEmail = async (email:string,name:string, code:string) => {
  console.log(name, email, code);
  const msg = {
    to: email,
    from: "ayiendaglen@gmail.com",
    subject: "Welcome to carhub",
    html: sendCredentials(name, email, code),
  };
 

  try {
    sendMail(msg);
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    // const result = await sgMail.send(msg);
    // if (result) {
    //   console.log(result);
    // }
  } catch (error) {
    console.error(error);
  }
};

const sendMail= (options:any) => {

  let config = {
    service : 'gmail',
    auth : {
        user: configure.EMAIL,
        pass: configure.PASSWORD
    }
}

let transporter = createTransport(config);

transporter.sendMail(options, (error: any, info: { response: string; }) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
  


};