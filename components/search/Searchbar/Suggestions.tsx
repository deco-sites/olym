import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/mod.ts";
import type { AppContext } from "../../../apps/site.ts";
import { clx } from "../../../sdk/clx.ts";
import { ComponentProps } from "../../../sections/Component.tsx";
import ProductCard from "../../product/ProductCard.tsx";
import Slider from "../../ui/Slider.tsx";
import { ACTION, NAME } from "./Form.tsx";

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
  console.log("action", suggestion);

  return { suggestion };
};

function Suggestions(
  { suggestion }: ComponentProps<typeof loader, typeof action>,
) {
  const { products = [], searches = [] } = suggestion ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  if (products.length > 3) {
    products.pop();
  }

  return (
    <div
      class={clx(``, !hasProducts && !hasTerms && "hidden ")}
    >
      <div class="flex flex-col-reverse lg:grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[1fr_352px] font-Signal ">
        <div class="flex flex-col overflow-x-hidden">
          <div class="w-full flex justify-between py-6 px-3 text-base border-b border-base-200">
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
                class="carousel-item border-r border-base-200 p-4 border-b lg:border-none"
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
        <div class="flex flex-col gap-6 bg-primary text-base-100 py-6 px-8 lg:px-14 text-sm">
          <span
            class=" uppercase "
            role="heading"
            aria-level={3}
          >
            Sugestões
          </span>
          <ul class="flex flex-col gap-6 mt-3 text-lg">
            {searches.map(({ term }) => (
              <li>
                {/* TODO @gimenes: use name and action from searchbar form */}
                <a
                  href={`${ACTION}?${NAME}=${term}`}
                  class="flex gap-4 items-center"
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
