import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const useTable = (props, styles) => {
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

  return { tableBody, cools, data, url, page, noContent };
};

export default useTable;
