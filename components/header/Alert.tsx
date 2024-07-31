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
   * @description escolha a cor de fundo, padrão #7bd301
   * @default #7bd301
   */
  background?: string;
}

function Alert({ alerts = [], interval = 5, background }: Props) {
  const id = useId();

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
