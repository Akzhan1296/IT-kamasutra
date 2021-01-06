import React from "react";
import preloader from "../../../assets/imgs/loader.svg";

type PropsType = {

}

const Preloader: React.FC<PropsType> = (props) => {
  return (
    <>
      <img src={preloader} alt={preloader} />
    </>
  );
};

export default Preloader;
