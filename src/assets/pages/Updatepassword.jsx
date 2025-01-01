import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Updatepassword = () => {
    const nav = useNavigate()

    const passwordUpdate = async(e) => {
        e.preventDefault()
        if(!e.target.newpassword.value) return alert('Enter new password')
        if(!e.target.confirmPassword.value) return alert("Enter confirm password")
        const data = {
            newpassword:e.target.newpassword.value,
            confirmPassword: e.target.confirmPassword.value
        }
        try{
            const responce = await axios.put("http://localhost:4000/api/admin/update-password", data)
            if(responce.status == 200) return nav('/')
            alert("password updated successfully")

        }
        catch(err) {
            console.log(err)
            if(err.status == 401) return alert(err.response.data.message)

        }
        

    }

    return (

        <>
            <section className="loginpage w-[100%] h-[100vh] flex justify-center items-center bg-slate-700">
                <div className="logindiv shadow-[2px_2px_5px_white] border-[2px] border-black h-[90%] w-[95%] rounded-[40px] relative">


                    <form action="" onSubmit={passwordUpdate} className='text-white bg-white bg-opacity-10 backdrop-blur-sm w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%] rounded-[20px] p-[10px] border-[1px] border-white absolute top-[40%] left-[50%] translate-y-[-50%] translate-x-[-50%]'>
                        <input
                            className='block w-full mb-[20px] mt-[7px] focus:outline-none bg-transparent border-b-[1px] border-white rounded-[10px] p-[10px_40px]'
                            type="text"
                            name='newpassword'
                            placeholder='new password'
                        />
                        <input
                            className='block w-full mb-[20px] mt-[7px] focus:outline-none bg-transparent border-b-[1px] border-white rounded-[10px] p-[10px_40px]'
                            type="text"
                            name='confirmPassword'
                            placeholder='confirm new password'
                        />
                        <button
                            className='block m-auto  rounded-[15px] text-center border p-[6px_10px] cursor-pointer hover:shadow-[1px_1px_2px_lightblue]'
                            type='submit'
                        >
                            Update Password
                        </button>


                    </form>


                </div>


            </section>

        </>
    )
}

export default Updatepassword
