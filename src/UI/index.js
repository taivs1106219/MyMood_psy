import React, { useEffect, useState, useContext } from "react";
import { createRoot } from "react-dom/client";
import { Navbar } from "./Navbar";
import bootstrap from "bootstrap";
import "../scss/style.scss";
import cn from "classnames";

import Homepage from "./Homepage";
import AddCase from "./AddCase";
import ViewCase from "./ViewCase";
import MoodNoteViewer from "./CaseViewers/MoodNoteViewer";
import ExamDataViewer from "./CaseViewers/ExamViewer";
import GPTResViewer from "./CaseViewers/GPTResViewer";

let datapath = "";
let orgTheme = "";

function App() {
  const [theme, setTheme] = useState(orgTheme);
  const [pageControl, setPageControl] = useState(0);
  const [caseControl, setCaseControl] = useState("");

  console.log(theme)

  document.body.setAttribute("data-bs-theme", theme);

  function CurrentPage() {
    switch (pageControl) {
      case 0:
        return (
          <Homepage
            pageControl={{
              get: () => {
                return pageControl;
              },
              set: setPageControl,
            }}
            caseControl={{
              get: () => {
                return caseControl;
              },
              set: setCaseControl,
            }}
            themeControl={{
              get: () => {
                return theme;
              },
              set: setTheme,
            }}
            datapath={datapath}
          ></Homepage>
        );
      case 1:
        return (
          <AddCase
            pageControl={{
              get: () => {
                return pageControl;
              },
              set: setPageControl,
            }}
          ></AddCase>
        );
      case 2:
        return (
          <ViewCase
            pageControl={{
              get: () => {
                return pageControl;
              },
              set: setPageControl,
            }}
            caseControl={{
              get: () => {
                return caseControl;
              },
              set: setCaseControl,
            }}
            datapath={datapath}
            theme={theme}
          ></ViewCase>
        );
      case 3:
        return (
          <MoodNoteViewer
            pageControl={{
              get: () => {
                return pageControl;
              },
              set: setPageControl,
            }}
            caseControl={{
              get: () => {
                return caseControl;
              },
              set: setCaseControl,
            }}
            theme={theme}
          ></MoodNoteViewer>
        );
      case 4:
        return (
          <ExamDataViewer
            pageControl={{
              get: () => {
                return pageControl;
              },
              set: setPageControl,
            }}
            caseControl={{
              get: () => {
                return caseControl;
              },
              set: setCaseControl,
            }}
            theme={theme}
          ></ExamDataViewer>
        );
      case 5:
        return (
          <GPTResViewer
            pageControl={{
              get: () => {
                return pageControl;
              },
              set: setPageControl,
            }}
            caseControl={{
              get: () => {
                return caseControl;
              },
              set: setCaseControl,
            }}
            theme={theme}
          ></GPTResViewer>
        );
    }
  }

  return (
    <>
      <div id="winCtrl-bar" className={cn("d-flex", "flex-row-reverse")}>
        <Navbar theme={theme}></Navbar>
      </div>
      <CurrentPage></CurrentPage>
    </>
  );
}

async function main() {
  const root = document.createElement("div");
  root.setAttribute("id", "app");
  document.body.appendChild(root);
  const reactRoot = createRoot(root);
  datapath = await api.invoke("get-datapath");
  orgTheme = await api.invoke("get-theme");
  reactRoot.render(<App></App>);
}

main();
