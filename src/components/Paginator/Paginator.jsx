import cn from "classnames";
import React, {useState} from 'react';
import styles from "./Paginator.module.css";
import {Pagination} from "react-bootstrap";


const Paginator = ({numberPages, currentPage, changeUsersThunk, pageSize = 10, portionSize = 10}) => {

    let pagesCount = Math.ceil(numberPages / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;


    return <div className={styles.paginator}>
        <Pagination className={styles.pagination}>
            {portionNumber > 1 && <Pagination.First onClick={() => setPortionNumber(portionNumber - 1)}/>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return (
                        <Pagination.Item className={styles.pagination} key={p}
                                         onClick={() => changeUsersThunk(p)}
                                         active={currentPage === p}
                        >{p}</Pagination.Item>
                    )
                })}


            {portionCount > portionNumber && <Pagination.Last onClick={() => setPortionNumber(portionNumber + 1)}/>}
        </Pagination>
    </div>
}

export default Paginator;
