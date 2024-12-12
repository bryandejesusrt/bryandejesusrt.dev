import { RiBarChartHorizontalLine } from "react-icons/ri";
import { GoScreenFull } from "react-icons/go";
import { MdOutlineFullscreenExit } from "react-icons/md";
import { use, useState } from "react";

export default function Header({ handleAsideOpen }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <>
      <header className="header flex flex-sb fixed  ">
        <div className="logo flex gap-2">
          <h1>ADMIN</h1>
          <div className="headerham flex flex-center" onClick={handleAsideOpen}>
            <RiBarChartHorizontalLine />
          </div>
        </div>
        <div className="Rightnav flex gap-2">
          <div onClick={toggleFullScreen}>
            {isFullscreen ? <MdOutlineFullscreenExit /> : <GoScreenFull />}
          </div>
          <div className="notification">
            <img src="/img/notification.png" alt="notification" />
          </div>
          <div className="profilenav">
            <img src="/img/user.png" alt="userPhoto" />
          </div>
        </div>
      </header>
    </>
  );
}
