import React from 'react';
import { Modal } from 'antd';

interface ModalBoxProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
}

const ModalBox: React.FC<ModalBoxProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel'
}) => {
    return (
        <Modal
            title={title}
            open={isOpen}
            onOk={onConfirm}
            onCancel={onClose}
            okText={confirmText}
            cancelText={cancelText}
            okButtonProps={{ danger: confirmText === 'Delete' }}
        >
            <p>{description}</p>
        </Modal>
    );
};

export default ModalBox;