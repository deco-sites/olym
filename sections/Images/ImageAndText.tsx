import type { ImageWidget } from "apps/admin/widgets.ts";
import CTAButton from "deco-sites/olym/components/Button/CTAButton.tsx";
import { Props as CtaProps } from "deco-sites/olym/components/Button/CTAButton.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format rich-text
   */
  description?: string;
  cta?: CtaProps;
  /**
   * @description The background image for the section.
   */
  backgroundImage: ImageWidget;
  backgroundImageMobile: ImageWidget;
  alt: string;
}

export default function ImageAndText({
  title = "Default Title",
  backgroundImage,
  backgroundImageMobile,
  alt,
  cta,
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
    </div>
  );
}
