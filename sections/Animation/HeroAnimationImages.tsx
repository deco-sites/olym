import { ImageWidget } from "apps/admin/widgets.ts";
import Animation from "../../components/Animation/AnimationHero.tsx";
import type { Props as AnimationProps } from "../../components/Animation/AnimationHero.tsx";
import Image from "apps/website/components/Image.tsx";

/**@titleBy alt */
interface ItemImage {
  image: ImageWidget;
  alt: string;
  animation: AnimationProps;
}

interface Props {
  /**
   * @maxItems 2
   * @minItems 2
   */
  images: ItemImage[];
  preload?: boolean;
  /**
   * @format color
   */
  background?: string;
  showAnimation?: boolean;
}

export default function HeroAnimationImages(props: Props) {
  const { images, background, showAnimation, preload } = props;

  return (
    <div
      class="flex justify-center items-center w-full max-w-screen lg:py-10 xl:py-16 max-h-[95vh] lg:max-h-full h-screen bg-neutral relative overflow-hidden lg:overflow-visible"
      style={{ background: background }}
    >
      {showAnimation
        ? (
          <Animation>
            <div class="flex flex-row gap-7 w-auto mx-auto h-full justify-center items-center px-7 overflow-hidden">
              {images.map((img) => (
                <Animation.AnimationItem
                  animationType={img.animation.animationType}
                  duration={img.animation.duration}
                  class={"lg:max-h-[450px] xl:max-h-[633px] h-full w-auto"}
                >
                  <Image
                    src={img.image}
                    alt={img.alt}
                    loading={preload ? "eager" : "lazy"}
                    fetchPriority={preload ? "high" : "low"}
                    width={291}
                    height={633}
                    class={"h-full w-auto object-contain"}
                  >
                  </Image>
                </Animation.AnimationItem>
              ))}
            </div>
          </Animation>
        )
        : (
          <div class="flex flex-row gap-7 w-full h-full justify-center items-center px-7 overflow-hidden">
            {images.map((img) => (
              <Image
                src={img.image}
                alt={img.alt}
                width={291}
                height={633}
                class={"h-full w-auto object-contain lg:max-h-[450px] xl:max-h-[633px]"}
              >
              </Image>
            ))}
          </div>
        )}
    </div>
  );
}
