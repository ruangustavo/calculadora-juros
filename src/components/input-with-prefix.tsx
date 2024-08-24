import { ComponentProps } from 'react'
import { Input } from './ui/input'

interface InputWithPrefixProps extends ComponentProps<'input'> {
  prefix: string
}

export function InputWithPrefix({ prefix, name }: InputWithPrefixProps) {
  return (
    <div className="flex">
      <span className="w-12 bg-primary/10 flex items-center justify-center select-none">
        {prefix}
      </span>
      <Input type="number" name={name} className="grow" />
    </div>
  )
}
