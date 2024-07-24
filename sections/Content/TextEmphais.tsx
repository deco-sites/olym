import { RichText } from "apps/admin/widgets.ts";
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
  title: RichText;
  content: RichText;
  /**
   * @description Define a gradient for the "content" text, if you want to leave it in a solid color, leave both colors the same, default: initial color: #858585, secondary color: #afafaf
   */
  gradineColorText?: Color;
  /**
   * @description customizing the CTA layout, background, text color...
   */
  button?: Button;
  /** @format color */
  backgroundSection?: string;
  animation?: Animation;
  showAnimaton?: boolean;
}

export default function TextEmphasis(props: Props) {
  const {
    title,
    content,
    button,
    backgroundSection,
    animation,
    gradineColorText = { primaryColor: "#afafaf", secondColor: "#858585" },
    showAnimaton,
  } = props;

  return (
    <div
      style={{ background: backgroundSection }}
      class="py-14 md:py-24 px-8 w-full md:px-[60px]"
    >
      {showAnimaton
        ? (
          <ContainerAnimation
            animationType={animation?.animationType}
            duration={animation?.duration}
          >
            <div class="flex flex-col gap-5 md:gap-10 justify-center items-center max-w-[1056px] mx-auto">
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
                  class="md:text-xl"
                />
              )}
            </div>
          </ContainerAnimation>
        )
        : (
          <div class="flex flex-col gap-5 md:gap-10 justify-center items-center max-w-[1056px] mx-auto">
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
                class="md:text-xl"
              />
            )}
          </div>
        )}
    </div>
  );
}
