import { useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToggleFavoriteQuery } from '@/api/favorite';
import { AuthModalContext } from '@/context/AuthModalContext';
import HeartIcon from '@/assets/icons/heart.svg?react';
import HeartFillIcon from '@/assets/icons/heartFill.svg?react';
import { cn } from '@/lib/cn';

interface FavoriteButtonProps {
    productId?: string;
    restaurantId?: string;
    isFavorite: boolean;
    className?: string;
}

const FavoriteButton = ({ productId, restaurantId, isFavorite, className }: FavoriteButtonProps) => {
    const { isAuth } = useAuth();
    const authModal = useContext(AuthModalContext);
    const { mutate: toggleFavorite } = useToggleFavoriteQuery();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isAuth) {
            authModal?.onOpen();
        } else {
            if (productId || restaurantId) {
                const type = productId ? 'product' : 'restaurant';
                toggleFavorite({ type, productId, restaurantId });
            }
        }
    };

    return (
			<button
				onClick={handleClick}
				className={cn(
					'flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[#DD302C] hover:text-white p-[10px] rounded-[14px] shadow-lg',
					className,
					isFavorite ? 'text-white bg-[#DD302C]' : 'text-black bg-white'
				)}>
				{isFavorite ? (
					<HeartFillIcon color='#FFFFFF' fill='#FFFFFF' />
				) : (
					<HeartIcon fill='currentColor' />
				)}
			</button>
		)
};

export default FavoriteButton;
