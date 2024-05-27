import React from "react";

const Item = (props) => {
  if (props.type == 0) {
    return (
      <div className="select-none w-8 h-8 lg:w-9 lg:h-9 bg-white rounded-md border-[1px] flex justify-center items-center transition-all duration-1000">
        <img
          className="select-none w-auto h-auto max-w-full max-h-full rounded-md"
          src={`${props.item}`}
          alt=""
          draggable="false"
        />
      </div>
    );
  } else {
    return (
      <div className="select-none w-5 h-5  bg-white rounded-md border-[0.5px]">
        <img
          className="w-auto h-auto max-w-full max-h-full rounded-md"
          src={`${props.item}`}
          alt=""
          draggable="false"
        />
      </div>
    );
  }
};

export default Item;
