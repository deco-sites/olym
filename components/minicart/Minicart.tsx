import { useScript } from "deco/hooks/useScript.ts";
import { AppContext } from "../../apps/site.ts";
import { MINICART_FORM_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useComponent } from "../../sections/Component.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import CartItem, { Item } from "./Item.tsx";

export interface Minicart {
  /** Cart from the ecommerce platform */
  platformCart: Record<string, unknown>;
  /** Cart from storefront. This can be changed at your will */
  storefront: {
    items: Item[];
    total: number;
    subtotal: number;
    discounts: number;
    coupon?: string;
    locale: string;
    currency: string;
    enableCoupon?: boolean;
    freeShippingTarget: number;
    checkoutHref: string;
  };
}

const onLoad = (formID: string) => {
  const form = document.getElementById(formID) as HTMLFormElement;

  window.STOREFRONT.CART.dispatch(form);

  // view_cart event
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver((items, observer) => {
      for (const item of items) {
        if (item.isIntersecting && item.target === form) {
          window.DECO.events.dispatch({
            name: "view_cart",
            params: window.STOREFRONT.CART.getCart(),
          });
          observer?.unobserve(item.target);
        }
      }
    }).observe(form);
  }

  // Disable form interactivity while cart is being submitted
  document.body.addEventListener(
    "htmx:before-send",
    // deno-lint-ignore no-explicit-any
    ({ detail: { elt } }: any) => {
      if (elt !== form) {
        return;
      }

      // Disable addToCart button interactivity
      document.querySelectorAll("div[data-cart-item]").forEach((container) => {
        container?.querySelectorAll("button")
          .forEach((node) => node.disabled = true);
        container?.querySelectorAll("input")
          .forEach((node) => node.disabled = true);
      });
    },
  );
};

const sendBeginCheckoutEvent = () => {
  window.DECO.events.dispatch({
    name: "being_checkout",
    params: window.STOREFRONT.CART.getCart(),
  });
};

export const action = async (
  _props: unknown,
  req: Request,
  ctx: AppContext,
) =>
  req.method === "PATCH"
    ? ({ cart: await ctx.invoke("site/loaders/minicart.ts") }) // error fallback
    : ({ cart: await ctx.invoke("site/actions/minicart/submit.ts") });

export function ErrorFallback() {
  return (
    <div class="flex flex-col flex-grow justify-center items-center overflow-hidden w-full gap-2">
      <div class="flex flex-col gap-1 p-6 justify-center items-center">
        <span class="font-semibold">
          Error while updating cart
        </span>
        <span class="text-sm text-center">
          Click in the button below to retry or refresh the page
        </span>
      </div>

      <button
        class="btn btn-primary"
        hx-patch={useComponent(import.meta.url)}
        hx-swap="outerHTML"
        hx-target="closest div"
      >
        Retry
      </button>
    </div>
  );
}

export default function Cart({
  cart: {
    platformCart,
    storefront: {
      items,
      total,
      subtotal,
      coupon,
      discounts,
      locale,
      currency,
      freeShippingTarget,
      checkoutHref,
    },
  },
}: { cart: Minicart }) {
  const count = items.length;

  return (
    <>
      <form
        class="contents font-Signal"
        id={MINICART_FORM_ID}
        hx-sync="this:replace"
        hx-trigger="submit, change delay:300ms"
        hx-target="this"
        hx-indicator="this"
        hx-disabled-elt="this"
        hx-post={useComponent(import.meta.url)}
        hx-swap="outerHTML"
      >
        <div class="bg-primary text-white px-4 py-2 text-2xl w-full ">
          <span class="text-start">
            Carrinho {count > 0 ? `(${count})` : ""}
          </span>
        </div>
        {/* Button to submit the form */}
        <button hidden autofocus />

        {/* Add to cart controllers */}
        <input name="add-to-cart" type="hidden" />
        <button hidden name="action" value="add-to-cart" />

        {/* This contains the STOREFRONT cart. */}
        <input
          type="hidden"
          name="storefront-cart"
          value={encodeURIComponent(
            JSON.stringify({ coupon, currency, value: total, items }),
          )}
        />

        {/* This contains the platformCart cart from the commerce platform. Integrations usually use this value, like GTM, pixels etc */}
        <input
          type="hidden"
          name="platform-cart"
          value={encodeURIComponent(JSON.stringify(platformCart))}
        />

        <div
          class={clx(
            "flex flex-col flex-grow justify-center items-center overflow-hidden w-full",
            "[.htmx-request_&]:pointer-events-none [.htmx-request_&]:opacity-60 [.htmx-request_&]:cursor-wait transition-opacity duration-300",
          )}
        >
          {count === 0
            ? (
              <div class="flex items-start justify-center h-full bg-white w-full">
                <div class=" p-4 w-full bg-[#f5f5f5] shadow-md">
                  <h2 class="text-lg font-normal text-black">
                    Seu carrinho está vazio!
                  </h2>
                  <p class="text-sm font-normal text-black mt-2">
                    Navegue pelo site e adicione os produtos que deseja.
                  </p>
                </div>
              </div>
            )
            : (
              <div class="w-full h-full flex justify-between flex-col">
                {/* Cart Items */}
                <ul
                  role="list"
                  class="mt-6 px-4 flex-grow overflow-y-auto flex flex-col gap-6 w-full h-full"
                >
                  {items.map((item, index) => (
                    <li>
                      <CartItem
                        item={item}
                        index={index}
                        locale={locale}
                        currency={currency}
                      />
                    </li>
                  ))}
                </ul>

                <div class="flex flex-col w-full h-auto absolute bottom-0 ">
                  {/* Free Shipping Bar */}
                  <div class="py-4 px-6 w-full border-t border-[#c2c2c2]">
                    <FreeShippingProgressBar
                      total={total}
                      locale={locale}
                      currency={currency}
                      target={freeShippingTarget}
                    />
                  </div>

                  {/* Cart Footer */}
                  <footer class="w-full bg-[#f5f5f5] border-t border-[#c2c2c2]">
                    {/* Subtotal */}
                    <div class="py-2 flex flex-col">
                      {discounts > 0 && (
                        <div class="flex justify-between items-center px-4">
                          <span class="text-xs ">Descontos</span>
                          <span class=" text-base font-bold text-black">
                            {formatPrice(discounts, currency, locale)}
                          </span>
                        </div>
                      )}
                      <div class="pt-4 px-6 w-full flex justify-between text-sm">
                        <span class="text-xs">Subtotal</span>
                        <output
                          class="text-base font-bold"
                          form={MINICART_FORM_ID}
                        >
                          {formatPrice(subtotal, currency, locale)}
                        </output>
                      </div>
                    </div>

                    {/* Total */}
                    <div class="pb-4 px-6 flex flex-col justify-end items-end gap-2 ">
                      <div class="flex justify-between items-center w-full">
                        <span class="text-xs">Total</span>
                        <output
                          form={MINICART_FORM_ID}
                          class="text-base font-bold text-black"
                        >
                          {formatPrice(total, currency, locale)}
                        </output>
                      </div>
                    </div>

                    <div class="w-full">
                      <a
                        class="btn uppercase bg-black text-base-100 w-full no-animation rounded-none lg:h-[86px]"
                        href={checkoutHref}
                        hx-on:click={useScript(sendBeginCheckoutEvent)}
                      >
                        <span class="[.htmx-request_&]:hidden font-normal text-lg">
                          Finalizar Comprar
                        </span>
                        <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
                      </a>
                    </div>
                  </footer>
                </div>
              </div>
            )}
        </div>
      </form>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, MINICART_FORM_ID),
        }}
      />
    </>
  );
}
