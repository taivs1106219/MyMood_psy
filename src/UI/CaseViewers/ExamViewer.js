import React, { useEffect, useState } from "react";
import cn from "classnames";
import MoodNoteViewCard from "./MoodNoteViewCard";
import ExamDataViewCard from "./ExamViewCard";

function ExamDataViewer({ pageControl, caseControl }) {
  const [userdata, setUserdata] = useState({});

  function handleBack() {
    pageControl.set(2);
  }

  useEffect(() => {
    async function getUserdata(params) {
      const userdataRes = JSON.parse(
        await api.invoke("request-data", [
          caseControl.get(),
          "examinationData.json",
        ])
      );
      setUserdata(userdataRes);
    }
    getUserdata();
  }, []);
  console.log(userdata);
  return (
    <>
      <div className="container" id="main-content">
        <a
          draggable="false"
          className={cn(
            "h4",
            "link-primary",
            "link-underline",
            "link-underline-opacity-0",
            "link-underline-opacity-0-hover",
            "icon-link",
            "icon-link-hover",
            "sticky-top",
            "bg-white",
            "w-100"
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
          {caseControl.get()}
        </a>
        <h2>心理測驗作答記錄</h2>
        {Object.keys(userdata)
          .map((e) => {
            return (
              <ExamDataViewCard
                dateString={e}
                data={userdata[e]}
              ></ExamDataViewCard>
            );
          })
          .reverse()}
      </div>
    </>
  );
}

export default ExamDataViewer;
