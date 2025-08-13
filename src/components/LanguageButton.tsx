import { GlobeAltIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utils";
import { useOutsideClick } from "@/hooks";

export default function LanguageButton() {
  const [t, i18n] = useTranslation();
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [assignRef, isOutsideClick] =
    useOutsideClick<NonNullable<typeof buttonContainerRef.current>>();
  const [menuDisplayed, setMenuDisplayed] = useState(false);

  useEffect(() => {
    if (isOutsideClick) {
      setMenuDisplayed(false);
    }
  }, [isOutsideClick]);

  useGSAP(() => {
    const tweenVars = gsap.defaults({
      duration: 0.38,
      ease: "power3.out",
    });
    if (menuDisplayed) {
      gsap.to("#transparent-black", {
        ...tweenVars,
        opacity: 0.4,
      });
      gsap.fromTo(
        buttonRef.current,
        {
          borderBottomRightRadius: 32,
        },
        {
          ...tweenVars,
          borderBottomRightRadius: 8,
          scale: 1.1,
        },
      );
      gsap.to("#language-menu", {
        ...tweenVars,
        opacity: 1,
        scale: "1",
      });
    } else {
      gsap.to("#transparent-black", {
        ...tweenVars,
        opacity: 0,
      });
      gsap.to(buttonRef.current, {
        ...tweenVars,
        borderBottomRightRadius: 32,
        scale: 1,
      });
      gsap.to("#language-menu", {
        ...tweenVars,
        opacity: 0,
        scale: ".8",
      });
    }
  }, [menuDisplayed]);

  function handleChangeLanguage(lang: string) {
    i18n.changeLanguage(lang);
    setMenuDisplayed(false);
  }

  return (
    <>
      <div
        id="transparent-black"
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-10 h-full w-full bg-black opacity-0",
          menuDisplayed && "pointer-events-auto",
        )}
      />
      <div
        className="relative z-10"
        ref={(ref) => {
          assignRef(ref!);
          buttonContainerRef.current = ref;
        }}
      >
        <button
          ref={buttonRef}
          onMouseDown={() => setMenuDisplayed(!menuDisplayed)}
          className="flex origin-top-right scale-100 items-center rounded-4xl bg-stone-50 px-3 py-2 text-black"
        >
          <GlobeAltIcon className="size-6" />
          <p className="paragraph ml-2 text-[21px]">{t("language")}</p>
        </button>
        <div
          id="language-menu"
          className={cn(
            "absolute top-12 right-0 w-64 origin-top-right scale-80 rounded-3xl rounded-tr-sm bg-stone-50 p-1 text-black opacity-0",
            !menuDisplayed && "pointer-events-none",
          )}
        >
          <button
            onClick={() => handleChangeLanguage("en")}
            className="flex w-full items-center space-x-2 rounded-[22px] p-3 text-sm transition-colors duration-200 hover:bg-black/5"
          >
            <CheckIcon
              className={cn("size-6", i18n.language !== "en" && "invisible")}
            />
            <p className="paragraph">English</p>
          </button>
          <button
            onClick={() => handleChangeLanguage("fr")}
            className="flex w-full items-center space-x-2 rounded-[22px] p-3 text-sm transition-colors duration-200 hover:bg-black/5"
          >
            <CheckIcon
              className={cn("size-6", i18n.language !== "fr" && "invisible")}
            />
            <p className="paragraph">Français</p>
          </button>
        </div>
      </div>
    </>
  );
}
