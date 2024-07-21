import { RichText } from "apps/admin/widgets.ts";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  alerts?: RichText[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
  /**
   * @format color
   * @description escolha a cor de fundo, padrão #7bd301
   * @default #7bd301
   */
  background?: string;
}

function Alert({ alerts = [], interval = 5, background }: Props) {
  const id = useId();

  return (
    <div id={id}>
      <Slider
        class="carousel carousel-center w-screen gap-6 bg-secondary text-secondary-content text-sm/4 h-[25px] lg:h-[35px]"
        style={{ background: background }}
      >
        {alerts.map((alert, index) => (
          <Slider.Item index={index} class="carousel-item">
            <span
              class="flex justify-center items-center w-screen text-center text-xs lg:text-lg text-white"
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
