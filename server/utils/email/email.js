const nodemailer = require("nodemailer");
const AppError = require("../appError");

const sendMailFn = (to, verificationCode, subjectText, next) => {
  const inputText = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
  
      <style>
        *,
        *::after,
        *::before {
          margin: 0;
          padding: 0;
          box-sizing: inherit;
        }
  
        body {
          box-sizing: border-box;
        }
        htm {
          font-size: 62.5%;
        }
        .container {
          width: 70%;
          margin: 5rem auto;
        }
        .container > * {
          margin-bottom: 2rem;
        }
  
        .container > h1 {
          font-size: 3rem;
        }
  
        .container > h3 {
          font-size: 2.2rem;
        }
  
        .container > p {
          font-size: 1.6rem;
          color: blue;
        }
  
        .container > p > strong {
          color: black;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>${subjectText}</h1>
        <h3>Hi ${to}! This is your vreification code</h3>
        <div><a href="http://192.168.60.116:3000/verify/${verificationCode}">Verify Link</a></div>
      </div>
    </body>
  </html>
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp-mail.outlook.com",
    // port: 587,
    auth: {
      user: "omonovumurzoq893@gmail.com",
      pass: "wciottftlrfcvfla",
    },
  });
  //email  wciottftlrfcvfla
  const mailOptions = {
    from: "ommonovumurzoq893@gmail.com",
    to: to,
    subject: subjectText,
    html: inputText,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return next(new AppError(`${error.message}`, 404));
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMailFn;
