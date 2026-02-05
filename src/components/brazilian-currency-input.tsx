import React, { type ForwardedRef } from 'react'
import { type Control, Controller } from 'react-hook-form'
import { NumericFormat, type NumericFormatProps } from 'react-number-format'
import { InputGroupInput } from '@/components/ui/input-group'
import type { CompoundInterestSimulatorForm } from '@/types'

interface BrazilianCurrencyInputProps
  extends Omit<NumericFormatProps, 'onValueChange' | 'value'> {
  control: Control<CompoundInterestSimulatorForm, unknown>
  name: keyof CompoundInterestSimulatorForm
}

const BrazilianCurrencyInput = React.forwardRef(
  (
    { control, name, ...props }: BrazilianCurrencyInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <NumericFormat
            customInput={InputGroupInput}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            value={value}
            onValueChange={(values) => onChange(values.value)}
            getInputRef={ref}
            {...props}
          />
        )}
      />
    )
  },
)

BrazilianCurrencyInput.displayName = 'BrazilianCurrencyInput'

export default BrazilianCurrencyInput
