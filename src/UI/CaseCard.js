import React, { useState, useEffect } from "react";
import icons from "../../res/icons/icons";
import DeleteConfirmModal from "./DeleteConfirmModal";

function CaseCard({ name, caseControl, pageControl }) {
  const [memo, setMemo] = useState("");
  function handleClick() {
    caseControl.set(name);
    pageControl.set(2);
  }

  useEffect(() => {
    async function fetchData() {
      api.invoke("request-data", [name, "psyConfig.json"]).then((res) => {
        if (res != undefined) {
          setMemo(JSON.parse(res).memo);
        }
      });
    }
    fetchData();
  }, []);

  return (
    <>
      <div
        className="px-2 pb-3"
        style={{ maxWidth: "40rem", minWidth: "25rem" }}
      >
        <div className="card casecard">
          <div className="card-body">
            <div className="d-flex flex-column">
              <div className="d-flex">
                <h4 className="flex-grow-1">{name}</h4>
                <span
                  data-bs-toggle="modal"
                  data-bs-target={"#" + name + "-delete-modal"}
                >
                  <icons.Trash3 width={22} height={22}></icons.Trash3>
                </span>
              </div>
              <h5 className="card-subtitle text-secondary mb-2">{memo}</h5>
              <h5>
                <a className="icon-link icon-link-hover" onClick={handleClick}>
                  點此前往
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                    />
                  </svg>
                </a>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmModal name={name}></DeleteConfirmModal>
    </>
  );
}

export default CaseCard;
