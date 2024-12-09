import React, { useState, useEffect } from "react";
import CaseCard from "./CaseCard";
import icons from "../../res/icons/icons";
// import ImportModal from "./Backup/ImportModal";
import cn from "classnames";

function Homepage({ pageControl, caseControl, themeControl, datapath }) {
  const [cases, setCases] = useState([]);

  async function getCases() {
    const cases = JSON.parse(await api.invoke("get-cases"));
    setCases(cases);
  }
  useEffect(() => {
    getCases();
  }, []);

  function handleAddCase() {
    pageControl.set(1);
  }

  useEffect(() => {
    api.handle("delete-completed", () => {
      console.log("delete-completed");
      getCases();
    });
    return () => api.removeIPCListener("delete-completed");
  });

  function handleClick(e) {
    if (e.target.checked) {
      themeControl.set("dark");
      api.send("write-file", [datapath + "/theme", "dark"]);
    } else {
      themeControl.set("light");
      api.send("write-file", [datapath + "/theme", "light"]);
    }
  }

  return (
    <>
      {/* <ImportModal getCases={getCases}></ImportModal> */}
      <div className="container">
        <div className="w-100 d-flex justify-content-between mb-4 ms-2">
          <button
            className={cn("btn", "btn-lg", "btn-" + themeControl.get())}
            onClick={handleAddCase}
          >
            <icons.Plus_circle width={"30"} height={"30"}></icons.Plus_circle>
          </button>
          <div class="form-check form-switch form-check-reverse">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={(e) => handleClick(e)}
              checked={themeControl.get() == "dark" ? true : false}
            ></input>
            <label class="form-check-label" for="flexSwitchCheckDefault">
              深色模式
            </label>
          </div>
        </div>
        <div className="d-flex flex-wrap align-content-start">
          {cases.map((e, i) => {
            return (
              <CaseCard
                key={e}
                name={e}
                caseControl={caseControl}
                pageControl={pageControl}
              ></CaseCard>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Homepage;
