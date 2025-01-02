import axios from "axios";
import { set } from "mongoose";
import { useState, useEffect } from "react";

function useFetchData(apiEndPoint) {
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await axios.get(apiEndPoint);
        const allData = res.data;
        setAlldata(allData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    if (apiEndPoint) {
      fetchAllData();
    }
  }, [apiEndPoint]);

  return { alldata, loading };
}

export default useFetchData;
