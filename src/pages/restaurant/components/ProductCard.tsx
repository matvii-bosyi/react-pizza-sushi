import { type IGet_Products_By_Category_For_Restaurant_Response } from '@/api'
import GenericProductCard from '@/components/ui/ProductCard'

type Product = IGet_Products_By_Category_For_Restaurant_Response['products'][0]

interface ProductCardProps {
	product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
	return <GenericProductCard product={product} variant='restaurant' />
}

export default ProductCard