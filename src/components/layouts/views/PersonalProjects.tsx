import { useSuspenseQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { GITHUB_USERNAME } from "@/constants";

const repositories = [
  "breezeos/breezeos-native",
  `${GITHUB_USERNAME}/my-vuejs-website`,
  `${GITHUB_USERNAME}/Improved-Halloween-Website`,
  `${GITHUB_USERNAME}/gnome-ui`,
];

const RepositoryItem: React.FC<{ repo: string }> = ({ repo }) => {
  const [t] = useTranslation("views");
  const { data } = useSuspenseQuery({
    queryKey: ["github-repo", repo],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/repos/${repo}`);
      const data = await response.json();
      return data;
    },
    refetchOnWindowFocus: false,
  });
  const anchorElemRef = useRef<HTMLAnchorElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);
  const { contextSafe } = useGSAP(
    () => {
      const timeline = gsap
        .timeline({
          paused: true,
        })
        .set(".tooltip", {
          scale: "1",
          delay: 1.2,
        })
        .to(".tooltip", {
          opacity: 1,
          duration: 0.3,
          ease: "power3.out",
        });
      timelineRef.current = timeline;
    },
    { scope: anchorElemRef },
  );

  const handleMouseEnter = contextSafe(() => {
    if (!timelineRef.current) return;
    timelineRef.current.play();
  });

  const handleMouseLeave = contextSafe(() => {
    if (!timelineRef.current) return;
    timelineRef.current.reverse();
  });

  return (
    <a
      ref={anchorElemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={`https://github.com/${repo}`}
      className="relative mb-4 self-end last:mb-0 hover:no-underline hover:[&>p]:scale-105 hover:[&>p]:text-stone-50"
    >
      <p className="paragraph text-right text-4xl text-stone-50/50 transition-all duration-300">
        {repo}
      </p>
      <div className="tooltip absolute right-0 z-10 field-sizing-content h-fit translate-y-[6px] scale-0 space-y-4 rounded-2xl bg-stone-900 px-[22px] py-5 opacity-0 shadow-lg shadow-stone-900/40 hover:[&>.name]:underline">
        <div className="absolute -top-2 right-5 size-7 rotate-45 rounded-sm bg-inherit" />
        <p className="name paragraph text-4xl text-stone-50 decoration-1 underline-offset-2">
          {repo}
        </p>
        <p className="font-monospace w-[30rem] text-sm tracking-[-0.002em] text-neutral-400">
          {data.description ?? t("projects.repository.null_description")}
        </p>
      </div>
    </a>
  );
};

export default function PersonalProjects() {
  const [t] = useTranslation("views");

  return (
    <>
      <h1 className="title col-span-2">{t("projects.personal_projects")}</h1>
      <div className="col-span-3 col-start-4 row-span-2 flex flex-col">
        {repositories.map((repoName) => (
          <RepositoryItem repo={repoName} />
        ))}
      </div>
      <p className="paragraph col-span-2 -row-end-1 text-left align-top text-3xl/[30px]">
        {t("projects.have_a_look")}
      </p>
      <div />
    </>
  );
}
