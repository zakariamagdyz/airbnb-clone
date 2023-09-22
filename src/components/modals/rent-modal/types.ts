import { Control, Path } from 'react-hook-form'
import { z } from 'zod'

import { rentFormSchema } from './schema'

export type RentFormSchema = z.infer<typeof rentFormSchema>

export type StepProps = {
  control: Control<RentFormSchema>
  setCustomValue: (id: Path<RentFormSchema>, value: string | number) => void
}
