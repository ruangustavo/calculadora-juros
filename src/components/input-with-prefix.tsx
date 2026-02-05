import type { ComponentProps } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from './ui/input-group'

interface InputWithPrefixProps extends ComponentProps<'input'> {
  prefix: string
}

export function InputWithPrefix({
  prefix,
  name,
  ...props
}: InputWithPrefixProps) {
  return (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>{prefix}</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="number" name={name} {...props} />
    </InputGroup>
  )
}
