import { RichText, VideoWidget as Video } from "apps/admin/widgets.ts";
import CTAButton from "../../components/Button/CTAButton.tsx";
import type { Props as Button } from "../../components/Button/CTAButton.tsx";
import ContainerAnimation from "../../components/Animation/ComponentAnimation.tsx";
import type { Props as Animation } from "../../components/Animation/ComponentAnimation.tsx";

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
   * @title Video
   */
  videoBackground: Video;
  /**
   * @title Video em Loop
   */
  loop?: boolean;
  /**
   * @title Auto play no video
   */
  autoplay?: boolean;
  /**
   * @title Mutado
   */
  muted?: boolean;
  /**
   * @title Titulo
   */
  title: RichText;
  /**
   * @title Conteudo
   */
  content: RichText;
  /**
   * @title Gradient no fundo do texto
   * @description Defina as cores do gradiente para aplicar no conteudo, caso queira uma cor solida basta inserir as duas cores iguais. Default: Cor inicial #858585, Cor secundaria: #afafaf
   */
  gradineColorText?: Color;
  /**
   * @description Customizações do CTA
   */
  button?: Button;
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

export default function TextAndVideo(props: Props) {
  const {
    title,
    content,
    button,
    animation,
    gradineColorText = { primaryColor: "#afafaf", secondColor: "#858585" },
    showAnimaton,
    loop = true,
    autoplay = true,
    muted = true,
    videoBackground,
    id,
  } = props;

  return (
    <div id={id} class="w-full h-full">
      <div
        style="width:100%;height:100%"
        class="xl:h-[700px] min-h-[550px] w-full relative max-h-screen"
      >
        <video
          data-testid="html5-player"
          class=" object-cover w-full h-full min-h-[550px] max-h-screen xl:max-h-[95vh]"
          loop={loop}
          autoplay={autoplay}
          muted={muted}
          playsinline={false}
        >
          <source src={videoBackground} />
          <div class="olympikus-fourmaker-0-x-fallbackContainer">
            <img
              class="w-100 h-100 olympikus-fourmaker-0-x-fallbackImage"
              src="https://storecomponents.vtexassets.com/arquivos/ids/155639"
            />
          </div>
        </video>
        {showAnimaton
          ? (
            <ContainerAnimation
              class=" absolute top-0 bottom-0 left-0 right-0 flex"
              animationType={animation?.animationType}
              duration={animation?.duration}
            >
              <div class="flex flex-col gap-5 md:gap-12 justify-center items-center  mx-auto">
                <h2
                  class="font-Signal text-lg text-center"
                  dangerouslySetInnerHTML={{ __html: title }}
                >
                </h2>
                <span
                  class="font-FKOlympikus text-6.5xl text-center md:text-7xl lg:text-7.5xl -mt-4 pb-4"
                  style={` background: linear-gradient(270deg,${gradineColorText.secondColor} -1.04%,${gradineColorText.primaryColor} 100.71%); -webkit-background-clip: text;  -webkit-text-fill-color: transparent`}
                  dangerouslySetInnerHTML={{ __html: content }}
                >
                </span>
                {button && (
                  <CTAButton
                    label={button.label}
                    href={button.href}
                    textColorButton={button.textColorButton}
                    backgroundButton={button.backgroundButton}
                    class="md:text-xl flex gap-2 justify-center items-center"
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
                        fill="white"
                      />
                    </svg>
                  </CTAButton>
                )}
              </div>
            </ContainerAnimation>
          )
          : (
            <div class="flex flex-col gap-5 md:gap-12 justify-center items-center  mx-auto absolute top-0 bottom-0 left-0 right-0">
              <h2
                class="font-Signal text-lg text-center"
                dangerouslySetInnerHTML={{ __html: title }}
              >
              </h2>
              <span
                class="font-FKOlympikus text-6.5xl text-center md:text-7xl lg:text-7.5xl -mt-4 pb-4"
                style={` background: linear-gradient(270deg,${gradineColorText.secondColor} -1.04%,${gradineColorText.primaryColor} 100.71%); -webkit-background-clip: text;  -webkit-text-fill-color: transparent`}
                dangerouslySetInnerHTML={{ __html: content }}
              >
              </span>
              {button && (
                <CTAButton
                  label={button.label}
                  href={button.href}
                  textColorButton={button.textColorButton}
                  backgroundButton={button.backgroundButton}
                  class="md:text-xl flex gap-2 justify-center items-center"
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
                      fill="white"
                    />
                  </svg>
                </CTAButton>
              )}
            </div>
          )}
      </div>
    </div>
  );
}
