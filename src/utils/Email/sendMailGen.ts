import Mailgen from "mailgen";

export const sendCredentials = (name:string, email:string, code:string) => {
  // Initialize Mailgen
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'CULTIFY TOMATOE PREDICTOR',
      link: 'https://cultifydetector.vercel.app/',
      logo: 'https://selectivegardener.com/images/products/3539.png'
    }
  });
    // Generate the email body with verification URL link and expiration timestamp
    const expirationTime =12 * 60 * 60 * 1000; // 12 hours in milliseconds
    const expirationTimestamp = Date.now() + expirationTime;

const verificationLink = `http://localhost:5173/verifying?email=${email}&code=${code}&e=${expirationTimestamp}`;

  
  // Generate the email content
  const emailContent = {
    body: {
        name: `${name}`,
        intro: `Dear ${name},\n\nThank you for registering for our website! Before you can start using your account, we need to verify your email address. Please click on the following link to complete the verification process:`,
        action: {
          instructions: 'Verification Link:',
          button: {
            color: '#22BC66',
            text: 'Verify Email Address',
            link: verificationLink
          }
        },
        outro: 'Please note that this link is only valid for the next 12 hours. After that, you will need to request a new verification email.\n\nThank you for your cooperation.'
      }
  };
  const emailBody = mailGenerator.generate(emailContent);
  return emailBody;
};