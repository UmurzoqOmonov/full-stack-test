import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Table.module.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

function Table(props) {
  const navigate = useNavigate();
  const { cools, data } = props.dataTable;
  const page = props.page.page;
  const url = props.addUrl;
  const noContent = +page === 1 && data.length === 0;

  useEffect(() => {
    if (data.length === 0) {
      if (+page > 1) {
        navigate(`/${url}s?page=${+page - 1}&size=3`);
      }
    }
  }, []);

  const tableBody = data.map((d) => (
    <tr key={d.id}>
      {cools.map((c, index) => {
        let content;
        if (typeof c.acc === "string") {
          content = d[c.acc];
        } else if (c.acc instanceof Function) {
          content = c.acc(d, styles);
        }
        return <td key={c.header + index}>{content}</td>;
      })}
    </tr>
  ));

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
          <Pagination pagination={props.page} url={`/${url}s`} />
        </>
      )}
      {noContent && <h1 className={styles.noContent}>No Content</h1>}
    </>
  );
}

export default Table;
