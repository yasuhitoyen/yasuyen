import React from "react";

const DamageBar = (props) => {
  const physicalDmgWidth = (props.physicalDmg / props.maxDmg) * 100;
  const magicDmgWidth = (props.magicDmg / props.maxDmg) * 100;
  const trueDmgWidth = (props.trueDmg / props.maxDmg) * 100;
  return (
    <div className="flex w-[80px] h-[12px] bg-gray-200 overflow-hidden rounded-sm border-[0.1px] border-black">
      <div
        className="bg-blue-500"
        style={{ width: `${magicDmgWidth}%`, height: "100%" }}
      ></div>
      <div
        className="bg-red-500"
        style={{ width: `${physicalDmgWidth}%`, height: "100%" }}
      ></div>
      <div
        className="bg-white"
        style={{ width: `${trueDmgWidth}%`, height: "100%" }}
      ></div>
    </div>
  );
};

export default DamageBar;
