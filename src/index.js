import React from "react";
import { createRoot } from "react-dom/client"
import { Navbar } from "./Navbar";
import bootstrap from "bootstrap"
import "./scss/style.scss"
import cn from "classnames"

function App() {
  
  return (
    <>
      <div id="winCtrl-bar" className={cn("d-flex", "flex-row-reverse")}>
        <Navbar></Navbar>
      </div>
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
