import React from "react";

function MoodNoteViewCard({ dateString ,data}) {
  
  const newDate = dateString;
  let newDateString = "";
  for (let i = 0; i < 4; i++) {
    newDateString += newDate[i];
  }
  console.log(newDateString);
  newDateString += "-";
  for (let i = 4; i < 6; i++) {
    newDateString += newDate[i];
  }
  newDateString += "-";
  for (let i = 6; i < 8; i++) {
    newDateString += newDate[i];
  }
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h4>{newDateString}</h4>
        <p>心情指數：{data.moodVal}</p>
        <p>心情筆記：<br></br>{data.notes}</p>
        
      </div>
    </div>
  );
}

export default MoodNoteViewCard