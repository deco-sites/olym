import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useScript } from "deco/hooks/useScript.ts";
import QuantitySelector from "../ui/QuantitySelector.tsx";

export type Item = AnalyticsItem & {
  listPrice: number;
  image: string;
};

export interface Props {
  item: Item;
  index: number;
  locale: string;
  currency: string;
}

const QUANTITY_MAX_VALUE = 100;

const removeItemHandler = () => {
  const itemID = (event?.currentTarget as HTMLButtonElement | null)
    ?.closest("fieldset")
    ?.getAttribute("data-item-id");

  if (typeof itemID === "string") {
    window.STOREFRONT.CART.setQuantity(itemID, 0);
  }
};

function CartItem({ item, index, locale, currency }: Props) {
  const { image, price = Infinity, quantity } = item;
  const isGift = price < 0.01;

  // deno-lint-ignore no-explicit-any
  const name = (item as any).item_name;

  return (
    <fieldset
      // deno-lint-ignore no-explicit-any
      data-item-id={(item as any).item_id}
      class="flex flex-row gap-4 border-b border-base-[#c2c2c2] pb-4"
    >
      <Image
        alt={name}
        src={image.replace("55-55", "110-110")}
        style={{ aspectRatio: "110 / 110" }}
        width={110}
        height={110}
        class="h-full object-contain"
      />

      {/* Info */}
      <div class="flex flex-col gap-2 items-stretch justify-between w-full">
        {/* Name and Remove button */}
        <div class="flex justify-between items-center text-xs text-black">
          <legend>{name}</legend>
          <button
            class={clx(
              isGift && "hidden",
              "btn btn-ghost btn-square no-animation",
            )}
            hx-on:click={useScript(removeItemHandler)}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z">
              </path>
            </svg>
          </button>
        </div>

        {/* Price Block */}
        <div class="flex items-end justify-between gap-2">
          <span class="text-xs text-black font-bold mb-1-">
            Por: {isGift ? "Grátis" : formatPrice(price, currency, locale)}
          </span>

          {/* Quantity Selector */}
          <div class={clx(isGift && "hidden")}>
            <QuantitySelector
              min={0}
              max={QUANTITY_MAX_VALUE}
              value={quantity}
              name={`item::${index}`}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default CartItem;
