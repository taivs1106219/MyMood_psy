import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Navbar } from "./Navbar";
import bootstrap from "bootstrap";
import "../scss/style.scss";
import cn from "classnames";

import Homepage from "./Homepage";
import AddCase from "./AddCase";

function App() {
  const [pageControl, setPageControl] = useState(0);

  function CurrentPage() {
    switch (pageControl) {
      case 0:
        return (
          <Homepage
            pageControl={{ get: pageControl, set: setPageControl }}
          ></Homepage>
        );
      case 1:
        return (
          <AddCase
            pageControl={{ get: pageControl, set: setPageControl }}
          ></AddCase>
        );
    }
  }

  return (
    <>
      <div id="winCtrl-bar" className={cn("d-flex", "flex-row-reverse")}>
        <Navbar></Navbar>
      </div>
      <CurrentPage
      ></CurrentPage>
    </>
  );
}

async function main() {
  const root = document.createElement("div");
  document.body.appendChild(root);
  const reactRoot = createRoot(root);
  reactRoot.render(<App></App>);
}

main();
