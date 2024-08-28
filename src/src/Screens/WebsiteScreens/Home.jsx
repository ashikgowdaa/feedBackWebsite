import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'antd';
import { Input, Rate, } from 'antd';
import { StarOutlined, ArrowLeftOutlined, DeleteOutlined, FileTextOutlined, PlusOutlined, EditOutlined, FrownOutlined, MehOutlined, SmileOutlined, LeftOutlined } from '@ant-design/icons';
import axios from 'axios';
const Home = () => {
    const customIcons = {
        1: <FrownOutlined />,
        2: <FrownOutlined />,
        3: <MehOutlined />,
        4: <SmileOutlined />,
        5: <SmileOutlined />,
    };
    const [data, setData] = useState()
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedValue2, setSelectedValue2] = useState(null);
    const [formData, setFormData] = useState({});

    const handleInputChange = (id, value) => {
        if (id === "Numeric Rating") {
            setSelectedValue(value);
        }
        if (id === "Categories") {
            setSelectedValue2(value);
        }
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };


    useEffect(() => {
        const url = " http://localhost:8000/api/feedback-form"
        axios.get(`${url}?name=General Naming`)
            .then((res) => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    const handlePost = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/feedback-data", { feedBackData: formData })
            console.log(response)

        } catch (error) {
            console.log(error)
        }


    }

    return (


        <  >



            <Modal
                title="Dynamic Form Fields"

                open={true}
                footer={null}
                width={600}

            >
                <div className="flex flex-col gap-5 w-full">
                    {data?.data?.map((field, index) => (
                        <div key={field.id} className="w-full text-start flex flex-col gap-3 shadow-lg bg-white p-5 rounded-sm">
                            <label htmlFor={field.id} className="w-full text-black">
                                {field.label}
                            </label>
                            {field.fieldName === 'Text Area' && (
                                <Input.TextArea
                                    id={field.id}
                                    rows={4}
                                    cols={50}
                                    name={field.fieldName}
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                />
                            )}
                            {field.fieldName === 'Numeric Rating' && (

                                <div className="flex gap-2">
                                    {[...Array(10)].map((_, index) => (
                                        <div
                                            key={index + 1}
                                            className={`flex rounded-md items-center justify-center w-12 h-12 border border-gray-300 cursor-pointer ${selectedValue === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                                }`}
                                            onClick={() => handleInputChange(field.fieldName, index + 1)}
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                                </div>

                                // <Input.OTP length={9} value='123456789' type="number"
                                //     name={field.fieldName}
                                //     id={field.id}
                                //     className="input-class"
                                //     onChange={(e) => handleInputChange(field.id, e.target.value)} />

                            )}
                            {field.fieldName === 'Star Rating' && (
                                <Rate
                                    className='text-4xl'
                                    onChange={(value) => handleInputChange(field.id, value)}
                                />
                            )}
                            {field.fieldName === 'Smiley Rating' && (
                                <Rate
                                    className='text-3xl'
                                    defaultValue={3}
                                    character={({ index = 0 }) => customIcons[index + 1]}
                                    onChange={(value) => handleInputChange(field.id, value)}
                                />
                            )}
                            {field.fieldName === 'Single Line Input' && (
                                <Input
                                    type="text"
                                    name={field.fieldName}
                                    id={field.id}
                                    className="input-class h-50"
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                />
                            )}
                            {field.fieldName === 'Categories' && (
                                <div className="flex gap-5">
                                    {field.categories.map((option, index) =>
                                        <span key={index} onClick={() => handleInputChange(field.fieldName, option)}


                                            className={`py-3 px-6  bg-gray-200 flex rounded-md items-center justify-center w-12 h-12 border border-gray-300 cursor-pointer ${selectedValue2 === option ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                                }`}
                                        >{option}</span>
                                    )}
                                </div>
                            )}
                            {field.fieldName === 'Radio Button' && (
                                <div className='flex flex-col gap-5'>
                                    {field.options.map((item, i) => (
                                        <label key={i} className='flex gap-5'>
                                            <input
                                                type="radio"
                                                name={field.fieldName}
                                                onChange={() => handleInputChange(field.id, item)}
                                            /> {item}
                                        </label>
                                    ))}
                                </div>
                            )}

                        </div>

                    ))}
                    <div className="flex justify-end gap-2 mt-4">
                        <Button type="primary" onClick={handlePost}>Submit</Button>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default Home