import React, { useRef, useState, useEffect } from "react";
import cn from "classnames";

function ViewCase({ pageControl, caseControl }) {
  const caseName = useRef(caseControl.get());

  let delayDebounceFn;

  function handleInput(e) {
    clearTimeout(delayDebounceFn);
    console.log(e);
    console.log(caseName);
    caseName.current = e.target.innerText;
    delayDebounceFn = setTimeout(() => {
      console.log(e.target.innerText);
      if (e.target.innerText != "\n") {
        console.log("new name sent")
        api.send("rename-case", [caseControl.get(), e.target.innerText]);
      }
    }, 500);
  }

  useEffect(() => {
    api.handle("rename-completed", (res) => {
      caseControl.set(caseName.current);
    });
    return () => {
      api.removeIPCListener("rename-completed");
    };
  }, []);
  useEffect(() => {
    api.handle("rename-failed", (res) => {
      caseControl.set(caseControl.get());
    });
    return () => {
      api.removeIPCListener("rename-failed");
    };
  }, []);

  function handleBack() {
    pageControl.set(0);
  }

  // useEffect(() => {

  //   return () =>
  // }, [caseName]);

  return (
    <>
      <div className="container d-flex flex-column">
        <a
          draggable="false"
          className={cn(
            "h4",
            "link-primary",
            "link-underline",
            "link-underline-opacity-0",
            "link-underline-opacity-0-hover",
            "icon-link",
            "icon-link-hover"
          )}
          style={{ "--bs-icon-link-transform": "translate3d(-.125rem, 0, 0)" }}
          onClick={handleBack}
          href="#"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          返回
        </a>
        <p
          className="h2"
          contentEditable="true"
          onInput={(e) => handleInput(e)}
        >
          {caseName.current}
        </p>
      </div>
    </>
  );
}

export default ViewCase;
