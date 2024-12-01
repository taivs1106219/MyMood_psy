import React from "react";

import questions from "../../../res/json/questions.json";

function ExaminationDataViewCard({ dateString, data }) {
  // const dataObj=JSON.parse(data)

  const newDate = dateString;
  let newDateString = "";
  for (let i = 0; i < 4; i++) {
    newDateString += newDate[i];
  }
  newDateString += "-";
  for (let i = 4; i < 6; i++) {
    newDateString += newDate[i];
  }
  newDateString += "-";
  for (let i = 6; i < 8; i++) {
    newDateString += newDate[i];
  }

  console.log(data.quesions);

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h4>{newDateString}</h4>
        <p>
          {questions.depress.select[data.quesions.p1[0]]}：{data.answers[0]}/4
          <br></br>
          {questions.depress.select[data.quesions.p1[1]]}：{data.answers[1]}/4
          <br></br>
          {questions.depress.yn[data.quesions.p2[0]]}：
          {data.answers[2] == 4 ? "是" : "否"}
          <br></br>
          {questions.depress.yn[data.quesions.p2[1]]}：
          {data.answers[3] == 4 ? "是" : "否"}
          <br></br>
          {questions.pressure.yn[data.quesions.p3[0]]}：
          {data.answers[4] == 4 ? "是" : "否"}
          <br></br>
          {questions.pressure.yn[data.quesions.p3[1]]}：
          {data.answers[5] == 4 ? "是" : "否"}
          <br></br>
        </p>
      </div>
    </div>
  );
}

export default ExaminationDataViewCard;
