import type {ModalProps} from "@/hooks/useModal/useModal.tsx";
import type {CSSProperties, FC, PropsWithChildren} from "react";
import ModalLayout from "@/ui/modal/ModalLayout.tsx";
import ModalTitle from "@/ui/modal/ModalTitle.tsx";
import ModalBody from "@/ui/modal/ModalBody.tsx";
import ModalFooter from "@/ui/modal/ModalFooter.tsx";

interface ModalComponentProps extends PropsWithChildren<ModalProps> {
    className?: string
    style?: CSSProperties
}

const ModalComponent: FC<ModalComponentProps> = (
    {
        children,
        ...layoutProps
    }) => {
    return (
        <ModalLayout {...layoutProps}>{children}</ModalLayout>
    )
}

const Modal = Object.assign(ModalComponent, {
    Title: ModalTitle,
    Body: ModalBody,
    Footer: ModalFooter,
})

export default Modal;
