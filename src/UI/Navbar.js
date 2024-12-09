import classNames from "classnames";
import React from "react";
import logo_light from "../../res/images/logo_light.png";
import logo_dark from "../../res/images/logo_dark.png";
import cn from "classnames";
import icons from "../../res/icons/icons";

export function Navbar({ theme }) {
  function handleClick() {
    api.send("get-devices-v2", "adb");
    api.send("get-devices-v2", "fb");
  }
  console.log(theme)
  const logo = theme == "light" ? logo_light : logo_dark;
  return (
    <>
      <button
        id="close-btn"
        className="winCtrl-btn border-0 btn"
        onClick={() => api.send("close-window")}
      >
        <icons.X_lg></icons.X_lg>
      </button>
      <button
        id="max-btn"
        className="winCtrl-btn border-0 btn"
        onClick={() => api.send("maximize-window")}
      >
        <icons.App></icons.App>
      </button>
      <button
        id="min-btn"
        className="winCtrl-btn border-0 btn"
        onClick={() => api.send("minimize-window")}
      >
        <icons.Dash_lg></icons.Dash_lg>
      </button>
      <div
        className={classNames(
          "m-1",
          "flex-fill",
          "d-flex",
          "align-items-center"
        )}
      >
        <img src={logo} alt="MyMood" className="h-100"></img>
        <h4 className="mb-0">心理師端</h4>
      </div>
    </>
  );
}
