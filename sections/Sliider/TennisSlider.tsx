import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import { Props as PropsCta } from "../../components/Button/CTAButton.tsx";
import CTAButton from "../../components/Button/CTAButton.tsx";
import { useId } from "../../sdk/useId.ts";
import { clx } from "../../sdk/clx.ts";
import Slider from "../../components/ui/Slider.tsx";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy alt
 */
interface ItemSlider {
  /**
   * @title Imagem
   */
  image: ImageWidget;
  /**
   * @title Teg alt
   */
  alt: string;
  /**
   * @title Imagem do Dot
   */
  dotImage: ImageWidget;
  /**
   * @title Estilização do CTA
   */
  cta?: PropsCta;
}

interface Color {
  /**
   *  @format color
   * @title Cor Inicial
   * @default #858585
   */
  primaryColor?: string;
  /**
   * @format color-input
   * @title Cor Secundaria
   * @default #afafaf
   */
  secondColor?: string;
}

interface Props {
  /**
   * @title Id de Referencia
   * @description Este Id serve de referenciar caso queira criar uma navegação na mesma pagina
   */
  id?: string;
  /**
   * @title Titulo
   */
  title: RichText;
  /**
   * @title Gradient no fundo do texto
   * @description Defina as cores do gradiente para aplicar no conteudo, caso queira uma cor solida basta inserir as duas cores iguais. Default: Cor inicial #858585, Cor secundaria: #afafaf
   */
  gradineColorText?: Color;
  /**
   * @title Slides
   */
  slider: ItemSlider[];
  /**
   * @title Tempo de cada slide
   * @description Tempo em segundos para a mudança automatica
   */
  interval?: number;
  /**
   * @title Cor de Fundo
   * @format color-input
   */
  background?: string;
}

function BannerItem(props: ItemSlider) {
  const { image, alt } = props;

  return (
    <div class="flex max-w-[1270px] mx-auto h-full rotate-[30deg] md:rotate-0">
      <Image
        src={image}
        alt={alt}
        width={570}
        height={370}
        loading={"eager"}
        fetchPriority="low"
      />
    </div>
  );
}

function Carrousel(
  { array, interval }: { array: ItemSlider[]; interval?: number },
) {
  const id = useId();

  return (
    <div
      id={id}
      class={clx(
        "grid",
        "grid-rows-[1fr_32px_1fr_64px]",
        "grid-cols-1 min-h-[600px] xl:min-h-[620px]",
        "sm:grid-cols-[112px_1fr_112px] sm:min-h-min",
        "w-full",
      )}
    >
      <div class="col-span-full row-span-full">
        <Slider class="carousel carousel-center w-full gap-6 h-full flex items-center">
          {array.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full h-fit ">
              <BannerItem {...image} />
            </Slider.Item>
          ))}
        </Slider>
      </div>
      <div
        class={clx(
          "col-span-full z-10",
          "carousel justify-center flex flex-col w-full gap-3 overflow-hidden",
        )}
      >
        <ul
          class={" bg-[#a5a5a5] rounded-3xl w-fit mx-auto flex justify-center items-center px-3 py-2 max-h-8"}
        >
          {array.map((item, index) => (
            <li class="carousel-item ">
              <Slider.Dot
                index={index}
                class={clx(
                  "w-auto h-auto no-animation rounded-full",
                  "disabled:border disabled:border-white transition-[border] p-1",
                )}
              >
                <Image
                  alt={item.alt}
                  src={item.dotImage}
                  width={14}
                  height={14}
                  class={"rotate-45"}
                />
              </Slider.Dot>
            </li>
          ))}
        </ul>
        <ul
          class={"rounded-3xl flex justify-center items-center w-fit mx-auto h-[34px]"}
        >
          {array.map((item, index) => (
            <li class="carousel-item   ">
              <Slider.Button
                index={index}
                class={clx(
                  " no-animation rounded-full opacity-0 h-0 w-0 -z-10 ",
                  " disabled:opacity-100 disabled:min-w-[160px] disabled:z-10  disabled:h-full",
                )}
              >
                {item.cta?.label && (
                  <CTAButton
                    href={item.cta?.href}
                    label={item.cta?.label}
                    backgroundButton={item.cta?.backgroundButton}
                    textColorButton={item.cta.textColorButton}
                    borderColor={item.cta.borderColor}
                    showBorder={item.cta.showBorder}
                    class="mt-auto z-10 w-full flex justify-center items-center"
                  />
                )}
              </Slider.Button>
            </li>
          ))}
        </ul>
      </div>
      <div
        class={clx(
          "col-span-full z-10",
          "carousel justify-center pt-3 overflow-hidden",
        )}
      >
      </div>
      <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default function TennnisSlider(props: Props) {
  const { title, slider, interval, background, gradineColorText, id } = props;

  return (
    <div
      id={id}
      class={"flex w-full h-full flex-col lg:py-7 gap-4 py-10"}
      style={{ background: background }}
    >
      <span
        class="font-FKOlympikus text-[50px] leading-[42px] lg:text-[65px] lg:leading-[55px] w-full text-left z-10 pb-1 max-w-[1270px] mx-auto px-10 lg:px-0"
        style={` background: linear-gradient(270deg,${gradineColorText?.secondColor} -1.04%,${gradineColorText?.primaryColor} 100.71%); -webkit-background-clip: text;  -webkit-text-fill-color: transparent`}
        dangerouslySetInnerHTML={{ __html: title }}
      >
      </span>

      <Carrousel array={slider} interval={interval} />
    </div>
  );
}
