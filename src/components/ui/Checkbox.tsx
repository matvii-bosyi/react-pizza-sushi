import { type FC, type InputHTMLAttributes, useId } from 'react'
import { cn } from '@/lib/cn'
import CheckIcon from '@/assets/icons/checkMark.svg?react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
}

const Checkbox: FC<CheckboxProps> = ({ className, label, id, ...props }) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    return (
        <div className={cn('flex items-center gap-2', className)}>
            <input type="checkbox" id={checkboxId} className="peer hidden" {...props} />
            <label
                htmlFor={checkboxId}
                className="flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center rounded-md border border-gray-400 bg-white peer-checked:border-green-500 peer-checked:bg-green-500"
            >
                <CheckIcon className="h-4 w-4 text-white opacity-0 peer-checked:opacity-100" />
            </label>
            {label && <label htmlFor={checkboxId} className="cursor-pointer">{label}</label>}
        </div>
    )
}

export default Checkbox;
