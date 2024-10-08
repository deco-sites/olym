import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useSection } from "deco/hooks/useSection.ts";
import Alert, { Props as AlertsProps } from "../../components/header/Alert.tsx";
import Bag from "../../components/header/Bag.tsx";
import Menu from "../../components/header/Menu.tsx";
import NavItem, {
  Props as PropsNav,
} from "../../components/header/NavItem.tsx";
import SignIn from "../../components/header/SignIn.tsx";
import {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";
import SearchBar from "deco-sites/olym/components/search/Searchbar/SearchBar.tsx";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface SectionProps {
  alerts?: AlertsProps;

  /**
   * @title Items de Navegação
   * @description esses Item serâo exibidos no menu
   */
  navItems: PropsNav;

  /**
   * @title Compo de busca
   * @description COnfigurações do campo de busca
   */
  searchbar: SearchbarProps;

  /** @title Logo */
  logo: Logo;

  /** @hide true */
  variant?: "initial" | "menu";
}

type Props = Omit<SectionProps, "alert" | "variant">;

const Desktop = (
  { navItems, logo, searchbar }: Props,
) => (
  <>
    <div class="flex flex-col gap-4 px-5 font-Signal bg-primary">
      <div class="flex flex-row justify-between items-center">
        <div class="flex items-center justify-center gap-10">
          <div class="flex justify-center items-center h-full">
            <a
              href="/"
              aria-label="Store logo"
              class="flex justify-center items-center h-full"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 23}
              />
            </a>
          </div>
          <div class="flex justify-between items-center text-base-100 ">
            {navItems.columns && navItems.columns.length > 1 &&
              (
                <ul class="flex">
                  {navItems.columns.map((item) => <NavItem item={item} />)}
                </ul>
              )}
          </div>
        </div>
        <div class="flex gap-4">
          <SearchBar
            placeholder={searchbar.placeholder}
            loader={searchbar.loader}
          />
          <SignIn variant="desktop" />
          <div class="flex justify-center items-center cursor-pointer">
            <svg
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.871582 5.30273C0.871582 9.04688 4.00928 12.7295 8.96631 15.8936C9.15088 16.0078 9.41455 16.1309 9.59912 16.1309C9.78369 16.1309 10.0474 16.0078 10.2407 15.8936C15.189 12.7295 18.3267 9.04688 18.3267 5.30273C18.3267 2.19141 16.1909 -0.00585938 13.3433 -0.00585938C11.7173 -0.00585938 10.3989 0.767578 9.59912 1.9541C8.81689 0.776367 7.48096 -0.00585938 5.85498 -0.00585938C3.00732 -0.00585938 0.871582 2.19141 0.871582 5.30273ZM2.28662 5.30273C2.28662 2.96484 3.79834 1.40918 5.8374 1.40918C7.48975 1.40918 8.43896 2.4375 9.00146 3.31641C9.23877 3.66797 9.38818 3.76465 9.59912 3.76465C9.81006 3.76465 9.94189 3.65918 10.1968 3.31641C10.8032 2.45508 11.7173 1.40918 13.3608 1.40918C15.3999 1.40918 16.9116 2.96484 16.9116 5.30273C16.9116 8.57227 13.4575 12.0967 9.78369 14.54C9.6958 14.6016 9.63428 14.6455 9.59912 14.6455C9.56396 14.6455 9.50244 14.6016 9.42334 14.54C5.74072 12.0967 2.28662 8.57227 2.28662 5.30273Z"
                fill="white"
              />
            </svg>
          </div>
          <Bag />
        </div>
      </div>
    </div>
  </>
);

const Mobile = ({ logo, searchbar }: Props) => (
  <div class="flex flex-col bg-primary">
    <div>
      <Drawer
        id={SIDEMENU_DRAWER_ID}
        aside={
          <Drawer.Aside drawer={SIDEMENU_DRAWER_ID}>
            <div
              id={SIDEMENU_CONTAINER_ID}
              class="h-full flex items-center justify-center"
              style={{ minWidth: "100vw" }}
            >
              <span class="loading loading-spinner" />
            </div>
          </Drawer.Aside>
        }
      />

      <div
        class="grid place-items-center w-screen px-5 gap-4 bg-primary"
        style={{
          height: NAVBAR_HEIGHT_MOBILE,
          gridTemplateColumns: "min-content auto min-content",
        }}
      >
        <label
          for={SIDEMENU_DRAWER_ID}
          class="btn btn-square btn-sm btn-ghost"
          aria-label="open menu"
          hx-target={`#${SIDEMENU_CONTAINER_ID}`}
          hx-swap="outerHTML"
          hx-trigger="click once"
          hx-get={useSection({ props: { variant: "menu" } })}
        >
          <svg
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 9H22.2"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M1 16.5718H22.2"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M1 1.42871H22.2"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </label>

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center justify-center"
            style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
            aria-label="Store logo"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 13}
            />
          </a>
        )}
        <div class="flex gap-3">
          <SignIn variant="mobile" />

          <Bag />
        </div>
      </div>
      <div class="px-4 py-3 w-full">
        <SearchBar
          placeholder={searchbar.placeholder}
          loader={searchbar.loader}
        />
      </div>
    </div>
  </div>
);

function Header({
  alerts,
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  ...props
}: Props) {
  const device = useDevice();

  return (
    <header
      style={{
        height: device === "desktop"
          ? HEADER_HEIGHT_DESKTOP
          : HEADER_HEIGHT_MOBILE,
      }}
    >
      <div class="bg-base-100 fixed w-full z-40 font-Signal">
        {device === "desktop"
          ? <Desktop logo={logo} {...props} />
          : <Mobile logo={logo} {...props} />}
        {alerts && <Alert {...alerts} />}
      </div>
    </header>
  );
}

export default function Section({ variant, ...props }: SectionProps) {
  if (variant === "menu") {
    return <Menu navItems={props.navItems ?? []} />;
  }

  return <Header {...props} />;
}

export function LoadingFallback(props: Props) {
  return <Header {...props} />;
}
