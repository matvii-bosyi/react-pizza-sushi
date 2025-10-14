import { useQuery } from '@tanstack/react-query'
import { CategoriesService } from './categories.service'
import type { IGetCategoriesResponse } from './categories.types'

export const useAllCategoriesQuery = () =>
	useQuery({
		queryKey: ['categories-all'],
		queryFn: () => CategoriesService.getAll().then(res => res.data.data as Array<IGetCategoriesResponse>),
	})


export const useTopCategoriesQuery = () =>
	useQuery({
		queryKey: ['categories-top'],
		queryFn: () => CategoriesService.getTop().then(res => res.data.data as Array<IGetCategoriesResponse>),
	})
