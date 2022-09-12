import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useHttp = (reqFn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState({});

  const send = async (reqData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await reqFn(reqData);
      setData(data.content);
      setPagination(data.pagination);
      if (data.message) {
        toast.success(data.message);
      }
    } catch (err) {
      const error = await err.response.data;
      toast.error(error.message);
    }
    setLoading(false);
  };

  return { send, loading, error, data, pagination };
};

export default useHttp;
