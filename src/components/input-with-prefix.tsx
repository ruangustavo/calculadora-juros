import type { ComponentProps } from 'react'
import { Input } from './ui/input'

interface InputWithPrefixProps extends ComponentProps<'input'> {
  prefix: string
}

export function InputWithPrefix({ prefix, name }: InputWithPrefixProps) {
  return (
    <div className="flex">
      <span className="flex w-12 select-none items-center justify-center bg-primary/10">
        {prefix}
      </span>
      <Input type="number" name={name} className="grow" />
    </div>
  )
}
