import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import {
  SIDEMENU_CONTAINER_ID_LP,
  SIDEMENU_DRAWER_ID_LP,
} from "../../constants.ts";
import Drawer from "../../components/ui/Drawer.tsx";
import MenuLP from "../../components/header/MenuLP.tsx";
import type { Props as AlertProps } from "../../components/header/Alert.tsx";
import Alert from "../../components/header/Alert.tsx";
import CTAButton from "../../components/Button/CTAButton.tsx";

/**@titleBy label */
interface Link {
  label: string;
  href: string;
}

interface Props {
  /**
   * @format textarea
   */
  logo: ImageWidget;
  /**
   * @title Menu Items
   */
  menuItems?: Link[];
  /**
   * @title Call to Action
   */
  cta?: string;
  /**
   * @title Call to Action URL
   * @format text
   */
  ctaUrl?: string;
  /**
   * @title Slider Alerts
   */
  alerts?: AlertProps;
}

const Desktop = (props: Props) => {
  const { logo, menuItems, cta, ctaUrl } = props;

  return (
    <div class="w-full mx-auto flex items-center justify-between px-5 min-h-[90px] lg:py-5">
      <a href="/" class="flex items-center">
        <Image src={logo} alt="Logo" width={255} height={29} class="" />
      </a>
      <nav class="flex flex-row gap-5">
        <ul class="flex items-center gap-5 text-white">
          {menuItems?.map((item) => (
            <li>
              <a href={item.href} class="text-base uppercase font-light">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <CTAButton
          href={ctaUrl}
          class={"bg-secondary text-white rounded-4xl text-lg py-[6px] font-light leading-5 min-h-[34px]"}
        >
          {cta}
        </CTAButton>
      </nav>
    </div>
  );
};
const Mobile = (props: Props) => {
  const { logo, menuItems, cta, ctaUrl } = props;

  return (
    <div class="w-full mx-auto flex items-center justify-between px-4 h-[50px] gap-0">
      <Drawer
        id={SIDEMENU_DRAWER_ID_LP}
        class="w-0 absolute"
        aside={
          <Drawer.Aside drawer={SIDEMENU_DRAWER_ID_LP}>
            <div
              id={SIDEMENU_CONTAINER_ID_LP}
              class="h-full flex items-center justify-center bg-neutral"
              style={{ minWidth: "100vw" }}
            >
              <MenuLP
                menuItems={menuItems}
                cta={cta}
                ctaUrl={ctaUrl}
              />
            </div>
          </Drawer.Aside>
        }
      />
      <label
        for={SIDEMENU_DRAWER_ID_LP}
        class="btn btn-square btn-sm btn-ghost"
      >
        <svg
          width="21"
          height="18"
          viewBox="0 0 21 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 8.57129H19.8"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M1 16.1431H19.8"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M1 1H19.8"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </label>
      <a href="/" class="flex w-full justify-center items-center pr-8">
        <Image src={logo} alt="Logo" width={178} height={19} class="" />
      </a>
    </div>
  );
};

export default function HeaderLP({
  logo =
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/ff6bb37e-0eab-40e1-a454-86856efc278e",
  menuItems = [{ label: "home", href: "#" }],
  cta = "Get Started",
  ctaUrl = "#",
  alerts,
}: Props) {
  const device = useDevice();

  return (
    <header class=" bg-neutral text-white font-Signal font-light flex justify-center items-center flex-col">
      {device == "desktop"
        ? (
          <Desktop
            logo={logo}
            menuItems={menuItems}
            cta={cta}
            ctaUrl={ctaUrl}
          />
        )
        : (
          <Mobile
            logo={logo}
            menuItems={menuItems}
            cta={cta}
            ctaUrl={ctaUrl}
          />
        )}
      {alerts && (
        <Alert
          alerts={alerts.alerts}
          interval={alerts.interval}
          background={alerts.background}
        />
      )}
    </header>
  );
}
