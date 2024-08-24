import React, { ForwardedRef } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { Input } from '@/components/ui/input'
import { Controller, Control } from 'react-hook-form'
import { CompoundInterestSimulatorForm } from '@/types'

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
            customInput={Input}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            value={value}
            onValueChange={(values) => onChange(values.value)}
            getInputRef={ref}
            className="rounded-l-none"
            {...props}
          />
        )}
      />
    )
  },
)

BrazilianCurrencyInput.displayName = 'BrazilianCurrencyInput'

export default BrazilianCurrencyInput
