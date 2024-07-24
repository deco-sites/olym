import { RichText, VideoWidget as Video } from "apps/admin/widgets.ts";
import CTAButton from "../../components/Button/CTAButton.tsx";
import type { Props as Button } from "../../components/Button/CTAButton.tsx";
import ContainerAnimation from "../../components/Animation/ComponentAnimation.tsx";
import type { Props as Animation } from "../../components/Animation/ComponentAnimation.tsx";

interface Color {
  /** @format color */
  primaryColor?: string;
  /** @format color */
  secondColor?: string;
}

interface Props {
  videoBackground: Video;
  loop?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  title: RichText;
  content: RichText;
  /**
   * @description Define a gradient for the "content" text, if you want to leave it in a solid color, leave both colors the same, default: initial color: #858585, secondary color: #afafaf
   */
  gradinentColorText?: Color;
  button?: Button;
  animation?: Animation;
  showAnimaton?: boolean;
}

export default function TextAndVideo(props: Props) {
  const {
    title,
    content,
    button,
    animation,
    gradinentColorText = { primaryColor: "#afafaf", secondColor: "#858585" },
    showAnimaton,
    loop = true,
    autoplay = true,
    muted = true,
    videoBackground,
  } = props;

  return (
    <div class="w-full h-full">
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
                  style={` background: linear-gradient(270deg,${gradinentColorText.secondColor} -1.04%,${gradinentColorText.primaryColor} 100.71%); -webkit-background-clip: text;  -webkit-text-fill-color: transparent`}
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
                style={` background: linear-gradient(270deg,${gradinentColorText.secondColor} -1.04%,${gradinentColorText.primaryColor} 100.71%); -webkit-background-clip: text;  -webkit-text-fill-color: transparent`}
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
