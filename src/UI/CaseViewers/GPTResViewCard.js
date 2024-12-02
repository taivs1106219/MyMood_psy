import React from "react";

function GPTResViewCard({ dateString, data }) {
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
  console.log(data);
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h4>{data[0]}</h4>
        <p>{data[1]}</p>
      </div>
    </div>
  );
}

export default GPTResViewCard;
