import { useEffect, useState } from 'react'
import { Authenticate, initOTPless, verifyOTP } from '../utils/initOtpless'

function Home() {
	const [phone, setPhone] = useState('');
	const [otp, setOtp] = useState('');
	const[isDisabled,setIsDisabled] = useState(false);
	const[showButton,setshowButton] = useState(false);;
	const [timer, setTimer] = useState(0);


	  useEffect(() => {
		let interval;
		if (showButton && timer > 0) {
		  interval = setInterval(() => {
			setTimer((prev) => prev - 1);
		  }, 1000);
		} else if (timer === 0) {
			setshowButton(false); // Enable the button again
		}
		return () => clearInterval(interval);
	  }, [showButton, timer]);

	useEffect(() => initOTPless(handleUserData), [])
	/** handleUserData - otpless callback function
	 * @description
	 * This function is called after authentication is done, by otpless-sdk.
	 * Use this function to further process the otplessUser object, navigate to next page or perform any other action based on your requirement.
	 * @param {Object} otplessUser
	 * @returns {void}
	 */
	const handleUserData = (otplessUser) => {
		// Replace the following code with your own logic
		console.log(otplessUser)
		alert(JSON.stringify(otplessUser))
	}
	return (
		<div id='home-page'>
				<div id='mobile-section'>
					<input id='mobile-input' placeholder='Enter mobile number' onChange={(e) => setPhone(e.target.value)} />
				
						<button 
							onClick={
									() => Authenticate({ channel: 'PHONE', phone }).then((res) => 
										{
											if (res.success) {
											document.getElementById('mobile-input').disabled = true
											setIsDisabled(true);
											setshowButton(true);
											console.log("Otp triggered")
											setTimer(30); // Start the timer at 30 seconds
										}
									})
									} 
							disabled={showButton}
						
						>
							Proceed
						</button>
					
					
				</div>


				
				{isDisabled && (
					<div id='otp-section' >
					<input id='otp-input' placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)} minLength={6} maxLength={6} />
					<button onClick={
							() => verifyOTP({ channel: "PHONE",otp,phone }).then((res) => {
								console.log(res)
									if (res.success) {
									document.getElementById('otp-input').disabled = true
									setOtp('Verified')
									}
							})}>
								Verify OTP
					</button>
			
			</div>)}
				
		</div>
	)
}
export default Home
