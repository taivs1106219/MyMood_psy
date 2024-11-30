import React from "react";
import icons from "../../res/icons/icons";
import DeleteConfirmModal from "./DeleteConfirmModal";
import casecardCss from "../scss/casecard.scss";

function CaseCard({ name, memo, caseControl, pageControl }) {
  function handleClick() {
    caseControl.set(name);
    pageControl.set(2)
  }

  return (
    <>
      <div className="px-2 pb-3" style={{ maxWidth: "40rem",minWidth:"25rem" }}>
        <div className="card casecard" onClick={handleClick}>
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

              <div>{memo}</div>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmModal name={name}></DeleteConfirmModal>
    </>
  );
}

export default CaseCard;
