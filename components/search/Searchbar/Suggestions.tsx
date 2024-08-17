import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/mod.ts";
import type { AppContext } from "../../../apps/site.ts";
import { clx } from "../../../sdk/clx.ts";
import { ComponentProps } from "../../../sections/Component.tsx";
import ProductCard from "../../product/ProductCard.tsx";
import Slider from "../../ui/Slider.tsx";
import { ACTION, NAME } from "./Form.tsx";
import { AppContext as AppContextVTEX } from "apps/vtex/mod.ts";
import { useSection } from "deco/hooks/useSection.ts";
import { useScript } from "deco/hooks/useScript.ts";
export interface Props {
  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;
}

export const action = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;

  const form = await req.formData();
  const query = `${form.get(NAME ?? "q")}`;

  if (!query) {
    const vtex = ctx as unknown as AppContextVTEX;
    const suggestion = await vtex.invoke(
      "vtex/loaders/intelligentSearch/topsearches.ts",
    );

    return { suggestion };
  }

  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;

  return { suggestion };
};

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;

  const query = new URL(req.url).searchParams.get(NAME ?? "q");

  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;
  return { suggestion };
};

function Suggestions(
  props: ComponentProps<typeof loader, typeof action>,
) {
  const { suggestion } = props;
  const { products = [], searches = [] } = suggestion ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  if (products.length > 3) {
    products.pop();
  }

  return (
    <div
      id={"modal"}
      class={" justify-end"}
      style={{ display: `${!hasProducts && !hasTerms && "none" || "flex"}` }}
    >
      <div class="flex flex-col-reverse lg:grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[1fr_352px] overflow-x-hidden justify-end items-end w-full">
        {hasProducts &&
          (
            <div class="flex flex-col font-Signal bg-base-100">
              <div class="w-full flex justify-between py-6 px-3 text-base border-b border-base-200 ">
                <span
                  class=""
                  role="heading"
                  aria-level={3}
                >
                  Melhores Produtos
                </span>

                <span class=" underline flex justify-center items-center">
                  Ver todos os produtos
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 24 24"
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z">
                    </path>
                  </svg>
                </span>
              </div>
              <Slider class="carousel grid-cols-2 grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 grid">
                {products.map((product, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item border-r border-base-200 p-4 border-b lg:border-b-0"
                  >
                    <ProductCard
                      product={product}
                      index={index}
                      itemListName="Suggeestions"
                      class="w-full"
                    />
                  </Slider.Item>
                ))}
              </Slider>
            </div>
          )}
        <div class="flex flex-col gap-6 bg-primary text-base-100 py-6 px-8 lg:px-14 text-sm lg:max-w-[375px] w-full h-full lg:col-start-2 lg:col-end-3">
          <span
            class=" uppercase flex justify-between"
            role="heading"
            aria-level={3}
          >
            {hasProducts ? "Sugestões" : "Mais Buscados"}

            <div
              class=" cursor-pointer"
              hx-on:click={useScript(() => {
                const modal: HTMLDivElement | null = document.querySelector(
                  "#modal",
                );

                modal!.style.display = "none";
              })}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                class="olympikus-smart-hint-1-x-closeIcon"
                color="#FFF"
                style="color:#FFF"
                height="28"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z">
                </path>
              </svg>
            </div>
          </span>
          <ul class="flex flex-col gap-6 mt-3 text-lg">
            {searches.map(({ term }, index) => (
              <li class="flex gap-2 items-center">
                {/* TODO @gimenes: use name and action from searchbar form */}
                {!hasProducts &&
                  (
                    <div class="w-[26px] h-[26px] flex justify-center items-center rounded-full border border-white text-xs">
                      {index + 1}
                    </div>
                  )}
                <a
                  href={`${ACTION}?${NAME}=${term}`}
                  class="flex gap-4 items-center capitalize"
                >
                  <span dangerouslySetInnerHTML={{ __html: term }} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
