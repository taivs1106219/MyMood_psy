import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Navbar } from "./Navbar";
import bootstrap from "bootstrap";
import "../scss/style.scss";
import cn from "classnames";
import CaseCard from "./CaseCard";
import icons from "../../res/icons/icons";
import ImportModal from "./Backup/ImportModal";

function App() {
  const [cases, setCases] = useState([]);
  async function getCases() {
    const cases = JSON.parse(await api.invoke("get-cases"));
    setCases(cases);
  }
  useEffect(() => {
    getCases();
  }, []);


  return (
    <>
      <ImportModal getCases={getCases}></ImportModal>
      <div id="winCtrl-bar" className={cn("d-flex", "flex-row-reverse")}>
        <Navbar></Navbar>
      </div>
      <div className="container">
        <div className="w-100 mb-4 ms-2">
          <button
            className="btn btn-lg btn-light"
            data-bs-toggle="modal"
            data-bs-target="#import-modal"
          >
            <icons.Plus_circle width={"30"} height={"30"}></icons.Plus_circle>
          </button>
        </div>
        <div className="d-flex flex-wrap align-content-start">
          {cases.map((e, i) => {
            return <CaseCard key={e} name={e} memo=""></CaseCard>;
          })}
        </div>
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
