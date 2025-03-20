import { categories } from "../../config/Products";
interface Props {
  selectedCategory: string;
  changeCategory: (category: string) => void;
}
export default function Categories({
  selectedCategory,
  changeCategory,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">CATEGORIES</h2>
      <div
        className={`${
          selectedCategory === "all" ? "underline font-bold" : ""
        } cursor-pointer`}
        onClick={() => changeCategory("all")}
      >
        All Categories
      </div>
      {categories.map((category: string) => (
        <div
          key={category}
          className={`${
            selectedCategory === category ? "underline font-bold" : ""
          } cursor-pointer`}
          onClick={() => changeCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
}
