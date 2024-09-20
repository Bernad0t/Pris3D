import { Modal } from "react-overlays";
import { RenderModalBackdropProps } from "react-overlays/cjs/Modal";

import style from "./modal.module.css"

interface Props{
    showModal: boolean
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

export default function MyModal({showModal, setShowModal, children} : Props){

    const renderBackdrop = (props: RenderModalBackdropProps) => <div className={style.backdrop} {...props} />;
    const handleClose = () => setShowModal(false);
    return(
        <Modal
            className={style.modal}
            show={showModal}
            onHide={handleClose}
            renderBackdrop={renderBackdrop}
        >
            {children}
        </Modal>
    )
}