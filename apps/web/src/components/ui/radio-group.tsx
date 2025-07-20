'use client'

import * as React from 'react'
import { useRadioGroup, type UseRadioGroupProps } from '@ark-ui/react'
import { type HTMLArkProps } from '@ark-ui/react'
import { cn } from '@/lib/cn'

type RadioGroupRootProps = UseRadioGroupProps & {
    children: (api: ReturnType<typeof useRadioGroup>) => React.ReactNode
    className?: string
}

export function RadioGroup({ className, children, ...props }: RadioGroupRootProps) {
    const api = useRadioGroup(props)

    return (
        <div {...api.getRootProps()} className={cn('flex flex-col gap-2', className)}>
            {props.name && (
                <span {...api.getLabelProps()} className="text-sm font-medium text-gray-700">
          {props.name}
        </span>
            )}
            {children(api)}
        </div>
    )
}

type RadioProps = {
    api: ReturnType<typeof useRadioGroup>
    value: string
    children: React.ReactNode
} & HTMLArkProps<'div'>

export function Radio(a: RadioProps) {
/*export function Radio({ api, value, children, className, ...rest }: RadioProps) {*/
    console.log(a);
    return (
        <>
            {/*<div
                {...api.getItemProps({ value })}
                className={cn(
                    'inline-flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer transition-colors',
                    'data-[checked]:bg-blue-500 data-[checked]:text-white data-[checked]:border-blue-600',
                    'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
                    className
                )}
                {...rest}
            >
                <input {...api.getItemHiddenInputProps({ value })} />
                <div
                    {...api.getItemControlProps({ value })}
                    className="w-4 h-4 rounded-full border border-gray-300 bg-white data-[checked]:bg-blue-500"
                />
                <span {...api.getItemTextProps({ value })}>{children}</span>
            </div>*/}
        </>
    )
}
