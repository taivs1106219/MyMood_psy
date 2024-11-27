import React from "react";
import icons from "../../res/icons/icons";
import DeleteConfirmModal from "./DeleteConfirmModal";

function CaseCard({ name, memo }) {
  function handleClick(name) {}

  return (
    <>
      <div className="px-2 pb-3" style={{ width: "33%" }}>
        <div className="card">
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
