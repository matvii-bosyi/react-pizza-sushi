import { z } from 'zod'

const normalizePhoneNumber = (value: string) => `+${value.replace(/[^0-9]/g, '')}`

export const phoneSchema = z.object({
	phone: z
		.string()
		.transform(normalizePhoneNumber)
		.refine(
			phone => phone.startsWith('+380') && phone.length === 13,
			'Будь ласка, введіть дійсний український номер'
		),
})
export type PhoneFormValues = z.infer<typeof phoneSchema>

export const nameSchema = z.object({
	firstName: z.string().min(2, "Ім'я занадто коротке"),
	lastName: z.string().min(2, 'Прізвище занадто коротке'),
})
export type NameFormValues = z.infer<typeof nameSchema>
