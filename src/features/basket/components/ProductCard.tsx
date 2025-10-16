import { type IBasketGetAll_Response } from '@/api'
import GenericProductCard, { type Product } from '@/components/ui/ProductCard'

const ProductCard = ({ product }: { product: IBasketGetAll_Response }) => {
	return <GenericProductCard product={product as Product} variant='basket' />
}

export default ProductCard