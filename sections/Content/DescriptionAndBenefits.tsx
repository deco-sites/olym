import { RichText } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";
import ContainerAnimation from "../../components/Animation/ComponentAnimation.tsx";
import type { Props as AnimationProps } from "../../components/Animation/ComponentAnimation.tsx";
/**
 * @titleBy title
 */
interface Emphasis {
  /**
   * @title Texto acima do Destaque
   */
  preTitle?: RichText;
  /**
   * @title Texto de Destaque
   */
  title: RichText;
  /**
   * @title Texto pos Destaque
   */
  postitle?: RichText;
  /**
   * @title Icone
   * @description Caso deseje é possivel escolher um icone para ser exibido, caso não queira basta não escolher nenhuma opção
   * @format button-group
   * @options deco-sites/olym/loaders/icons.ts
   */
  icon?: "IconPlus" | "IconLess" | "none";
  /**
   * @title Cor das Elipses
   * @description Caso tenha escolido o icone, é possivel escolher a cor de fundo da Elipse também, padrão: #v7ad214
   * @format color
   */
  backgroundIcon: string;
}

interface Props {
  /**
   * @title Descrição
   */
  description: RichText;
  /**
   * @title Destaques
   * @description Pontos a ser destacados, recomendado no min 1 e no max 4
   */
  emphasis: Emphasis[];
  /**
   * @title Cor de fundo da Section
   * @format color
   */
  background: string;
  /**
   * @title Configuração da animação
   */
  animation?: AnimationProps;
  /**
   * @title Ativar Animação?
   */
  showAnimation?: boolean;
}

function EmphasisItem(props: Emphasis) {
  const { postitle, preTitle, title, icon, backgroundIcon = "#7ad214" } = props;

  return (
    <div class="flex flex-row gap-5 items-center">
      {icon != "none" && icon &&
        (
          <div
            class="h-10 w-10 rounded-full flex justify-center items-center min-w-10 "
            style={{ background: backgroundIcon }}
          >
            <Icon
              id={icon == "IconPlus" ? "IconPLus" : "IconLess"}
              width={26}
              height={icon == "IconPlus" ? 26 : 5}
            />
          </div>
        )}
      <div class="flex flex-col -mt-[7px]">
        {preTitle && (
          <span dangerouslySetInnerHTML={{ __html: preTitle }}></span>
        )}
        <span class=" text-5xl" dangerouslySetInnerHTML={{ __html: title }}>
        </span>
        {postitle && (
          <span dangerouslySetInnerHTML={{ __html: postitle }}></span>
        )}
      </div>
    </div>
  );
}

export default function descriotionAndBenefits(props: Props) {
  const {
    description,
    emphasis,
    background,
    animation,
    showAnimation = false,
  } = props;

  return (
    <div class={"w-full h-full flex "} style={{ background: background }}>
      {showAnimation
        ? (
          <ContainerAnimation
            animationType={animation?.animationType}
            duration={animation?.duration}
            class=" h-full flex font-Signal px-10 py-10 text-white flex-col md:flex-row gap-20 max-w-[1272px] mx-auto"
          >
            <div class="lg:w-2/4 w-full">
              <span
                class="font-light"
                dangerouslySetInnerHTML={{ __html: description }}
              >
              </span>
            </div>
            <div
              class={"flex flex-col lg:w-2/4 w-full font-FKOlympikus gap-9 md:gap-12 md:pl-9 lg:gap-9 max-w-[552px]"}
            >
              {emphasis.map((item) => <EmphasisItem {...item} />)}
            </div>
          </ContainerAnimation>
        )
        : (
          <div class=" h-full flex font-Signal px-10 py-10 text-white flex-col md:flex-row gap-20 max-w-[1272px] mx-auto">
            <div class="lg:w-2/4 w-full">
              <span
                class="font-light"
                dangerouslySetInnerHTML={{ __html: description }}
              >
              </span>
            </div>
            <div
              class={"flex flex-col lg:w-2/4 w-full font-FKOlympikus gap-9 md:gap-12 md:pl-9 lg:gap-9 max-w-[552px]"}
            >
              {emphasis.map((item) => <EmphasisItem {...item} />)}
            </div>
          </div>
        )}
    </div>
  );
}
