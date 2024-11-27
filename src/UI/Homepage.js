import React, { useState, useEffect } from "react";
import CaseCard from "./CaseCard";
import icons from "../../res/icons/icons";
// import ImportModal from "./Backup/ImportModal";

function Homepage({ pageControl }) {
  const [cases, setCases] = useState([]);
  async function getCases() {
    const cases = JSON.parse(await api.invoke("get-cases"));
    setCases(cases);
  }
  useEffect(() => {
    getCases();
  }, []);

  function handleClick() {
    pageControl.set(1);
  }

  useEffect(() => {
    api.handle("delete-completed", () => {
      console.log("delete-completed")
      getCases();
    });
    return()=> api.removeIPCListener("delete-completed")
  });

  return (
    <>
      {/* <ImportModal getCases={getCases}></ImportModal> */}
      <div className="container">
        <div className="w-100 mb-4 ms-2">
          <button className="btn btn-lg btn-light" onClick={handleClick}>
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

export default Homepage;
