type Transform<TInput extends string, TOutput> = {
  input: (value: TOutput) => TInput
  output: (value: TInput) => TOutput
}

export const transform: Transform<string, number> = {
  input: value => (isNaN(value) || value === 0 ? '' : value.toString()),
  output: value => {
    const output = parseInt(value, 10)
    return isNaN(output) ? 0 : output
  },
}
