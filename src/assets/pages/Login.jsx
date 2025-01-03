import React, { useState } from 'react'
// import bg from "../images/bg-presentation.889630297390d27e8dfb.jpg"
import { VscAccount } from "react-icons/vsc";
import { MdOutlineLockOpen } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const nav = useNavigate()
  const [whenForget, setwhenForget] = useState(true)
  const [ifotp, setifOtp] = useState(true)
  const [genrateotp, setgenrateotp] = useState("Genrate OTP")
  const [admindata, setadmindata] = useState({})
  const [dsblbtn, setdsblbtn] = useState(false)
  const [desableform, setdesableform] = useState(true)

  const onforgetdiv = () => {
    if (whenForget === true) {
      setwhenForget(false)
    }
    else {
      setwhenForget(true)
    }
  }
  const otpgenrate = async (e) => {
    e.preventDefault()
    if (!admindata.currentmail) return alert("please enter your current email")
    try {
      const responce = await axios.post("http://localhost:4000/api/admin/generate-otp", admindata)
      console.log(responce)
      admindata.otp = ""
      setifOtp(false)
      setgenrateotp("Regenrage OTP")
      setdsblbtn(true)
      let otp = 60;
      const otpintervel = setInterval(() => {
        otp--
        setgenrateotp(`Regenrage OTP in ${otp}`)
        if (otp === 0) {
          clearInterval(otpintervel)
          setifOtp(true)
          setgenrateotp("Genrate OTP")
          setdsblbtn(false)
        }
      }, 1000)
    }
    catch (err) {
      alert(err.response.data.message)
    }

  }


  const loginadmin = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!e.target.USERNAME.value) return alert("Please enter your username")
    if (!e.target.PASSWORD.value) return alert("Please enter your password")
    const data = {
      email: e.target.USERNAME.value,
      password: e.target.PASSWORD.value
    }
    console.log(data)
    try {
      const responce = await axios.post("https://stark-server.onrender.com/api/admin/admin-login", data)
      if (responce.status !== 200) return alert("Invalid username or password")
      nav("/deshboard")
      alert("Successfully logged in")
    }
    catch (err) {
      if (err.status == 401) return alert(err.response.data.message)
    }
  }

  const checkingotp = async (e) => {
    e.preventDefault()
    try {
      const responce = await axios.post(`http://localhost:4000/api/admin/verify-otp`, admindata)
      console.log(responce)
      if (responce.status == 200) return nav("/update-password")

    }
    catch (err) {
      if (err.status == 400) return alert("Invalid otp")
    }
  }




  console.log(admindata)

  return (
    <>
      <section className="loginpage w-[100%] h-[100vh] flex justify-center items-center bg-slate-700">
        <div className="logindiv shadow-[2px_2px_5px_white] border-[2px] border-black h-[90%] w-[95%] rounded-[40px] relative">
          <form action="" style={{ display: desableform }} onSubmit={loginadmin} className='text-white bg-white bg-opacity-10 backdrop-blur-sm w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%] rounded-[20px] p-[10px] border-[1px] border-white absolute top-[40%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>
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
                      placeholder='Type Your Username'
                      value={admindata.currentmail}
                      onChange={(e) => { setadmindata({ ...admindata, currentmail: e.target.value }) }} />
                    <i className='absolute top-[37%] left-[10px] opacity-60'><VscAccount /></i>
                  </div>

                  <div className='relative' style={{ display: (ifotp) ? "none" : "block" }} >
                    <input
                      className='block w-full mb-[20px] mt-[7px] focus:outline-none bg-transparent border-b-[1px] border-white rounded-[10px] p-[10px_40px]'
                      type="email"
                      name='USERNAME'
                      value={admindata.otp}
                      onChange={(e) => { setadmindata({ ...admindata, otp: e.target.value }) }}
                      placeholder='Enter OTP'
                    />
                    <i className='absolute top-[37%] left-[10px] opacity-60'><MdPassword />
                    </i>
                  </div>

                  <button className='border rounded-[10px] p-[10px]' onClick={otpgenrate} disabled={dsblbtn}>
                    {genrateotp}
                  </button>



                </div>
            }
            <div className='flex justify-end'>  <div className='text-right m-[20px_0px] cursor-pointer hover:text-blue-500 inline-block' onClick={onforgetdiv}><small>{(whenForget) ? "Forget Password" : "Already have a account"}</small></div>
            </div>


            <button
              style={{ display: (whenForget) ? "none" : "block" }}
              className='block m-auto w-[100px] rounded-[40px] text-center border p-[6px_10px] cursor-pointer hover:shadow-[]'
              type='submit'
              onClick={checkingotp}
            >
              Submit
            </button>
            <button
              style={{ display: (whenForget) ? "block" : "none" }}
              className='block m-auto w-[100px] rounded-[40px] text-center border p-[6px_10px] cursor-pointer hover:shadow-[]'
              type='submit'
            >
              Login
            </button>
          </form>




        </div>


      </section>

    </>
  )
}

export default Login
