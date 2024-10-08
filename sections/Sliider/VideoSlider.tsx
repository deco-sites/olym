import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import type { Props as Button } from "../../components/Button/CTAButton.tsx";
import { clx } from "../../sdk/clx.ts";
import Slider from "../../components/ui/SliderAnimation.tsx";
import { useId } from "../../sdk/useId.ts";
import CTAButton from "deco-sites/olym/components/Button/CTAButton.tsx";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import type { Props as AnimationE } from "../../components/Animation/ComponentAnimation.tsx";
import ContainerAnimation from "deco-sites/olym/components/Animation/ComponentAnimation.tsx";

type Animation =
  | "fade-in-top"
  | "fade-in-botton"
  | "fade-in-left"
  | "fade-in-right"
  | "fade-in-botton-left"
  | "fade-in-botton-right"
  | "fade-in-top-left"
  | "fade-in-top-right";

const ANIMATIONS = {
  "fade-in-top": "animate-fade-t",
  "fade-in-botton": "animate-fade-b",
  "fade-in-left": "animate-fade-l",
  "fade-in-right": "animate-fade-r",
  "fade-in-botton-left": "animate-fade-bl",
  "fade-in-botton-right": "animate-fade-br",
  "fade-in-top-left": "animate-fade-tl",
  "fade-in-top-right": "animate-fade-tr",
};

interface ImageDevice {
  /**
   * @title Imagem Desktop
   */
  imageMobile: ImageWidget;
  /**
   * @title Imagem Mobile
   */
  imageDesktop: ImageWidget;
  /**
   * @title Tag alt
   */
  alt: string;
}

/**
 * @titleBy title
 */
interface Itemvideo {
  /**
   * @title Titulo
   */
  title: RichText;
  /**
   * @title Conteudo
   */
  content: RichText;
  /**
   * @description Customizações do CTA
   */
  button?: Button;
  /**
   * @title Imagem de Fundo
   */
  imageBackground: ImageDevice;
  /**
   * @title Configuração da Animação
   */
  animation?: Animation;
  /**
   * @title Duração da animação
   */
  duration?: number;
}

interface Props {
  /**
   * @title Id de Referencia
   * @description Este Id serve de referenciar caso queira criar uma navegação na mesma pagina
   */
  idS?: string;
  /**
   * @title Duração de Slide
   */
  interval?: number;
  /**
   * @title Slides
   */
  slides: Itemvideo[];
  /**
   * @title Configuração da Animação de entrada
   */
  animationE?: AnimationE;
  /**
   * @title Ativar animação
   * @description Caso queira ter uma melhor visualização do conteudo, basta desativar essa opção, após finalizado a edição, ative novamente para que fucione corretamente no site
   */
  showAnimaton?: boolean;
}

function Item(
  { props, index, showAnimation, animationE }: {
    props: Itemvideo;
    index: number;
    showAnimation?: boolean;
    animationE?: AnimationE;
  },
) {
  const { title, content, button, animation, imageBackground } = props;

  const device = useDevice();

  return (
    <div class="w-full h-full flex relative justify-center items-center text-white overflow-hidden">
      <div class=" w-full h-full">
        <Image
          src={imageBackground.imageDesktop}
          alt={imageBackground.alt}
          width={device == "mobile" ? 375 : 1441}
          height={device == "mobile" ? 560 : 700}
          loading="lazy"
          fetchPriority="low"
          class={"w-full h-full max-h-[92vh] object-cover"}
        />
      </div>
      <div class="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
        {showAnimation
          ? (
            <ContainerAnimation
              animationType={animationE?.animationType}
              duration={animationE?.duration}
            >
              <Slider.Animation
                index={index}
                class={`
                flex flex-col gap-5 md:gap-10 justify-center items-center mx-auto opacity-1 data-[disabled]:opacity-0 ${
                  ANIMATIONS[animation || "fade-in-right"]
                }`}
              >
                <h2
                  class="font-Signal text-lg text-center"
                  dangerouslySetInnerHTML={{ __html: title }}
                >
                </h2>
                <span
                  class="font-FKOlympikus text-[60px] leading-[50px] text-center md:text-7xl lg:text-7.5xl -mt-4 pb-4 uppercase"
                  dangerouslySetInnerHTML={{ __html: content }}
                >
                </span>
                {button && (
                  <CTAButton
                    label={button.label}
                    href={button.href}
                    textColorButton={button.textColorButton}
                    backgroundButton={button.backgroundButton}
                    class="md:text-lg flex flex-row gap-2 justify-center items-center"
                  >
                    <svg
                      width="10"
                      height="12"
                      viewBox="0 0 10 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 5.13397C9.66667 5.51888 9.66667 6.48113 9 6.86603L1.5 11.1962C0.833333 11.5811 4.2477e-07 11.0999 4.58419e-07 10.3301L8.3697e-07 1.66987C8.7062e-07 0.900072 0.833334 0.418947 1.5 0.803847L9 5.13397Z"
                        fill="black"
                      />
                    </svg>
                  </CTAButton>
                )}
              </Slider.Animation>
            </ContainerAnimation>
          )
          : (
            <Slider.Animation
              index={index}
              class={`
            flex flex-col gap-5 md:gap-10 justify-center items-center mx-auto opacity-1 data-[disabled]:opacity-0 ${
                ANIMATIONS[animation || "fade-in-right"]
              }`}
            >
              <h2
                class="font-Signal text-lg text-center"
                dangerouslySetInnerHTML={{ __html: title }}
              >
              </h2>
              <span
                class="font-FKOlympikus text-[60px] leading-[50px] text-center md:text-7xl lg:text-7.5xl -mt-4 pb-4 uppercase"
                dangerouslySetInnerHTML={{ __html: content }}
              >
              </span>
              {button && (
                <CTAButton
                  label={button.label}
                  href={button.href}
                  textColorButton={button.textColorButton}
                  backgroundButton={button.backgroundButton}
                  class="md:text-lg flex flex-row gap-2 justify-center items-center"
                >
                  <svg
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 5.13397C9.66667 5.51888 9.66667 6.48113 9 6.86603L1.5 11.1962C0.833333 11.5811 4.2477e-07 11.0999 4.58419e-07 10.3301L8.3697e-07 1.66987C8.7062e-07 0.900072 0.833334 0.418947 1.5 0.803847L9 5.13397Z"
                      fill="black"
                    />
                  </svg>
                </CTAButton>
              )}
            </Slider.Animation>
          )}
      </div>
    </div>
  );
}

export default function VideoSlider(props: Props) {
  const { interval, slides, animationE, showAnimaton, idS } = props;

  const arrayAnimation: { animation?: Animation }[] = [];

  slides.map((item) => {
    arrayAnimation.push({ animation: item.animation });
  });

  const id = useId();

  return (
    <div
      id={idS || id}
      data-index={1}
      class={clx(
        "grid relative text-white",
        "grid-rows-[1fr_32px_1fr_64px]",
        "grid-cols-[32px_1fr_32px] min-h-[560px]",
        "sm:grid-cols-[112px_1fr_112px] sm:min-h-min",
        "w-full max-h-[92vh]",
      )}
    >
      <div class="col-span-full row-span-full">
        <Slider class="carousel carousel-center w-full gap-6 overflow-hidden">
          {slides.map((video, index) => (
            <Slider.Item
              index={index}
              class={clx(
                `carousel-item w-full absolute opacity-1 duration-500 `,
                ` disabled:relative disabled:opacity-1`,
              )}
            >
              <Item
                props={video}
                index={index}
                animationE={animationE}
                showAnimation={showAnimaton}
              />
            </Slider.Item>
          ))}
        </Slider>
      </div>

      <div class="hidden sm:flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton
          class="w-8 h-8 flex justify-center items-center"
          disabled={false}
        >
          <svg
            width="13"
            height="20"
            viewBox="0 0 13 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="13"
              y="16.9706"
              width="4"
              height="14"
              rx="2"
              transform="rotate(135 13 16.9706)"
              fill="white"
            />
            <rect
              x="10.1719"
              width="4"
              height="14"
              rx="2"
              transform="rotate(45 10.1719 0)"
              fill="white"
            />
          </svg>
        </Slider.PrevButton>
      </div>

      <div class="hidden sm:flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton
          class="w-8 h-8 flex justify-center items-center"
          disabled={false}
        >
          <svg
            width="13"
            height="20"
            viewBox="0 0 13 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="3.02942"
              width="4"
              height="14"
              rx="2"
              transform="rotate(-45 0 3.02942)"
              fill="white"
            />
            <rect
              x="2.82812"
              y="20"
              width="4"
              height="14"
              rx="2"
              transform="rotate(-135 2.82812 20)"
              fill="white"
            />
          </svg>
        </Slider.NextButton>
      </div>

      <ul
        class={clx(
          "col-span-full row-start-4 z-10",
          "carousel justify-center gap-3 h-8 rounded-3xl bg-base-100 w-auto mx-auto items-center px-3",
        )}
      >
        {slides.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot
              index={index}
              class={clx(
                "bg-[#A9A9A9] h-2 w-2 no-animation rounded-full",
                "disabled:w-8 transition-[width]",
              )}
            >
            </Slider.Dot>
          </li>
        ))}
      </ul>

      <Slider.JS
        rootId={idS || id}
        interval={interval && interval * 1e3}
        animations={arrayAnimation}
        nMax={slides.length - 1}
      />
    </div>
  );
}
