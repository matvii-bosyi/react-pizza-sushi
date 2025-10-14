import { z } from 'zod'

export const addressSchema = z.object({
	city: z.string().min(1, 'Місто є обов\'язковим'),
	locality: z.string().optional(),
	street: z.string().min(1, 'Вулиця є обов\'язковою'),
	house: z.string().min(1, 'Номер будинку є обов\'язковим'),
	flat: z.string().optional(),
	floor: z.string().optional(),
	apartment: z.string().optional(),
	comment: z.string().optional(),
	type: z.string().optional(),
	isMain: z.boolean().default(false),
})

export type AddressSchema = z.infer<typeof addressSchema>
