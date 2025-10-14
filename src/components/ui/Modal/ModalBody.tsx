import type { ComponentProps, FC } from "react";
import {cn} from "@/lib/cn.ts";

type ModalBodyProps = ComponentProps<"div">

const ModalBody: FC<ModalBodyProps> = ({ children, className, ...props }) => {
    return (
        <div
            {...props}
            className={cn(
                "flex flex-1 w-full",
                className
            )}
        >
            {children}
        </div>
    );
};

export default ModalBody;