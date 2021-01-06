import React, { useState } from "react";
import styles from "./Paginator.module.css";
import cn from "classnames"

type PropsType = {
  totalItemsCount: number,
  pageSize: number,
  currentPage?: number,
  onPageChanged?: (pageNumber: number) => void,
  portionSize?: number,
}

const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage = 1,
  onPageChanged = x => x,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
 
  let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionNumber = portionNumber * portionSize;


  return (
    <div>
      <div>
        {portionNumber > 1 && (
          <button
            onClick={() => {
              setPortionNumber(portionNumber - 1);
            }}
          >
            prev
          </button>
        )}
        {pages
          .filter((p) => p >= leftPortionNumber && p < rightPortionNumber)
          .map((p) => {
            return (
              <span
                key={p}
                className={cn({[styles.selectedPage]: currentPage === p}, styles.selectedPage)}
                onClick={(e) => {
                  onPageChanged(p);
                }}
              >
                {p}{" "}
              </span>
            );
          })}
        {portionCount > portionNumber && (
          <button
            onClick={() => {
              setPortionNumber(portionNumber + 1);
            }}
          >
            next
          </button>
        )}
      </div>
    </div>
  );
};

export default Paginator;
