import { useScript } from "deco/hooks/useScript.ts";
import { Props as PropsNav } from "../../components/header/NavItem.tsx";
import { Column, Container, Link } from "../../components/header/NavItem.tsx";

export interface Props {
  navItems: PropsNav;
}

function CloseDrawer() {
  const close: HTMLElement | null = document.querySelector(
    `[for="sidemenu-drawer"]`,
  );

  close?.click();
}

function Item({ item }: { item: Link }) {
  return (
    <a
      href={item.href}
      class="text-xs font-normal uppercase"
      dangerouslySetInnerHTML={{ __html: item.label }}
    >
    </a>
  );
}

function SubMenuItem({ item }: { item: Container }) {
  if (item.title) {
    if (item.items && item.items.length < 1) {
      return (
        <div class="py-[14px]">
          <a
            href={item.href}
            class="min-h-12 uppercase font-Signal text-sm font-normal"
          >
            {item.title}
          </a>
        </div>
      );
    }

    return (
      <div class="collapse collapse-plus min-h-12">
        <input type="checkbox" class="min-h-12" />
        <div
          class="collapse-title min-h-12 uppercase font-Signal text-sm !px-0 font-normal py-3 items-center flex after:text-[32px] after:!right-9 after:!top-[0.70rem]"
          dangerouslySetInnerHTML={{ __html: item.title }}
        >
          {item.title}
        </div>
        <div class="collapse-content pb-0 !px-2">
          <ul class="flex flex-col gap-2">
            {item.items?.map((node) => (
              <li>
                <Item item={node} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return null;
}

function MenuItem({ item }: { item: Column }) {
  const color = item.colorText == "#ffffff" ? "#303030" : item.colorText;

  if (item.columns && item.columns.length < 1) {
    return (
      <div class="px-5 py-2">
        <a
          href={item.href}
          class="uppercase font-FKOlympikus text-[32px]"
          style={{ color: color }}
        >
          {item.label}
        </a>
      </div>
    );
  }

  return (
    <div class="collapse collapse-plus">
      <input type="checkbox" />
      <div
        class="collapse-title uppercase font-FKOlympikus text-[32px] !py-1 !px-5 after:!font-Signal after:!top-2 after:!right-9 after:!text-base-200 "
        style={{ color: color }}
      >
        {item.label}
      </div>
      <div class="collapse-content !pb-0 !pl-5 !pr-0">
        <ul>
          {item.columns?.map((node) => {
            if (!node.title) {
              return null;
            }

            return (
              <li class="border-b border-base-200 last:border-b-0">
                <SubMenuItem item={node} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Menu({ navItems }: Props) {
  return (
    <div
      class="flex flex-col h-full overflow-y-auto"
      style={{ minWidth: "90vw" }}
    >
      <div class=" flex justify-between w-full px-6 py-4 border-b border-base-200 z-10 max-h-[65px]">
        <div class="flex justify-center items-center cursor-pointer">
          <label
            class="btn btn-ghost text-black px-0"
            hx-on:click={useScript(CloseDrawer)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 18L18 2"
                stroke="black"
                stroke-width="2.3"
                stroke-linecap="round"
              >
              </path>
              <path
                d="M18 18L2 2"
                stroke="black"
                stroke-width="2.3"
                stroke-linecap="round"
              >
              </path>
            </svg>
          </label>
        </div>
        <div class="flex gap-4 justify-center items-center">
          <a
            href="/login"
            aria-label="Login"
            class="btn btn-sm font-thin btn-ghost no-animation btn-square"
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 17 18"
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.77246 9.07178C10.9805 9.07178 12.7803 7.10498 12.7803 4.71143C12.7803 2.33643 10.9897 0.47168 8.77246 0.47168C6.57373 0.47168 4.76465 2.37354 4.76465 4.72998C4.77393 7.11426 6.56445 9.07178 8.77246 9.07178ZM8.77246 7.6709C7.41797 7.6709 6.2583 6.37207 6.2583 4.72998C6.2583 3.11572 7.39941 1.87256 8.77246 1.87256C10.1548 1.87256 11.2866 3.09717 11.2866 4.71143C11.2866 6.35352 10.1362 7.6709 8.77246 7.6709ZM2.93701 17.6533H14.5986C16.1387 17.6533 16.8716 17.1895 16.8716 16.1689C16.8716 13.7383 13.8008 10.2222 8.77246 10.2222C3.73486 10.2222 0.664062 13.7383 0.664062 16.1689C0.664062 17.1895 1.39697 17.6533 2.93701 17.6533ZM2.50098 16.2524C2.25977 16.2524 2.15771 16.1875 2.15771 15.9927C2.15771 14.4712 4.51416 11.623 8.77246 11.623C13.0215 11.623 15.3779 14.4712 15.3779 15.9927C15.3779 16.1875 15.2852 16.2524 15.0439 16.2524H2.50098Z"
                fill="black"
              >
              </path>
            </svg>
          </a>
          <span class="w-auto flex justify-center items-center">
            <svg
              width="19"
              height="17"
              viewBox="0 0 19 17"
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.871582 5.30273C0.871582 9.04688 4.00928 12.7295 8.96631 15.8936C9.15088 16.0078 9.41455 16.1309 9.59912 16.1309C9.78369 16.1309 10.0474 16.0078 10.2407 15.8936C15.189 12.7295 18.3267 9.04688 18.3267 5.30273C18.3267 2.19141 16.1909 -0.00585938 13.3433 -0.00585938C11.7173 -0.00585938 10.3989 0.767578 9.59912 1.9541C8.81689 0.776367 7.48096 -0.00585938 5.85498 -0.00585938C3.00732 -0.00585938 0.871582 2.19141 0.871582 5.30273ZM2.28662 5.30273C2.28662 2.96484 3.79834 1.40918 5.8374 1.40918C7.48975 1.40918 8.43896 2.4375 9.00146 3.31641C9.23877 3.66797 9.38818 3.76465 9.59912 3.76465C9.81006 3.76465 9.94189 3.65918 10.1968 3.31641C10.8032 2.45508 11.7173 1.40918 13.3608 1.40918C15.3999 1.40918 16.9116 2.96484 16.9116 5.30273C16.9116 8.57227 13.4575 12.0967 9.78369 14.54C9.6958 14.6016 9.63428 14.6455 9.59912 14.6455C9.56396 14.6455 9.50244 14.6016 9.42334 14.54C5.74072 12.0967 2.28662 8.57227 2.28662 5.30273Z"
                fill="#000"
              />
            </svg>
          </span>
        </div>
      </div>
      <ul class=" flex-grow flex flex-col overflow-y-auto bg">
        {navItems.columns.map((item) => (
          <li class="border-b border-base-200 font-normal">
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
