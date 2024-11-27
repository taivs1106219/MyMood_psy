import React, { useEffect, useState } from "react";
import icons from "../../../res/icons/icons.js";
import bootstrap from "bootstrap";

function ImportModal({getCases}) {
  const [destination, setDestination] = useState("");

  async function handleSelectFolder(e) {
    setDestination(await api.invoke("open-file"));
  }
  function handleConfirm() {
    const caseName = document.getElementById("case-name-input").value;
    console.log(caseName);
    if (destination != "" && caseName != "") {
      api.send("import-config", [destination, caseName]);
    }
  }

  useEffect(() => {
    api.handle("import-completed", () => {
      getCases();
    });
    return () => {
      api.removeIPCListener("import-completed");
    };
  });
  return (
    <div className="modal fade" tabIndex={-1} id="import-modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">選擇欲匯入的檔案</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column">
              <div>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    輸入案例名稱
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="輸入案例名稱"
                    aria-label="案例名稱"
                    aria-describedby="basic-addon1"
                    id="case-name-input"
                  />
                </div>
                <button
                  className="btn btn-primary rounded-pill mb-2"
                  onClick={handleSelectFolder}
                >
                  <icons.Files></icons.Files>選擇檔案
                </button>
                <span>{destination}</span>
              </div>
              <div className="text-warning">
                <ins>*請選擇檔案後再按確定</ins>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary rounded-pill"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-primary rounded-pill"
              onClick={handleConfirm}
              data-bs-dismiss="modal"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ImportModal ;
