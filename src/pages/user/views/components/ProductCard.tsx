import type { IProduct } from "@/api/favorite/favorite.types";

const ProductCard = ({ product }: { product: IProduct }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-bold">{product.name}</p>
            {/* Placeholder for more product info */}
        </div>
    )
}

export default ProductCard;
