import React from 'react';
import { Modal, Button } from "antd";
import { Input }
    from
    "antd"
    ;
const ModalComponent = ({ visible, onClose, title, content, action }) => {
    return (
        <Modal
            title={<div className='font-semibold text-xl'>{title}</div>}
            visible={visible}
            onCancel={onClose}
            centered
            footer={[
                <Button key="back" className='bg-green-500 text-white' onClick={action}>
                    Create
                </Button>,
                <Button key="back" className='bg-red-600 text-white' onClick={onClose}>
                    Close
                </Button>,
            ]}

        >

            {content}
        </Modal>
    )
}

export default ModalComponent
