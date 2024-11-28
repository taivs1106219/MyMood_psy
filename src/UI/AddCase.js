import React, { useState, useEffect } from "react";
import icons from "../../res/icons/icons";

function AddCase({ pageControl }) {
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
      pageControl.set(0);
    });
    return () => {
      api.removeIPCListener("import-completed");
    };
  });

  return (
    <>
      <div className="container ">
        <h2>選擇要加入的案例</h2>
        <div className="d-flex flex-column">
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
          <div className="input-group mb-2">
            <span
              className="input-group-text"
              id="basic-addon1"
              onClick={handleSelectFolder}
            >
              點此選擇檔案位置
            </span>
            <input
              disabled
              onClick={handleSelectFolder}
              type="text"
              className="form-control"
              placeholder="輸入案例名稱"
              aria-label="案例名稱"
              aria-describedby="basic-addon1"
              id="case-name-input"
              value={destination}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-secondary rounded-pill mb-2 ms-1"
              onClick={() => {
                pageControl.set(0);
              }}
            >
              取消
            </button>
            <button
              className="btn btn-primary rounded-pill mb-2 ms-1"
              onClick={handleConfirm}
            >
              加入
            </button>
          </div>

          <div className="text-warning">
            <ins>*請選擇檔案後再按確定</ins>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCase;
