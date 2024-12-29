import React, { useState } from 'react'
// import bg from "../images/bg-presentation.889630297390d27e8dfb.jpg"
import { VscAccount } from "react-icons/vsc";
import { MdOutlineLockOpen } from "react-icons/md";
import { MdPassword } from "react-icons/md";

const Login = () => {
  const [whenForget, setwhenForget] = useState(true)
  const [ifotp, setifOtp] = useState(true)
  const [genrateotp, setgenrateotp] = useState("Genrate OTP")

  const onforgetdiv = () => {
    if (whenForget === true) {
      setwhenForget(false)
    }
    else {
      setwhenForget(true)
    }


  }

  const OTPfunction = (e) => {
    e.preventDefault()
    setifOtp(false)
    setgenrateotp("Regenrage OTP")
    let otp = 10;
    const otpintervel = setInterval(() => {
      otp--
      setgenrateotp(`Regenrage OTP in ${otp}`)
      if (otp === 0) {
        clearInterval(otpintervel)
        setifOtp(true)
        setgenrateotp("Genrate OTP")
      }

    }, 1000)

  }
  return (
    <>
      <section className="loginpage w-[100%] h-[100vh] flex justify-center items-center bg-slate-700">
        <div className="logindiv shadow-[2px_2px_5px_white] border-[2px] border-black h-[90%] w-[95%] rounded-[40px] relative">
          <form action="" className='text-white bg-white bg-opacity-10 backdrop-blur-sm w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%] rounded-[20px] p-[10px] border-[1px] border-white absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>
            <h2 className='text-center font-bold text-[20px] text-white'>LOGIN</h2>
            {
              (whenForget) ?
                <div className=''>
                  <label htmlFor="" className='text-white m-[10px] text-[17px]'>Username</label>
                  <div className='relative'>
                    <input
                      className='block w-full mb-[20px] m-[10px_0px] focus:outline-none bg-transparent border-b-[1px] border-white rounded-[10px] p-[10px_40px]'
                      type="email"
                      name='USERNAME'
                      placeholder='Type Your Username' />
                    <i className='absolute top-[37%] left-[10px] opacity-60'><VscAccount /></i>
                  </div>

                  <label htmlFor="" className='text-white m-[10px] text-[17px]'>Password</label>
                  <div className='relative'>
                    <input
                      className='block w-full mt-[10px] focus:outline-none bg-transparent border-b-[1px] border-white rounded-[10px] p-[10px_40px]'
                      type="password"
                      name='PASSWORD'
                      placeholder='Type Your Password' />
                    <i className='opacity-60 absolute top-[37%] left-[10px]'><MdOutlineLockOpen /></i>
                  </div>
                </div>
                :
                <div>
                  <label htmlFor="" className='text-white m-[10px] text-[17px]'>Current email</label>
                  <div className='relative'>
                    <input
                      className='block w-full mb-[20px] mt-[7px] focus:outline-none bg-transparent border-b-[1px] border-white rounded-[10px] p-[10px_40px]'
                      type="email"
                      name='USERNAME'
                      placeholder='Type Your Username' />
                    <i className='absolute top-[37%] left-[10px] opacity-60'><VscAccount /></i>
                  </div>

                  <div className='relative' style={{ display: (ifotp) ? "none" : "block" }} >
                    <input
                      className='block w-full mb-[20px] mt-[7px] focus:outline-none bg-transparent border-b-[1px] border-white rounded-[10px] p-[10px_40px]'
                      type="email"
                      name='USERNAME'
                      placeholder='Enter OTP'
                    />
                    <i className='absolute top-[37%] left-[10px] opacity-60'><MdPassword />
                    </i>
                  </div>

                  <button className='border rounded-[10px] p-[10px]' onClick={OTPfunction}>
                    {genrateotp}
                  </button>



                </div>
            }
            <div className='flex justify-end'>  <div className='text-right m-[20px_0px] cursor-pointer hover:text-blue-500 inline-block' onClick={onforgetdiv}><small>{(whenForget)?"Forget Password":"Already have a account"}</small></div>
            </div>

           
            <div style={{ display: (whenForget) ? "block" : "none" }} className='rounded-[40px] text-center border p-[6px_10px] cursor-pointer hover:shadow-[]'>Login</div>
            <div style={{ display: (whenForget) ? "none" : "block" }} className='rounded-[40px] text-center border p-[6px_10px] cursor-pointer hover:shadow-[]'>Submit</div>
            
   
   

          </form>


        </div>


      </section>

    </>
  )
}

export default Login
