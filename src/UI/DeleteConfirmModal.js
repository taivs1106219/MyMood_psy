import React from "react";

function DeleteConfirmModal({ name }) {
  function handleClick() {
    api.send("delete-case", name);
  }
  return (
    <>
      <div
        className="modal fade"
        id={name + "-delete-modal"}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id={name + "-delete-modal-title"}
              >
                刪除前確認
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">是否刪除{name}？</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                否
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleClick}
              >
                是
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteConfirmModal;
