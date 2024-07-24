import { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy alt
 */
interface Step {
  content: RichText;
  image: ImageWidget;
  imageOpacity: ImageWidget;
  alt: string;
}

interface Props {
  title: RichText;
  step: Step[];
  /**
   * hidde true
   */
  index: number;
  /**
   * @format color
   */
  background: string;
}

function StepImage(props: Step) {
  const { content, image, alt } = props;

  return (
    <div>
      <Image
        src={image}
        alt={alt}
        width={419}
        height={700}
        loading="lazy"
        fetchPriority="low"
      />
    </div>
  );
}

export default function ContructionTennis(props: Props) {
  const { title, step, index, background } = props;

  return (
    <div class="w-full h-full" style={{ background: background }}>
      <div class="w-full h-full">
        <span dangerouslySetInnerHTML={{ __html: title }}></span>
        <div>
          <div>
            {step.map((img) => <StepImage {...img} />)}
          </div>
          <div class="w-full flex flex-row">
            <div class="flex">
            </div>
            <div class="flex flex-col gap-4">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
