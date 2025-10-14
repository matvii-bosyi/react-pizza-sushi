import { type IBasketGetAll_Response } from '@/api'
import GenericProductCard from '@/components/ui/ProductCard'

const ProductCard = ({ product }: { product: IBasketGetAll_Response }) => {
	return <GenericProductCard product={product} variant='basket' />
}

export default ProductCard