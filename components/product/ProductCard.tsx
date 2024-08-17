import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import { Ring } from "./ProductVariantSelector.tsx";
import { useId } from "../../sdk/useId.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
}

const WIDTH = 287;
const HEIGHT = 287;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
  class: _class,
}: Props) {
  const id = useId();

  const { url, image: images, offers, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const title = isVariantOf?.name ?? product.name;
  const [front, back] = images ?? [];

  const { listPrice, price, seller = "1", availability } = useOffer(offers);
  const inStock = availability === "https://schema.org/InStock";
  const possibilities = useVariantPossibilities(hasVariant, product);
  const firstSkuVariations = Object.entries(possibilities)[0];
  const variants = Object.entries(firstSkuVariations[1] ?? {});
  const relativeUrl = relative(url);
  const percent = listPrice && price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0;

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {/* Add click event to dataLayer */}
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  return (
    <div
      {...event}
      class={clx("card card-compact group text-sm", _class)}
    >
      <div class="flex gap-3 justify-between">
        <span class=" text-sm lg:text-[22px]">
          {title}
        </span>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="17"
            viewBox="0 0 19 17"
            fill="none"
          >
            <path
              d="M9.52539 16.916C9.81543 16.916 10.1846 16.7754 10.4922 16.5732C15.291 13.5059 18.2529 9.84961 18.2529 6.2373C18.2529 3.04688 16.1084 0.858398 13.2783 0.858398C11.8193 0.858398 10.5186 1.48242 9.52539 2.92383C8.54102 1.48242 7.23145 0.858398 5.77246 0.858398C2.94238 0.858398 0.797852 3.04688 0.797852 6.2373C0.797852 9.84961 3.75977 13.5059 8.55859 16.5732C8.86621 16.7754 9.23535 16.916 9.52539 16.916ZM9.52539 15.457C9.47266 15.457 9.39355 15.4307 9.29688 15.3604C5.10449 12.627 2.21289 9.30469 2.21289 6.2373C2.21289 3.82031 3.7334 2.27344 5.77246 2.27344C7.33691 2.27344 8.3916 3.38965 8.875 4.32129C9.05078 4.66406 9.23535 4.82227 9.52539 4.82227C9.81543 4.82227 10 4.66406 10.167 4.33008C10.6328 3.38965 11.7139 2.27344 13.2783 2.27344C15.3174 2.27344 16.8379 3.82031 16.8379 6.2373C16.8379 9.30469 13.9463 12.627 9.75391 15.3604C9.64844 15.4307 9.57812 15.457 9.52539 15.457Z"
              fill="black"
            >
            </path>
          </svg>
        </div>
      </div>
      <figure
        class={clx(
          "relative",
          "rounded",
          "group-hover:border-primary",
        )}
        style={{ aspectRatio: ASPECT_RATIO }}
      >
        {/* Product Images */}
        <a
          href={relativeUrl}
          aria-label="view product"
          class={clx(
            "absolute top-0 left-0 p-6",
            "grid grid-cols-1 grid-rows-1 ",
            "w-full",
            !inStock && "opacity-70",
          )}
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={clx(
              "object-cover",
              "rounded w-full",
              "col-span-full row-span-full",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={clx(
              "object-cover",
              "rounded w-full",
              "col-span-full row-span-full",
              "transition-opacity opacity-0 lg:group-hover:opacity-100",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
            decoding="async"
          />
        </a>

        {/* Wishlist button */}
        <div class="absolute top-0 left-0 w-full flex items-center justify-between">
          {/* Notify Me */}
          <span
            class={clx(
              "text-sm/4 font-normal text-black bg-error bg-opacity-15 text-center rounded-badge px-2 py-1",
              inStock && "opacity-0",
            )}
          >
            Notify me
          </span>

          {/* Discounts */}
          <span
            class={clx(
              "text-sm/4 font-normal text-black bg-primary bg-opacity-15 text-center rounded-badge px-2 py-1",
              (percent < 1 || !inStock) && "opacity-0",
            )}
          >
            {percent} % off
          </span>
        </div>

        <div class="absolute bottom-0 right-0">
          <WishlistButton item={item} variant="icon" />
        </div>
      </figure>

      <a href={relativeUrl} class="pt-5">
        <div class="flex gap-2 pt-2 flex-col">
          {listPrice && (
            <span class="line-through font-normal text-black text-2xl hidden">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <span class="font-medium text-black text-base lg:text-2xl text-end">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
        </div>
      </a>

      {/* SKU Selector */}
      {variants.length > 1 && (
        <ul class="flex items-center justify-start gap-2 pt-4 pb-1 pl-1 overflow-x-auto">
          {variants.map(([value, link]) => [value, relative(link)] as const)
            .map(([value, link]) => (
              <li>
                <a href={link} class="cursor-pointer">
                  <input
                    class="hidden peer"
                    type="radio"
                    name={`${id}-${firstSkuVariations[0]}`}
                    checked={link === relativeUrl}
                  />
                  <Ring value={value} checked={link === relativeUrl} />
                </a>
              </li>
            ))}
        </ul>
      )}

      <div class="flex-grow" />

      <div>
        {inStock
          ? (
            <AddToCartButton
              product={product}
              seller={seller}
              item={item}
              class={clx(
                "btn",
                "btn-outline justify-start border-none !text-sm !font-medium px-0 no-animation w-full",
                "hover:!bg-transparent",
                "disabled:!bg-transparent disabled:!opacity-50",
                "btn-primary hover:!text-primary disabled:!text-primary",
              )}
            />
          )
          : (
            <a
              href={relativeUrl}
              class={clx(
                "btn",
                "btn-outline justify-start border-none !text-sm !font-medium px-0 no-animation w-full",
                "hover:!bg-transparent",
                "disabled:!bg-transparent disabled:!opacity-75",
                "btn-error hover:!text-error disabled:!text-error",
              )}
            >
              Sold out
            </a>
          )}
      </div>
    </div>
  );
}

export default ProductCard;
