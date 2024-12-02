import React, { useRef, useState, useEffect, useDeferredValue } from "react";
import cn from "classnames";

function ViewCase({ pageControl, caseControl, datapath }) {
  const caseName = useRef(caseControl.get());
  const [psyConfig, setPsyConfig] = useState({});

  const [userdata, setUserdata] = useState({});
  const [chartData, setChartData] = useState({
    type: "line",
    data: {
      labels: ["0", "0", "0", "0", "0"],
      datasets: [
        {
          label: "心情指數",
          data: [50, 60, 70, 180, 190],
          fill: false,
          borderColor: "blue",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "近五日心情指數",
        },
      },
      scales: {
        y: {
          min: 0,
          max: 5,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });

  let delayDebounceFn;

  function handleMemo(e) {
    const tmpConf = JSON.parse(JSON.stringify(psyConfig));
    setPsyConfig(Object.assign(tmpConf, { memo: e.target.value }));
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(datapath + "/cases/" + caseName.current + "/psyConfig.json");
      api.send("write-file", [
        datapath + "/cases/" + caseName.current + "/psyConfig.json",
        JSON.stringify(psyConfig, null, 2),
      ]);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [psyConfig]);

  function handleInput(e) {
    clearTimeout(delayDebounceFn);
    console.log(e);
    console.log(caseName);
    caseName.current = e.target.innerText;
    delayDebounceFn = setTimeout(() => {
      console.log(e.target.innerText);
      if (e.target.innerText != "\n") {
        console.log("new name sent");
        api.send("rename-case", [caseControl.get(), e.target.innerText]);
      }
    }, 500);
  }

  useEffect(() => {
    api.handle("rename-completed", (res) => {
      caseControl.set(caseName.current);
    });
    return () => {
      api.removeIPCListener("rename-completed");
    };
  }, []);
  useEffect(() => {
    api.handle("rename-failed", (res) => {
      caseControl.set(caseControl.get());
    });
    return () => {
      api.removeIPCListener("rename-failed");
    };
  }, []);
  useEffect(() => {
    async function getPsyConfig() {
      let psyConfig = {};
      api
        .invoke("request-data", [caseName.current, "psyConfig.json"])
        .then((res) => {
          if (res != undefined) {
            psyConfig = JSON.parse(res);
          }
          if (psyConfig.memo == undefined) {
            Object.assign(psyConfig, { memo: "" });
          }
          setPsyConfig(psyConfig);
        });
    }
    getPsyConfig();
  }, []);

  function handleBack() {
    pageControl.set(0);
  }

  useEffect(() => {
    async function fetchData() {
      const userdataRes = JSON.parse(
        await api.invoke("request-data", [caseName.current, "userdata.json"])
      );

      const tmpChartData = {
        type: "line",
        data: {
          labels: ["0", "0", "0", "0", "0"],
          datasets: [
            {
              label: "心情指數",
              data: [50, 60, 70, 180, 190],
              fill: false,
              borderColor: "blue",
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "近五日心情指數",
            },
          },
          scales: {
            y: {
              min: 0,
              max: 5,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      };
      const firstDay = new Date();
      firstDay.setDate(firstDay.getDate() - 5);
      for (let i = 0; i < 5; i++) {
        const tmpDate = new Date(firstDay);
        // 記錄第一天為暫存
        tmpDate.setDate(tmpDate.getDate() + i);
        // 加上偏移量
        const currentDate = tmpDate.getDate();
        // 當日日期
        const currentDateString = `${tmpDate.getFullYear()}${
          tmpDate.getMonth() + 1 > 9
            ? tmpDate.getMonth() + 1
            : "0" + (tmpDate.getMonth() + 1)
        }${tmpDate.getDate()}`;
        // 日期字串
        tmpChartData.data.labels[i] = currentDate + " 日";
        // 設置日期
        tmpChartData.data.datasets[0].data[i] =
          userdataRes[currentDateString] == undefined
            ? undefined
            : userdataRes[currentDateString].moodVal;
        // 設置心情制5
      }
      setUserdata(userdataRes);
      setChartData(tmpChartData);
    }
    fetchData();
  }, []);

  console.log(psyConfig);

  return (
    <>
      <div className="container d-flex flex-column">
        <a
          draggable="false"
          className={cn(
            "h4",
            "link-primary",
            "link-underline",
            "link-underline-opacity-0",
            "link-underline-opacity-0-hover",
            "icon-link",
            "icon-link-hover"
          )}
          style={{ "--bs-icon-link-transform": "translate3d(-.175rem, 0, 0)" }}
          onClick={handleBack}
          href="#"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          首頁
        </a>
        <p
          className="h2"
          contentEditable="true"
          onInput={(e) => handleInput(e)}
        >
          {caseName.current}
        </p>
        <div className="form-group mb-3">
          <textarea
            className="form-control"
            value={psyConfig.memo == undefined ? "" : psyConfig.memo}
            onInput={(e) => handleMemo(e)}
            placeholder="輸入案例備註"
          ></textarea>
        </div>
        <div className="d-flex">
          <div className="mx-1 my-1">
            <div className="card">
              <img
                className="card-img-top"
                alt="近五日心情指數折線圖"
                style={{ maxWidth: "30rem" }}
                draggable="false"
                src={
                  "https://quickchart.io/chart?v=4&c=" +
                  encodeURI(JSON.stringify(chartData))
                }
              ></img>
              <div className="card-body">
                <h4 className="card-title">心情筆記填寫記錄</h4>
                <a
                  className="icon-link icon-link-hover"
                  href="#"
                  onClick={() => pageControl.set(3)}
                >
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
              </div>
            </div>
          </div>
          <div className="mx-1 my-1">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">測驗作答記錄</h4>
                <a
                  className="icon-link icon-link-hover"
                  href="#"
                  draggable="false"
                  onClick={() => pageControl.set(4)}
                >
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
              </div>
            </div>
          </div>
          <div className="mx-1 my-1">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">GPT建議記錄</h4>
                <a
                  className="icon-link icon-link-hover"
                  href="#"
                  draggable="false"
                  onClick={() => pageControl.set(5)}
                >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewCase;
