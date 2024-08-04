import { useScript } from "deco/hooks/useScript.ts";
import { MINICART_DRAWER_ID } from "../../constants.ts";
import { useId } from "../../sdk/useId.ts";

const onLoad = (id: string) =>
  window.STOREFRONT.CART.subscribe((sdk) => {
    const counter = document.getElementById(id);
    const count = sdk.getCart()?.items.length ?? 0;

    if (!counter) {
      return;
    }

    // Set minicart items count on header
    if (count === 0) {
      counter.classList.add("hidden");
    } else {
      counter.classList.remove("hidden");
    }

    counter.innerText = count > 9 ? "9+" : count.toString();
  });

function Bag() {
  const id = useId();

  return (
    <>
      <label
        class="indicator"
        for={MINICART_DRAWER_ID}
        aria-label="open cart"
      >
        <span
          id={id}
          class="hidden indicator-item badge badge-primary badge-sm font-thin"
        />

        <span class="w-auto flex justify-center items-center">
          <svg
            width="17"
            height="20"
            viewBox="0 0 17 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.32666 16.668C0.32666 18.5884 1.30078 19.5439 3.23975 19.5439H14.1592C15.8198 19.5439 16.7939 18.5791 16.7939 16.668V7.06592C16.7939 5.15479 15.8105 4.18994 13.8809 4.18994H12.3965C12.3501 2.2417 10.6523 0.581055 8.55566 0.581055C6.45898 0.581055 4.77051 2.2417 4.71484 4.18994H3.23975C1.30078 4.18994 0.32666 5.14551 0.32666 7.06592V16.668ZM6.2085 4.18994C6.25488 2.98389 7.24756 1.99121 8.55566 1.99121C9.86377 1.99121 10.8657 2.98389 10.9028 4.18994H6.2085ZM1.82031 16.5938V7.14014C1.82031 6.17529 2.33057 5.68359 3.2583 5.68359H13.853C14.7715 5.68359 15.3003 6.17529 15.3003 7.14014V16.5938C15.3003 17.5586 14.7715 18.0503 14.1313 18.0503H3.2583C2.33057 18.0503 1.82031 17.5586 1.82031 16.5938Z"
              fill="white"
            />
            <path
              d="M8.32302 15.6903C6.67302 15.6903 6.02302 14.7403 5.92302 13.4903H7.07302C7.17302 14.3403 7.52302 14.6903 8.32302 14.6903C9.07302 14.6903 9.52302 14.3103 9.52302 13.5803C9.52302 12.8903 9.19302 12.5403 8.07302 12.5403H7.67302V11.5403H8.12302C8.85302 11.5403 9.27302 11.1603 9.27302 10.4603C9.27302 9.83033 8.88302 9.49033 8.30302 9.49033C7.67302 9.49033 7.34302 9.75033 7.22302 10.4903H6.07302C6.21302 9.23033 7.07302 8.49033 8.33302 8.49033C9.50302 8.49033 10.423 9.11033 10.423 10.3403C10.423 11.0303 9.99302 11.6203 9.30302 11.8803C10.173 12.1003 10.673 12.7003 10.673 13.5703C10.673 14.9603 9.77302 15.6903 8.32302 15.6903Z"
              fill="white"
            />
          </svg>
        </span>
      </label>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </>
  );
}

export default Bag;
