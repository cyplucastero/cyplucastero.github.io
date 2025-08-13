import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Routes, Route } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import routes from "./data/routes";
import { NavigationBar, Content, Navigation } from "./components/layouts";
import { useGithubUser } from "./hooks";
import { GITHUB_USERNAME } from "./constants";

gsap.registerPlugin(useGSAP, SplitText);

export default function App() {
  const [t] = useTranslation();
  const githubUser = useGithubUser(GITHUB_USERNAME);

  return (
    <div
      className="h-screen w-screen overflow-auto bg-cover bg-center px-10 text-stone-50"
      style={{
        backgroundImage: "url(/assets/images/noise-background.jpg)",
      }}
    >
      <Helmet>
        <title>{t("meta.title", { name: githubUser.data.name })}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={githubUser.data.avatar_url}
        />
      </Helmet>
      {isMobile ? (
        <p className="paragraph">
          This webpage currently doesn't support mobile view.
          <br />
          We suggest you view this on a desktop.
        </p>
      ) : (
        <>
          <NavigationBar />
          <Content>
            <Routes>
              {routes.map((route) => (
                <Route
                  index={route.path === "/"}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Content>
          <Navigation />
        </>
      )}
    </div>
  );
}
