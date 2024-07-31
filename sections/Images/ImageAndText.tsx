import type { ImageWidget } from "apps/admin/widgets.ts";
import CTAButton from "deco-sites/olym/components/Button/CTAButton.tsx";
import { Props as CtaProps } from "deco-sites/olym/components/Button/CTAButton.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import Image from "apps/website/components/Image.tsx";
import ContainerAnimation from "deco-sites/olym/components/Animation/ComponentAnimation.tsx";
import type { Props as Animation } from "../../components/Animation/ComponentAnimation.tsx";

interface Props {
  /**
   * @format rich-text
   * @title Titulo
   */
  title?: string;
  /**
   * @format rich-text
   * @description Descrição
   */
  description?: string;
  /**
   * @description Customizações do CTA
   */
  cta?: CtaProps;
  /**
   * @description Imagem de fundo Desktop
   */
  backgroundImage: ImageWidget;
  /**
   * @description Imagem de fundo mobile
   */
  backgroundImageMobile: ImageWidget;
  /**
   * @description Tag alt
   */
  alt: string;
  /**
   * @title Configuração da Animação
   */
  animation?: Animation;
  /**
   * @title Ativar animação
   * @description Caso queira ter uma melhor visualização do conteudo, basta desativar essa opção, após finalizado a edição, ative novamente para que fucione corretamente no site
   */
  showAnimaton?: boolean;
}

export default function ImageAndText({
  title = "Default Title",
  backgroundImage,
  backgroundImageMobile,
  alt,
  cta,
  animation,
  showAnimaton,
}: Props) {
  const device = useDevice();
  return (
    <div class="relative w-full h-full text-white">
      \<div class="w-full h-full">
        <Image
          src={device == "mobile" ? backgroundImageMobile : backgroundImage}
          alt={alt}
          width={device == "mobile" ? 375 : 1440}
          height={device == "mobile" ? 600 : 700}
          loading={"lazy"}
          fetchPriority="low"
          class="w-full h-full object-contain"
        />
      </div>
      {showAnimaton
        ? (
          <ContainerAnimation
            animationType={animation?.animationType}
            duration={animation?.duration}
            class=" absolute top-0 bottom-0 left-0 right-0"
          >
            <div class=" relative inset-0 flex flex-col items-center justify-center lg:p-4 gap-5 lg:gap-10 p-10 max-w-[1279px] mx-auto h-full">
              <h2
                class="font-FKOlympikus text-6.5xl text-center md:text-7xl lg:text-7.5xl -mt-4 pb-4 uppercase"
                dangerouslySetInnerHTML={{ __html: title }}
              >
              </h2>
              {cta && cta.label && (
                <CTAButton
                  href={cta?.href}
                  label={cta.label}
                  backgroundButton={cta.backgroundButton}
                  borderColor={cta.borderColor}
                  showBorder={cta.showBorder}
                  textColorButton={cta.textColorButton}
                />
              )}
            </div>
          </ContainerAnimation>
        )
        : (
          <div class="absolute inset-0 flex flex-col items-center justify-center lg:p-4 gap-5 lg:gap-10 p-10 max-w-[1279px] mx-auto">
            <h2
              class="font-FKOlympikus text-6.5xl text-center md:text-7xl lg:text-7.5xl -mt-4 pb-4 uppercase"
              dangerouslySetInnerHTML={{ __html: title }}
            >
            </h2>
            {cta && cta.label && (
              <CTAButton
                href={cta?.href}
                label={cta.label}
                backgroundButton={cta.backgroundButton}
                borderColor={cta.borderColor}
                showBorder={cta.showBorder}
                textColorButton={cta.textColorButton}
              />
            )}
          </div>
        )}
    </div>
  );
}
