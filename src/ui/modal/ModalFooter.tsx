import type {ComponentProps, FC} from "react";
import {cn} from "@/helpers/cn.ts";

type ModalFooterProps = ComponentProps<"div">

const ModalFooter: FC<ModalFooterProps> = (
    {
        children,
        className,
        ...props
    }) => {
    return (
        <div
            {...props}
            className={cn("flex flex-col", className)}
        >
            {children}
        </div>
    );
};

export default ModalFooter;