import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { Props as AnimationProps } from "../../components/Animation/ComponentAnimation.tsx";
import ContainerAnimation from "../../components/Animation/ComponentAnimation.tsx";

interface CorredorBannerProps {
  /**
   * @format rich-text
   */
  title?: RichText;

  /**
   * @format rich-text
   */
  content?: RichText;
  /**
   * @format color-input
   */
  backgroundColor?: string;
  titleImage: RichText;
  image: ImageWidget;
  alt: string;

  /**
   * @format checkbox
   */
  revertPosition?: boolean;
  animation?: AnimationProps;
  showAnimation?: boolean;
}

export default function CorredorBanner({
  title = "O SUPERTENIS FEITO POR BRASILEIROS.",
  content =
    "O Corre Supra traz o que há de melhor no mundo em termos de materiais e tecnologias para que os corredores brasileiros atinjam sua máxima performance.",
  image = "",
  titleImage = "Aprovado por",
  alt = "alt image",
  backgroundColor = "#FFFFFF",
  revertPosition = true,
  animation,
  showAnimation = false,
}: CorredorBannerProps) {
  const flexDirection = revertPosition ? "lg:flex-row" : "lg:flex-row-reverse";

  return (
    <div class="w-full h-full" style={{ background: backgroundColor }}>
      {showAnimation
        ? (
          <ContainerAnimation
            animationType={animation?.animationType}
            duration={animation?.duration}
            class="w-full h-full"
          >
            <div
              class={`flex ${flexDirection} flex-col items-center justify-between px-10 py-20 gap-20 md:px-10 md:py-[108px] lg:py-[130px] max-w-[1272px] mx-auto h-full`}
            >
              <div class="flex-1 mr-4 flex flex-col w-full lg:w-2/4 justify-start items-start h-full mb-auto">
                <h2
                  dangerouslySetInnerHTML={{ __html: title }}
                  class=" mb-2 text-5xl md:text-6xl font-FKOlympikus md:leading-[52px] leading-[42px]"
                >
                </h2>
              </div>
              <div class="flex-1 w-full lg:w-2/4 font-Signal gap-5 md:pr-20">
                <span
                  class="text-lg mb-10 leading-[22px] block max-w-[515px]"
                  dangerouslySetInnerHTML={{ __html: content }}
                >
                </span>
                <span
                  class="uppercase mb-4 leading-[22px] block"
                  dangerouslySetInnerHTML={{ __html: titleImage }}
                >
                </span>
                <Image
                  src={image}
                  alt={alt}
                  width={191}
                  height={44}
                  loading={"lazy"}
                />
              </div>
            </div>
          </ContainerAnimation>
        )
        : (
          <div
            class={`flex ${flexDirection} flex-col items-center justify-between px-10 py-20 gap-20 md:px-10 md:py-[108px] max-w-[1272px] mx-auto h-full`}
          >
            <div class="flex-1 mr-4 flex flex-col w-full lg:w-2/4 justify-start items-start h-full mb-auto">
              <h2
                dangerouslySetInnerHTML={{ __html: title }}
                class=" mb-2 text-5xl md:text-6xl font-FKOlympikus md:leading-[52px]"
              >
              </h2>
            </div>
            <div class="flex-1 w-full lg:w-2/4 font-Signal gap-5 md:pr-20">
              <span
                class="text-lg mb-10 leading-[22px] block max-w-[515px]"
                dangerouslySetInnerHTML={{ __html: content }}
              >
              </span>
              <span
                class="uppercase mb-4 leading-[22px] block"
                dangerouslySetInnerHTML={{ __html: titleImage }}
              >
              </span>
              <Image
                src={image}
                alt={alt}
                width={191}
                height={44}
                loading={"lazy"}
              />
            </div>
          </div>
        )}
    </div>
  );
}