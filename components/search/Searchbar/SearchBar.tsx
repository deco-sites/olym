import { useScript } from "deco/hooks/useScript.ts";
import {
  SEARCHBAR_INPUT_FORM_ID,
  SEARCHBAR_POPUP_ID,
} from "deco-sites/olym/constants.ts";
import { SearchbarProps } from "deco-sites/olym/components/search/Searchbar/Form.tsx";
import { useComponent } from "deco-sites/olym/sections/Component.tsx";
import { useId } from "deco-sites/olym/sdk/useId.ts";
import { asResolved } from "deco/mod.ts";
import { Props as SuggestionProps } from "./Suggestions.tsx";

// When user clicks on the search button, navigate it to
export const ACTION = "/s";
// Querystring param used when navigating the user
export const NAME = "q";

const script = (formId: string, name: string, popupId: string) => {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  const input = form?.elements.namedItem(name) as HTMLInputElement | null;
  form?.addEventListener("submit", () => {
    const search_term = input?.value;
    if (search_term) {
      window.DECO.events.dispatch({
        name: "search",
        params: { search_term },
      });
    }
  });

  // Keyboard event listeners
  addEventListener("keydown", (e: KeyboardEvent) => {
    const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

    // Open Searchbar on meta+k
    if (e.metaKey === true && isK) {
      const input = document.getElementById(popupId) as
        | HTMLInputElement
        | null;

      if (input) {
        input.checked = true;

        document.getElementById(formId)?.focus();
      }
    }
  });
};

const Suggestions = import.meta.resolve("./Suggestions.tsx");

export default function SearchBar(
  { placeholder = "Buscar", loader }: SearchbarProps,
) {
  const slot = useId();

  return (
    <div>
      <form
        id={SEARCHBAR_INPUT_FORM_ID}
        action={ACTION}
        tabIndex={-1}
        aria-label="Search"
        type="submit"
        class="w-full h-full border border-base-100 rounded-3xl px-4 py-1 flex gap-4 justify-between"
      >
        <input
          autoFocus
          tabIndex={0}
          name={NAME}
          class="bg-transparent outline-none  placeholder:text-base-100 text-base-100"
          placeholder={placeholder || "Buscar"}
          hx-target={`#${slot}`}
          hx-post={loader && useComponent<SuggestionProps>(Suggestions, {
            loader: asResolved(loader),
          })}
          hx-trigger={`input changed delay:300ms, ${NAME}`}
          hx-indicator={`#${SEARCHBAR_INPUT_FORM_ID}`}
          hx-swap="innerHTML"
        >
        </input>
        <button
          for={SEARCHBAR_INPUT_FORM_ID}
        >
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

      {/* Suggestions slot */}
      <div
        id={slot}
        class="absolute top-[calc(100%-25px)] lg:top-[calc(100%-35px)] right-0 left-0 w-full bg-base-100 z-20 max-h-[calc(100vh-114px)] lg:max-h-full overflow-y-scroll lg:overflow-y-hidden"
      />

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            script,
            SEARCHBAR_INPUT_FORM_ID,
            NAME,
            SEARCHBAR_POPUP_ID,
          ),
        }}
      />
    </div>
  );
}
