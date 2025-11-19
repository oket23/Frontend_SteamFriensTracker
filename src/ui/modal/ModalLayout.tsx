import type {ModalProps} from "@/hooks/useModal/useModal.tsx";
import type {CSSProperties, FC, PropsWithChildren} from "react";
import Portal from "@/common/Portal.tsx";
import {cn} from "@/helpers/cn.ts";


interface ModalLayoutProps extends PropsWithChildren<ModalProps> {
    className?: string
    style?: CSSProperties
}

const ModalLayout: FC<ModalLayoutProps> = ({onClose, open, animation, children, className, style,}) => {
    if (!open) return null;

    return (
        <Portal target={"modals-root"}>
            <div
                style={{...(style || {})}}
                onClick={onClose}
                className={cn(
                    "fixed inset-0 z-[70] flex items-center justify-center",
                    "h-dvh w-full overscroll-none bg-react/500 bg-opacity-80",
                    animation === "out" ? "animate-fade-out" : "animate-fade-in"
                )}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                        "w-full h-full min-h-[200px] max-h-dvh overflow-y-auto",
                        animation === "out" ? "animate-modal-out" : "animate-modal-in",
                        className
                    )}
                >
                    {children}
                </div>
            </div>
        </Portal>
    );
};


export default ModalLayout;