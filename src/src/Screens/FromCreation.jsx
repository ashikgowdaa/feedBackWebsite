import React, { useState } from 'react';
import { Input, Switch, Rate, } from 'antd';
import { StarOutlined, ArrowLeftOutlined, DeleteOutlined, FileTextOutlined, PlusOutlined, EditOutlined, FrownOutlined, MehOutlined, SmileOutlined, LeftOutlined } from '@ant-design/icons';
import { ButtonComponent } from '../Components/Button/Button';
import axios from 'axios';
import { useNavigate, } from 'react-router-dom';
const { TextArea } = Input;

const FormCreation = () => {
    const navigate = useNavigate();

    const customIcons = {
        1: <FrownOutlined />,
        2: <FrownOutlined />,
        3: <MehOutlined />,
        4: <SmileOutlined />,
        5: <SmileOutlined />,
    };


    const fieldsArray = [
        { fieldName: "Text Area", fieldIcon: <FileTextOutlined /> },
        { fieldName: "Numeric Rating", fieldIcon: <StarOutlined /> },
        { fieldName: "Star Rating", fieldIcon: <FileTextOutlined /> },
        { fieldName: "Smiley Rating", fieldIcon: <FileTextOutlined /> },
        { fieldName: "Single Line Input", fieldIcon: <FileTextOutlined /> },
        { fieldName: "Categories", fieldIcon: <FileTextOutlined /> },
        { fieldName: "Radio Button", fieldIcon: <FileTextOutlined /> },
    ];
    const defaultTexts = {
        "Text Area": "Would you like to add a comment",
        "Numeric Rating": "How likely is it that you will recommend us to your family and friends?",
        "Star Rating": "Give a star rating for the website.",
        "Smiley Rating": "What is your opinion of this page?",
        "Single Line Input": "Do you have any suggestions to improve our website?",
        "Categories": "Pick a subject and provide your feedback:",
        "Radio Button": "Multiple choice - 1 answer",
    };

    const [formFields, setFormFields] = useState([]);
    // const [formData, setFormData] = useState([]);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [editableData, setEditableData] = useState()
    const [condition, setCondition] = useState()
    // Handle field changes
    // const handleFieldChange = (fieldId, value) => {
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         [fieldId]: value,

    //     }));
    // onChange={(e) => handleFieldChange(field.id, e.target.value)}
    // 
    // };

    const handleClick = (field) => {
        const newFieldId = `${field.fieldName}-${Date.now()}`;

        if (field.fieldName === "Radio Button") {
            setFormFields((prev) =>
                [...prev, { ...field, id: newFieldId, "label": defaultTexts[field.fieldName] || '', "fieldName": field.fieldName, options: ["Tiger", "Lion"] }]
            );
        }

        else if (field.fieldName === "Categories") {
            setFormFields((prev) =>
                [...prev, { ...field, id: newFieldId, "label": defaultTexts[field.fieldName] || '', "fieldName": field.fieldName, categories: ["Bug", "Tech", "Other"] }]
            );
        }
        else {
            setFormFields((prev) =>
                [...prev, { ...field, id: newFieldId, "label": defaultTexts[field.fieldName] || '', "fieldName": field.fieldName, }]

            );
        }

        // setFormData((prev) => ([
        //     ...prev,
        //     {
        //         "id": newFieldId,
        //         "fieldName": field.fieldName,
        //         "label": defaultTexts[field.fieldName] || '',
        //     }]
        // ));
    };

    const handleEdit = (field) => {
        setToggleEdit(true);
        setEditableData(field)
    }
    const handleEditContent = (e, index) => {
        const { name, value } = e.target
        if (name === "label") {
            setEditableData((prev) => ({ ...prev, "label": value }))
        }
        if (name === "error") {
            setEditableData((prev) => ({ ...prev, "error": value }))
        }

    }

    const handleSwitch = (val) => {
        setEditableData((prev) => ({ ...prev, "required": val }))
    }


    const handelEditOptions = (e, index, item) => {
        const { value } = e.target;
        let updatedOptions;

        if (item.fieldName == "Radio Button") {
            updatedOptions = [...editableData.options];
            updatedOptions[index] = value;
            setEditableData(prevState => ({
                ...prevState,
                options: updatedOptions
            }));
        }

        if (item.fieldName === "Categories") {
            updatedOptions = [...editableData.categories];
            updatedOptions[index] = value;
            setEditableData(prevState => ({
                ...prevState,
                categories: updatedOptions
            }));
        }

    };

    const handelDelete = (field) => {
        const filteredData = formFields.filter((item, i) => item.id !== field.id)
        setFormFields(filteredData)
    }
    console.log(editableData, "<<<")

    const handleSave = (data) => {

        const updatedFormFields = formFields.map((item) => {
            // If the item's id matches the data.id, update it
            if (item.id === data.id) {
                return { ...item, ...editableData };
            }
            // Otherwise, return the item as is
            return item;
        });
        setFormFields(updatedFormFields)


    }


    const handleCondtion = (e) => {
        const { name, value } = e.target
        setCondition((prev) => ({ ...prev, [name]: value }))

    }
    const handlePost = async () => {
        try {
            const filteredData = formFields.map(item => {
                const { "fieldIcon": _, ...newItem } = item;
                return newItem;
            });
            const postData = {
                name: "General Naming",
                data: [...filteredData],
                condition: { ...condition }
            };

            const response = await axios.post("http://localhost:8000/api/feedback", postData)
            console.log(response)

        } catch (error) {
            console.log(error)
        }


    }

    return (
        <>
            <div className="overflow-hidden">
                <div className="w-full flex justify-end gap-5 p-5">
                    <ButtonComponent title={"Save"} bgColor={"#2E7D32"} color={"#fff"} />
                    <span onClick={handlePost}>

                        <ButtonComponent title={"Publish"} bgColor={"#2196F3"} color={"#fff"} />
                    </span>
                </div>
                <div className="flex justify-center items-start h-full">
                    <div className="w-[80%] min-h-screen flex justify-center items-start bg-gray-300 p-5">
                        <div className="w-1/2 min-h-[300px] shadow-xl rounded-lg p-5">
                            <div className="bg-[#5578F4] p-5 flex gap-3 items-center justify-start rounded-lg">
                                <LeftOutlined className='text-white font-extrabold text-xl' onClick={() => navigate('/')} />
                                <h3 className='text-white font-semibold text-lg'>Generic Heading title</h3>
                                <EditOutlined className='text-white font-extrabold text-xl' />
                            </div>
                            <div className="text-center content-center h-full p-5 w-full">
                                {formFields.length === 0 ? (
                                    <div className="">Add Fields</div>
                                ) : (
                                    <>
                                        <div className="flex flex-col gap-5 w-full">
                                            {formFields.map((field, index) => (
                                                <div key={field.id} className="w-full text-start flex flex-col gap-3 shadow-lg bg-white p-5 rounded-sm">

                                                    <label htmlFor={field.id} className="w-full text-black" >
                                                        {field.label}
                                                    </label>
                                                    {field.fieldName === 'Text Area' && (
                                                        <TextArea
                                                            id={field.id}
                                                            rows="4" cols="50"
                                                        />
                                                    )}
                                                    {field.fieldName === 'Numeric Rating' && (
                                                        // <input
                                                        //     type="number"
                                                        //     id={field.id}
                                                        //     className="input-class"

                                                        // />
                                                        <Input.OTP length={9} value='123456789' />
                                                    )}
                                                    {field.fieldName === 'Star Rating' && (
                                                        <div>
                                                            {/* Implement your star rating component */}
                                                            {/* <input
                                                                type="text"
                                                                id={field.id}

                                                            /> */}
                                                            <Rate className='text-4xl' />
                                                        </div>
                                                    )}
                                                    {field.fieldName === 'Smiley Rating' && (
                                                        <div>
                                                            {/* Implement your star rating component */}
                                                            {/* <input
                                                                type="text"
                                                                id={field.id}

                                                            /> */}
                                                            <Rate className='text-3xl' defaultValue={3} character={({ index = 0 }) => customIcons[index + 1]} />                                                        </div>
                                                    )}
                                                    {field.fieldName === 'Single Line Input' && (
                                                        <Input
                                                            type="text"
                                                            id={field.id}
                                                            className="input-class h-50"

                                                        />



                                                    )}
                                                    {field.fieldName === 'Categories' && (

                                                        <div className="flex gap-5">

                                                            {field.categories.map((option, index) =>
                                                                <span key={index} className='py-3 px-6 rounded-md bg-gray-200' value="Category 1">{option}</span>
                                                            )}
                                                        </div>


                                                    )}
                                                    {field.fieldName === 'Radio Button' && (
                                                        <div className='flex flex-col gap-5'>





                                                            {
                                                                field.options.map((item, i) =>
                                                                    <label key={i} className='flex gap-5'>
                                                                        <input
                                                                            type="radio"
                                                                            name={field.id}
                                                                        /> {item}
                                                                    </label>
                                                                )
                                                            }




                                                        </div>
                                                    )}
                                                    <div className="flex gap-5 justify-end">
                                                        <span className='cursor-pointer' onClick={() => handleEdit(field)} >
                                                            <EditOutlined />
                                                        </span>
                                                        <span className='cursor-pointer' onClick={() => handelDelete(field)}>
                                                            <DeleteOutlined />
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-[20%]  shadow-lg h-full flex-col justify-between items-center p-5">
                        {
                            !toggleEdit ?
                                <>
                                    <h3>Add Fields</h3>
                                    {fieldsArray.map((item, i) => (
                                        <div key={i} className="flex justify-between m-3">
                                            <span className='flex gap-4'>
                                                {item.fieldIcon}
                                                <p className='font-semibold'>{item.fieldName}</p>
                                            </span>
                                            <span className='cursor-pointer' onClick={() => handleClick(item)}>
                                                <PlusOutlined style={{ color: 'blue', fontSize: '24px' }} />
                                            </span>
                                        </div>
                                    ))}
                                    <div className="flex flex-col gap-6 my-10 ">
                                        <div className="font-semibold">Label</div>
                                        <div className="flex flex-col gap-6">
                                            <span className='flex justify-between'>
                                                <p>Show based on URL conditions</p>
                                                <Switch />
                                            </span>
                                            <input type="text" className='border-0 border-b-2 bg-transparent border-black focus:border-b-2 focus:outline-none' name='url' onChange={handleCondtion} />

                                        </div>
                                        <div className="flex flex-col gap-6">
                                            <span className='flex justify-between'>
                                                <p>Show on a specific date</p>
                                                <Switch />
                                            </span>
                                            <Input type="text" name='date' onChange={handleCondtion} className='' placeholder='MM/DD/YYYY' />

                                        </div>
                                        <div className="flex flex-col gap-6">
                                            <span className='flex justify-between'>
                                                <p>Show on a specific time</p>
                                                <Switch />
                                            </span>
                                            <Input type="text" name='time' onChange={handleCondtion} className='' placeholder='hh:mm aa' />

                                        </div>                                        </div>
                                </>
                                : <div className="flex flex-col gap-5">
                                    <div className="flex gap-3">
                                        <ArrowLeftOutlined className='cursor-pointer' onClick={() => setToggleEdit(false)} />
                                        <p className='font-semibold'>Back to Add Fields</p>
                                    </div>

                                    {
                                        editableData.fieldName === "Radio Button" ?

                                            <div className="flex flex-col gap-5">
                                                <p className='font-semibold'>Label</p>
                                                <input type="text" className='border-0 bg-transparent border-b-2 border-gray focus:border-b-2 focus:outline-none w-full' name="label" value={editableData.label} onChange={handleEditContent} />
                                                <label className='flex gap-5 font-semibold'>Options
                                                </label>

                                                {
                                                    editableData.options.map((item, i) =>
                                                        <label key={i} className='flex gap-5'>
                                                            <input
                                                                className='border-0 bg-transparent border-b-2 border-gray focus:border-b-2 focus:outline-none w-full'
                                                                type="text" // Use 'text' for text input
                                                                name={`option-${i}`} // Unique name for each input
                                                                value={item} // Bind the value to the state
                                                                onChange={(e) => handelEditOptions(e, i, editableData)} // Pass the index to the handler
                                                            />
                                                        </label>
                                                    )
                                                }
                                            </div> : null

                                    }
                                    {
                                        editableData.fieldName === "Categories" ?

                                            <div className="flex flex-col gap-5">
                                                <p className='font-semibold'>Label</p>
                                                <input type="text" className='border-0 bg-transparent border-b-2 border-gray focus:border-b-2 focus:outline-none w-full' name="label" value={editableData.label} onChange={handleEditContent} />


                                                <label className='flex gap-5 font-semibold'>Options
                                                </label>
                                                {
                                                    editableData.categories.map((item, i) =>
                                                        <>
                                                            <input

                                                                className='border-0 bg-transparent border-b-2 border-gray focus:border-b-2 focus:outline-none w-full'
                                                                type="input"
                                                                name={`categories-${i}`} // Unique name for each input
                                                                value={item} // Bind the value to the state
                                                                onChange={(e) => handelEditOptions(e, i, editableData)} // Pass the 
                                                            />
                                                        </>
                                                    )
                                                }
                                            </div> : null

                                    }

                                    {
                                        editableData.fieldName !== "Categories" && editableData.fieldName !== "Radio Button" ?
                                            <>

                                                <div className="flex flex-col gap-5">
                                                    <p className='font-semibold'>Label</p>
                                                    <input type="text" className='border-0 bg-transparent border-b-2 border-gray focus:border-b-2 focus:outline-none w-full' value={editableData.label} name='label' onChange={handleEditContent} />
                                                </div>
                                                <div className="flex gap-5">
                                                    <Switch onChange={handleSwitch} />
                                                    <span className='font-semibold'>Required</span>
                                                </div>
                                                <div className="">
                                                    <p className='font-semibold'>Error Message</p>
                                                    <input type="text" className='border-0 bg-transparent border-b-2 border-gray focus:border-b-2 focus:outline-none w-full' name='error' onChange={handleEditContent} />
                                                </div>
                                            </>

                                            : null
                                    }

                                    <div className="flex gap-5">
                                        <span onClick={() => handleSave(editableData)}>
                                            <ButtonComponent title={"Save"} color={"#fff"} bgColor={"blue"} />
                                        </span>
                                        <span onClick={() => setToggleEdit(false)}>
                                            <ButtonComponent title={"Cancel"} color={"#000"} bgColor={"#e1e3e1"} />
                                        </span>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormCreation;
