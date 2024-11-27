import React from "react";

function CaseCard({ name, memo }) {
  return (
    <div className="px-2 pb-3" style={{width:"33%"}}>
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column">
            <p className="h4">{name}</p>
            <div>{memo}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseCard