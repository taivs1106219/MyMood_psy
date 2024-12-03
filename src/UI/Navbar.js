import classNames from "classnames";
import React from "react";
import logo_black from "../../res/images/logo_black.png"
import cn from "classnames";
import icons from "../../res/icons/icons";

export function Navbar() {
  function handleClick() {
    api.send("get-devices-v2", "adb");
    api.send("get-devices-v2", "fb");
  }
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
        <img src={logo_black} alt="MyMood" className="h-100"></img>
        <h4 className="mb-0">心理師端</h4>
      </div>
    </>
  );
}
