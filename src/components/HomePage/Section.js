import React from "react";
import "../../styles/section.scss";

function Section({ Icon, title, color, isSelected }) {
  return (
    <div
      className={`section ${isSelected && "section--active"}`}
      style={{
        borderBottom: `2px solid ${color}`,
        color: `${isSelected && color}`,
      }}
    >
      <Icon />
      <h4>{title}</h4>
    </div>
  );
}

export default Section;
