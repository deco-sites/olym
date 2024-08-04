import { useScript } from "deco/hooks/useScript.ts";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";

const onLoad = (containerID: string) => {
  window.STOREFRONT.USER.subscribe((sdk) => {
    const container = document.getElementById(containerID) as HTMLDivElement;

    const nodes = container.querySelectorAll<HTMLAnchorElement>("a");

    const login = nodes.item(0);
    const account = nodes.item(1);

    const user = sdk.getUser();

    if (user?.email) {
      login.classList.add("hidden");
      account.classList.remove("hidden");
    } else {
      login.classList.remove("hidden");
      account.classList.add("hidden");
    }
  });
};

function SignIn({ variant }: { variant: "mobile" | "desktop" }) {
  const id = useId();

  return (
    <div id={id}>
      <a
        class={clx(
          "btn btn-sm font-thin btn-ghost no-animation",
          variant === "mobile" && "btn-square",
        )}
        href="/login"
        aria-label="Login"
      >
        <svg
          width="17"
          height="18"
          viewBox="0 0 17 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.77246 9.07178C10.9805 9.07178 12.7803 7.10498 12.7803 4.71143C12.7803 2.33643 10.9897 0.47168 8.77246 0.47168C6.57373 0.47168 4.76465 2.37354 4.76465 4.72998C4.77393 7.11426 6.56445 9.07178 8.77246 9.07178ZM8.77246 7.6709C7.41797 7.6709 6.2583 6.37207 6.2583 4.72998C6.2583 3.11572 7.39941 1.87256 8.77246 1.87256C10.1548 1.87256 11.2866 3.09717 11.2866 4.71143C11.2866 6.35352 10.1362 7.6709 8.77246 7.6709ZM2.93701 17.6533H14.5986C16.1387 17.6533 16.8716 17.1895 16.8716 16.1689C16.8716 13.7383 13.8008 10.2222 8.77246 10.2222C3.73486 10.2222 0.664062 13.7383 0.664062 16.1689C0.664062 17.1895 1.39697 17.6533 2.93701 17.6533ZM2.50098 16.2524C2.25977 16.2524 2.15771 16.1875 2.15771 15.9927C2.15771 14.4712 4.51416 11.623 8.77246 11.623C13.0215 11.623 15.3779 14.4712 15.3779 15.9927C15.3779 16.1875 15.2852 16.2524 15.0439 16.2524H2.50098Z"
            fill="white"
          />
        </svg>
      </a>
      <a
        class={clx(
          "hidden",
          "btn btn-sm font-thin btn-ghost no-animation",
          variant === "mobile" && "btn-square",
        )}
        href="/account"
        aria-label="Account"
      >
        <svg
          width="17"
          height="18"
          viewBox="0 0 17 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.77246 9.07178C10.9805 9.07178 12.7803 7.10498 12.7803 4.71143C12.7803 2.33643 10.9897 0.47168 8.77246 0.47168C6.57373 0.47168 4.76465 2.37354 4.76465 4.72998C4.77393 7.11426 6.56445 9.07178 8.77246 9.07178ZM8.77246 7.6709C7.41797 7.6709 6.2583 6.37207 6.2583 4.72998C6.2583 3.11572 7.39941 1.87256 8.77246 1.87256C10.1548 1.87256 11.2866 3.09717 11.2866 4.71143C11.2866 6.35352 10.1362 7.6709 8.77246 7.6709ZM2.93701 17.6533H14.5986C16.1387 17.6533 16.8716 17.1895 16.8716 16.1689C16.8716 13.7383 13.8008 10.2222 8.77246 10.2222C3.73486 10.2222 0.664062 13.7383 0.664062 16.1689C0.664062 17.1895 1.39697 17.6533 2.93701 17.6533ZM2.50098 16.2524C2.25977 16.2524 2.15771 16.1875 2.15771 15.9927C2.15771 14.4712 4.51416 11.623 8.77246 11.623C13.0215 11.623 15.3779 14.4712 15.3779 15.9927C15.3779 16.1875 15.2852 16.2524 15.0439 16.2524H2.50098Z"
            fill="white"
          />
        </svg>
      </a>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}

export default SignIn;
