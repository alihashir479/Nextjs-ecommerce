import { Prices } from "@/app/config/Prices";
import { Price } from "@/app/api/types/Price";

interface Props {
  selectedPriceRange: Price;
  changePriceRange: (priceRange: Price) => void;
}
export default function PriceFilter({
  selectedPriceRange,
  changePriceRange,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">PRICE</h2>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => {
          changePriceRange({ min: 0, max: 50000 });
        }}
      >
        <div>All Prices</div>
        <input
          type="checkbox"
          checked={
            selectedPriceRange.min === 0 && selectedPriceRange.max === 50000
          }
          onChange={() => {
            changePriceRange({ min: 0, max: 50000 });
          }}
        />
      </div>
      {Prices.map((price: Price, idx) => (
        <div
          className="flex justify-between cursor-pointer"
          key={idx}
          onClick={() => {
            changePriceRange(price);
          }}
        >
          <div>
            {price.min !== undefined ? (
              <>
                ${price.min.toFixed(2)}-${price.max.toFixed(2)}
              </>
            ) : (
              <>${price.max.toFixed(2)}+</>
            )}
          </div>
          <input
            type="checkbox"
            checked={
              selectedPriceRange.min === price.min &&
              selectedPriceRange.max === price.max
            }
            onChange={() => {
              changePriceRange(price);
            }}
          />
        </div>
      ))}
    </div>
  );
}
