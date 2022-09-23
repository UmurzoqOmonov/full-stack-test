import React from "react";
import { Link } from "react-router-dom";
import styles from "./Table.module.css";
import Pagination from "../Pagination/Pagination";
import useTable from "../../hooks/use-table";

function Table(props) {
  const { page, url, tableBody,  cools, noContent } = useTable(
    props,
    styles
  );
  return (
    <>
      <Link className={styles.addNewCourse} to={`/${url}/new`}>
        Add {url}
      </Link>

      {!noContent && (
        <>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                {cools.map((c, index) => (
                  <th key={c.header + index}>{c.header}</th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.tbody}>{tableBody}</tbody>
          </table>
          <Pagination pagination={page} url={`/${url}s`} />
        </>
      )}
      {noContent && <h1 className={styles.noContent}>No Content</h1>}
    </>
  );
}

export default Table;
