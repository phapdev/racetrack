import { useEffect, useState } from "react";
import "nes.css/css/nes.min.css";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import "nes.css/css/nes.min.css";
import { useTranslation } from "react-i18next";
import { CelestialObject, Comet, ErrorDialog, FlexButton, FlexContainer, FullScreenPopup, LoginButton, LoginContainer, PageContainer, PixelStar, PlayButton, PlayContainer, Spaceship, Star, TrailerContainer, TrailerContent, TrailerItem, WelcomeText, WhiteContainer } from "./Login.styled";


const GameTrailer = () => {
  const [trailerImages, setTrailerImages] = useState<string[]>([]);

  useEffect(() => {
    setTrailerImages([
      "background.jpg",
      "background.jpg",
      "background.jpg",
      "background.jpg",
    ]);
  }, []);

  return (
    <TrailerContainer>
      <TrailerContent>
        {trailerImages.concat(trailerImages).map((image, index) => (
          <TrailerItem
            key={index}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </TrailerContent>
    </TrailerContainer>
  );
};



export const PixelUniverse = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [comets, setComets] = useState<CelestialObject[]>([]);
  const [spaceships, setSpaceships] = useState<CelestialObject[]>([]);

  useEffect(() => {
    const newStars: Star[] = Array.from({ length: 200 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: `${Math.random() * 5 + 2}s`,
    }));
    setStars(newStars);

    const newComets: CelestialObject[] = Array.from({ length: 5 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      xOffset: Math.random() * 20 - 10,
      yOffset: Math.random() * 20 - 10,
      duration: `${Math.random() * 10 + 5}s`,
    }));
    setComets(newComets);

    const newSpaceships: CelestialObject[] = Array.from({ length: 3 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      xOffset: Math.random() * 30 - 15,
      yOffset: Math.random() * 30 - 15,
      duration: `${Math.random() * 20 + 10}s`,
    }));
    setSpaceships(newSpaceships);
  }, []);

  return (
    <>
      {stars.map((star, index) => (
        <PixelStar
          key={index}
          style={{ left: star.left, top: star.top }}
          size={star.size}
          duration={star.duration}
        />
      ))}
      {comets.map((comet, index) => (
        <Comet
          key={index}
          style={{ left: comet.left, top: comet.top }}
          xOffset={comet.xOffset}
          yOffset={comet.yOffset}
          duration={comet.duration}
        />
      ))}
      {spaceships.map((spaceship, index) => (
        <Spaceship
          key={index}
          style={{ left: spaceship.left, top: spaceship.top }}
          xOffset={spaceship.xOffset}
          yOffset={spaceship.yOffset}
          duration={spaceship.duration}
        />
      ))}
    </>
  );
};



export const LoginPage = () => {
  const { t } = useTranslation();
  const [hasToken, setHasToken] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();
  const location = useLocation();
  const [courseCompleted] = useState<boolean | null>(true);

  const login = async () => {
    try {
      if (hasToken) {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode<JwtPayload>(token as string);
        const resp = await fetch(
          `https://vbi-server.com/api/v1/user/information/${decoded.sub}`
        );
        if (!resp.ok) {
          throw new Error("Token không hợp lệ");
        }
        window.location.href = "/";
      } else {
        throw new Error("Không có token");
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
    }
  };

  const handleTokenFromUrl = async () => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      try {
        localStorage.setItem("token", token);
        const decoded = jwtDecode<JwtPayload>(token);
        const resp = await fetch(
          `https://vbi-server.com/api/v1/user/information/${decoded.sub}`
        );
        if (!resp.ok) {
          throw new Error("Token không hợp lệ");
        }
        setHasToken(true);
        navigate("/login");
      } catch (error) {
        console.error(error);
        setShowError(true);
        localStorage.removeItem("token");
      }
    }
  };

  // const checkUserCompleteCourse = async () => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     try {
  //       const decoded = jwtDecode<JwtPayload>(token);
  //       // const resp = await fetch(`https://vbi-server.com/api/v1/user/information/${decoded.sub}`);
  //       // if (!resp.ok) {
  //       //   throw new Error("Token không hợp lệ");
  //       // }
  //       const userId = decoded.sub;
  //       const courseResp = await axios.get(
  //         "https://vbi-server.com/api/v1/course/algorand-completed"
  //       );

  //       const listUserIdCompleteCourse: string[] = (
  //         courseResp.data.data.list as {
  //           email: string;
  //           userId: string;
  //         }[]
  //       ).map((ele) => ele.userId);
  //       return listUserIdCompleteCourse.includes(userId);
  //     } catch (error) {
  //       console.error(error);
  //       setShowError(true);
  //       localStorage.removeItem("token");
  //     }
  //   }
  //   return false;
  // };

  useEffect(() => {
    handleTokenFromUrl();
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token);
  }, []);

  // useEffect(() => {
  //   const checkCourseCompletion = async () => {
  //     const completed = await checkUserCompleteCourse();
  //     setCourseCompleted(completed);
  //   };
  //   checkCourseCompletion();
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <PageContainer>
        <PixelUniverse />
        {isMobile ? (
          <FullScreenPopup >
            <div className="nes-container is-centered with-title" style={{ backgroundColor: "white" }}>
              <p className="title" style={{ color: "black" }}>{t("notification")}</p>
              <p style={{ color: "black" }}>{t("desktop-recommendation")}</p>
            </div>
            <div className="flex justify-center items-center" style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
              <i className="nes-octocat animate">{t("apology")}</i>
              <div className="nes-balloon from-left" style={{ marginLeft: '10px' }}>
                <p style={{ color: "black" }}></p>
              </div>
            </div>
          </FullScreenPopup>
        ) : (
          <>
            <FlexContainer>
              <FlexButton>
                {hasToken ? (
                  <PlayContainer className="with-title is-centered">
                    {courseCompleted ? (
                      <>
                        <WelcomeText>{t("welcome")}</WelcomeText>
                        <PlayButton
                          className="nes-btn is-warning"
                          onClick={() => login()}
                        >
                          {t("play-game")}
                        </PlayButton>
                      </>
                    ) : (
                      <WelcomeText>
                        {t("course-incomplete")}
                      </WelcomeText>
                    )}
                  </PlayContainer>
                ) : (
                  <LoginContainer className="with-title is-centered">
                    <WelcomeText>{t("login-required")}</WelcomeText>
                    <LoginButton
                      className="nes-btn is-warning"
                      onClick={() => (window.location.href =
                        import.meta.env.VITE_OPENEDU_BOOTCAMPS_ALGORAND_URL || "")}
                    >
                      {t("login")}
                    </LoginButton>
                  </LoginContainer>
                )}
                {showError && (
                  <ErrorDialog className="nes-dialog is-rounded">
                    <form method="dialog">
                      <p className="title">Error</p>
                      <p>User not found</p>
                      <menu className="dialog-menu">
                        <button
                          className="nes-btn is-primary"
                          onClick={() => setShowError(false)}
                        >
                          Close
                        </button>
                      </menu>
                    </form>
                  </ErrorDialog>
                )}
              </FlexButton>

              <WhiteContainer className="nes-container with-title is-centered">
                <p className="text-white" style={{ fontSize: "2rem" }}>
                {t("tutorial-video")}
                </p>
                <div style={{ position: 'relative', paddingBottom: 'calc(56.22254758418741% + 41px)', height: '100px', width: '100%' }}>
                  <iframe
                    src="https://demo.arcade.software/DaKgQxuyupjmYvVzXan7?embed&show_copy_link=true"
                    title=""
                    frameBorder="0"
                    loading="lazy"
                    allow="clipboard-write; fullscreen"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
                  />
                </div>
              </WhiteContainer>
            </FlexContainer>
            <GameTrailer />
          </>
        )}
      </PageContainer>
    </>
  );
};
