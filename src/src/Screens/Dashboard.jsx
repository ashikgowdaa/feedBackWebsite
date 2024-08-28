import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { ButtonComponent } from '../Components/Button/Button';
import ModalComponent from '../Components/Modal/Modal';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate()


    // USE STATE 

    const [moadlOpen, setModalOpen] = useState(false)


    const handleClick = () => {
        setModalOpen(true)
    }

    const handleNavigate = () => {
        navigate('form-creation')
    }


    return (
        <>
            <div className="p-5 flex flex-wrap gap-5 ">
                <div className="bg-white w-3/12 h-auto flex flex-col items-center justify-center gap-5 rounded-md shadow-lg cursor-pointer" onClick={handleClick} >
                    <PlusOutlined style={{
                        color: 'blue',
                        fontSize: '64px',
                    }} />
                    <h3 className='font-bold'>New Form</h3>
                </div>

                {/* CREATED FORM DISPLAY */}
                <div className="bg-white w-3/12 h-auto flex flex-col items-center justify-between gap-5 rounded-md shadow-lg ">
                    <div className="bg-[#F5D563] w-full flex justify-center items-center py-3 rounded-md">
                        <img src="../../../public/assets/survey-standard 1.png" width={"50px"} alt="" />
                    </div>
                    <div className="w-full p-1 flex flex-col gap-3 font-semibold px-2">
                        <h2 className='font-bold tex-xl'>Delivery</h2>
                        <div className="flex justify-between w-full">
                            <span className='text-[#8E8E8E]'>Submitted</span>
                            <span>10</span>
                        </div>
                        <div className="flex justify-between">
                            <span className='text-[#8E8E8E]'>Viewed</span>
                            <span>55</span>
                        </div>
                        <div className="flex justify-between">
                            <span className='text-[#8E8E8E]'>Date Published</span>
                            <span>08/06/2024</span>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-3 py-3">
                        <ButtonComponent title={"View Submission"} bgColor={"#9C27B0"} color={"#fff"} />
                        <div className="flex justify-center gap-5">
                            <ButtonComponent title={"Edit"} bgColor={"#2E7D32"} color={"#fff"} />
                            <ButtonComponent title={"Delete"} bgColor={"#2196F3"} color={"#fff"} />
                        </div>
                    </div>
                </div>

            </div>
            <ModalComponent visible={moadlOpen}
                onClose={() => setModalOpen(false)}
                title="Create Feedback Form"
                action={() => handleNavigate()}
                content={<Input
                    type="text"
                    placeholder="Enter name"
                    className="w-full h-10 p-2 font-semibold border-b-2 border-black focus:border-b-2 focus:border-black !important" // Tailwind classes for border
                    style={{ border: "none" }} // Remove other borders
                />} />
        </>
    )
}

export default Dashboard