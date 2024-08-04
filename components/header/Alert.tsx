import { RichText } from "apps/admin/widgets.ts";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  alerts?: RichText[];
  /**
   * @title Tempo de cada slide
   * @description Tempo em segundos para a mudança automatica
   */
  interval?: number;
  /**
   * @format color-input
   * @title Cor de fundo
   * @description Escolha a cor de fundo, padrão #7bd301
   * @default #7bd301
   */
  background?: string;
  /**
   * @title Layout
   * @description Padrão: "Variant1"
   */
  type?: "Variant1" | "Variant2";
}

function Alert(
  { alerts = [], interval = 5, background = "#7bd301", type = "Variant1" }:
    Props,
) {
  const id = useId();

  if (type == "Variant2") {
    return (
      <div
        class="w-full max-h-[37px]"
        style={{ background: background }}
      >
        <div
          id={id}
          class="w-full grid-cols-[32px_1fr_32px] grid max-w-[1000px] lg:mx-auto max-h-[25px] md:max-h-[37px] px-2"
          style={{ background: background }}
        >
          <Slider class="carousel carousel-center w-full gap-6 text-secondary-content text-sm/4 h-[35px] max-h-[25px] md:max-h-[37px] col-span-full row-span-full">
            {alerts.map((alert, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full max-h-[25px] md:max-h-[37px]"
              >
                <span
                  class="flex justify-center items-center w-full text-center text-xs lg:text-lg text-white mx-auto"
                  dangerouslySetInnerHTML={{ __html: alert }}
                />
              </Slider.Item>
            ))}
          </Slider>
          <div class=" items-center justify-center z-10 col-start-1 row-start-1 flex  ">
            <Slider.PrevButton
              class="w-6  h-6 flex justify-center items-center text-base-100 rotate-180"
              disabled={false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M13 18l6 -6" />
                <path d="M13 6l6 6" />
              </svg>
            </Slider.PrevButton>
          </div>

          <div class=" items-center justify-center z-10 col-start-3 row-start-1 flex ">
            <Slider.NextButton
              class="w-6  h-6 flex justify-center items-center text-base-100 "
              disabled={false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M13 18l6 -6" />
                <path d="M13 6l6 6" />
              </svg>
            </Slider.NextButton>
          </div>

          <Slider.JS rootId={id} interval={interval && interval * 1e3} />
        </div>
      </div>
    );
  }

  return (
    <div id={id} class="w-full">
      <Slider
        class="carousel carousel-center w-full gap-6 bg-secondary text-secondary-content text-sm/4 h-[35px] lg:h-[42px]"
        style={{ background: background }}
      >
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <span
              class="flex justify-center items-center w-full text-center text-xs lg:text-lg text-white mx-auto"
              dangerouslySetInnerHTML={{ __html: alert }}
            />
          </Slider.Item>
        ))}
      </Slider>

      <Slider.JS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
