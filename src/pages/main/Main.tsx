import OneRestaurant from "@/pages/main/components/TopRestaurant"
import TopCategories from "./components/TopCategories"

const Main = () => {
	return <div className="py-[60px] space-y-[60px]">
		<TopCategories />
		<OneRestaurant />
	</div>
}

export default Main
