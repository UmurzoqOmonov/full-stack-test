const AppError = require("../appError");

exports.sendVerificationSMS = async ({ to, vercode, next }) => {
  console.log(to, vercode);
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  return (message = client.messages
    .create({ from: "+18156571798", body: vercode, to: `+${to}}` })
    .then((message) => console.log(message.sid)));

  //   try {
  //     const message = await client.messages.create({
  //       from: "+12566769646",
  //       body: vercode,
  //       to: `${to}`,
  //     });
  //     return message;
  //   } catch (error) {
  //     console.log(error);
  //     // next(new AppError())
  //   }
};
