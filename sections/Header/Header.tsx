import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useSection } from "deco/hooks/useSection.ts";
import Alert, { Props as AlertsProps } from "../../components/header/Alert.tsx";
import Bag from "../../components/header/Bag.tsx";
import Menu from "../../components/header/Menu.tsx";
import NavItem from "../../components/header/NavItem.tsx";
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

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface SectionProps {
  alerts?: AlertsProps;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar?: SearchbarProps;

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
    <div class="flex flex-col gap-4 py-[10px] px-5 font-Signal bg-primary">
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
            <ul class="flex group">
              {navItems?.slice(0, 4).map((item) => <NavItem item={item} />)}
            </ul>
            <div>
              {/* ship to */}
            </div>
          </div>
        </div>
        <div class="flex gap-4">
          <form
            action={"/s"}
            class="w-full h-full border border-base-100 rounded-3xl px-4 py-1 flex gap-4 justify-between"
          >
            <input
              name={"search"}
              class="bg-transparent outline-none  placeholder:text-base-100 text-base-100"
              placeholder={searchbar?.placeholder || "Buscar"}
            >
            </input>
            <button>
              <svg
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.536133 8.31372C0.536133 12.3958 3.85742 15.717 7.93945 15.717C9.55371 15.717 11.0288 15.1975 12.2441 14.3254L16.8086 18.8992C17.022 19.1125 17.3003 19.2146 17.5972 19.2146C18.228 19.2146 18.6641 18.7415 18.6641 18.1199C18.6641 17.823 18.5527 17.554 18.3579 17.3591L13.8213 12.7947C14.7769 11.5515 15.3428 10.0022 15.3428 8.31372C15.3428 4.23169 12.0215 0.9104 7.93945 0.9104C3.85742 0.9104 0.536133 4.23169 0.536133 8.31372ZM2.12256 8.31372C2.12256 5.10376 4.72949 2.49683 7.93945 2.49683C11.1494 2.49683 13.7563 5.10376 13.7563 8.31372C13.7563 11.5237 11.1494 14.1306 7.93945 14.1306C4.72949 14.1306 2.12256 11.5237 2.12256 8.31372Z"
                  fill="white"
                />
              </svg>
            </button>
          </form>
          <div class="flex justify-center items-center">
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
          <SignIn variant="desktop" />
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
        <form
          action={"/s"}
          class="w-full h-full border border-base-100 rounded-3xl px-4 py-1 flex gap-4 justify-between"
        >
          <input
            name={"search"}
            class="bg-transparent outline-none  placeholder:text-base-100 text-base-100"
            placeholder={searchbar?.placeholder || "Buscar"}
          >
          </input>
          <button>
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.536133 8.31372C0.536133 12.3958 3.85742 15.717 7.93945 15.717C9.55371 15.717 11.0288 15.1975 12.2441 14.3254L16.8086 18.8992C17.022 19.1125 17.3003 19.2146 17.5972 19.2146C18.228 19.2146 18.6641 18.7415 18.6641 18.1199C18.6641 17.823 18.5527 17.554 18.3579 17.3591L13.8213 12.7947C14.7769 11.5515 15.3428 10.0022 15.3428 8.31372C15.3428 4.23169 12.0215 0.9104 7.93945 0.9104C3.85742 0.9104 0.536133 4.23169 0.536133 8.31372ZM2.12256 8.31372C2.12256 5.10376 4.72949 2.49683 7.93945 2.49683C11.1494 2.49683 13.7563 5.10376 13.7563 8.31372C13.7563 11.5237 11.1494 14.1306 7.93945 14.1306C4.72949 14.1306 2.12256 11.5237 2.12256 8.31372Z"
                fill="white"
              />
            </svg>
          </button>
        </form>
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
