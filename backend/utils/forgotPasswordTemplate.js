const forgotPasswordTemplate = ({ name, otp })=>{
    return `
<div>
    <p>Dear, ${name}</p>
    <p>You've requested a password reset. Please use following OTP code to reset your password.</p>
    <div style="background: blue; font-size:20px;padding:20px;text-align:center;font-weight : 800;">
        ${otp}
    </div>
    <p>The otp is valid for 1 hour only. Enter the otp to proceed to reset your password.</p>
    <br/>
    </br>
    <p>Thank You</p>
    <p>From-</p>
    <p>Dharohar Mart</p>
</div>
    `
}

export default forgotPasswordTemplate