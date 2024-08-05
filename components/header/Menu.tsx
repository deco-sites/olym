import Icon from "../../components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  navItems: SiteNavigationElement[];
}

function SubMenuItem({ item }: { item: SiteNavigationElement }) {
  return (
    <div class="collapse collapse-plus">
      <input type="checkbox" />
      <div class="collapse-title uppercase font-Signal text-sm ">
        {item.name}
      </div>
      <div class="collapse-content">
        <ul>
          <li>
            <a class="underline text-sm " href={item.url}>Ver todos</a>
          </li>
          {item.children?.map((node) => (
            <li>
              <SubMenuItem item={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  return (
    <div class="collapse collapse-plus">
      <input type="checkbox" />
      <div class="collapse-title uppercase font-FKOlympikus text-4xl">
        {item.name}
      </div>
      <div class="collapse-content">
        <ul>
          <li>
            <a class="underline text-sm " href={item.url}>Ver todos</a>
          </li>
          {item.children?.map((node) => (
            <li>
              <SubMenuItem item={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Menu({ navItems }: Props) {
  return (
    <div
      class="flex flex-col h-full overflow-y-auto"
      style={{ minWidth: "100vw" }}
    >
      <div class=" flex justify-between w-full px-6 py-4">
        <div class="flex justify-center items-center">
          <label
            for="sidemenu-drawer-lp"
            aria-label="X"
            class="btn btn-ghost text-black px-0"
          >
            <svg
              width="14"
              height="14"
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
              width="17"
              height="18"
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
              width="17"
              height="20"
              viewBox="0 0 17 20"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.32666 16.668C0.32666 18.5884 1.30078 19.5439 3.23975 19.5439H14.1592C15.8198 19.5439 16.7939 18.5791 16.7939 16.668V7.06592C16.7939 5.15479 15.8105 4.18994 13.8809 4.18994H12.3965C12.3501 2.2417 10.6523 0.581055 8.55566 0.581055C6.45898 0.581055 4.77051 2.2417 4.71484 4.18994H3.23975C1.30078 4.18994 0.32666 5.14551 0.32666 7.06592V16.668ZM6.2085 4.18994C6.25488 2.98389 7.24756 1.99121 8.55566 1.99121C9.86377 1.99121 10.8657 2.98389 10.9028 4.18994H6.2085ZM1.82031 16.5938V7.14014C1.82031 6.17529 2.33057 5.68359 3.2583 5.68359H13.853C14.7715 5.68359 15.3003 6.17529 15.3003 7.14014V16.5938C15.3003 17.5586 14.7715 18.0503 14.1313 18.0503H3.2583C2.33057 18.0503 1.82031 17.5586 1.82031 16.5938Z"
                fill="black"
              >
              </path>
              <path
                d="M8.32302 15.6903C6.67302 15.6903 6.02302 14.7403 5.92302 13.4903H7.07302C7.17302 14.3403 7.52302 14.6903 8.32302 14.6903C9.07302 14.6903 9.52302 14.3103 9.52302 13.5803C9.52302 12.8903 9.19302 12.5403 8.07302 12.5403H7.67302V11.5403H8.12302C8.85302 11.5403 9.27302 11.1603 9.27302 10.4603C9.27302 9.83033 8.88302 9.49033 8.30302 9.49033C7.67302 9.49033 7.34302 9.75033 7.22302 10.4903H6.07302C6.21302 9.23033 7.07302 8.49033 8.33302 8.49033C9.50302 8.49033 10.423 9.11033 10.423 10.3403C10.423 11.0303 9.99302 11.6203 9.30302 11.8803C10.173 12.1003 10.673 12.7003 10.673 13.5703C10.673 14.9603 9.77302 15.6903 8.32302 15.6903Z"
                fill="black"
              >
              </path>
            </svg>
          </span>
        </div>
      </div>
      <ul class=" flex-grow flex flex-col divide-y divide-base-200 overflow-y-auto bg">
        {navItems.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col py-2 bg-base-100">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/wishlist"
          >
            <Icon id="favorite" />
            <span class="text-sm">Lista de desejos</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="home_pin" />
            <span class="text-sm">Nossas lojas</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="call" />
            <span class="text-sm">Fale conosco</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="account_circle" />
            <span class="text-sm">Minha conta</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
