const verifyEmailTemplate = ({ name, url }) => {
  return `
        <div>Dear ${name}</div>
        <div>Thank you registering at'Dharohar Mart'</div>
        <div>Please verify your account .</div>
        <a href=${url} style="color:black;background :orange;margin-top : 10px,padding:20px,display:block">
            Verify Email
        </a>
    
    `;
};

export default verifyEmailTemplate;
