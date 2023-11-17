import { useState, useEffect } from "react";

async function getAddress(value) {
  const apiKey = "at_M5GQMrSk7fcSLLPKXBX1D2xwRTmBr";
  const ipAddress = value; // Sustituye con la IP que quieras consultar

  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error; // Debes lanzar el error para que pueda ser capturado por la promesa
  }
}

function Results({ ip, setDataApp }) {
  const [getData, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const result = await getAddress(ip);
        setData(result);
        setDataApp(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [ip]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section className="flex w-3/4 gap-8 shadow-md rounded-md relative -translate-y-1/2 p-4 bg-white justify-evenly">
      <span>
        <p className="parrafo">IP ADDRESS</p>
        <p>{ getData.ip }</p>
      </span>
      <hr />
      <span>
        <p className="parrafo">LOCATION</p>
        <p>{getData.location.city}</p>
      </span>
      <hr />
      <span>
        <p className="parrafo">TIMEZONE</p>
        <p>{getData.location.timezone}</p>
      </span>
      <hr />
      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
        <p className="parrafo">ISP</p>
        <p >{ getData.isp }</p>
      </span>
    </section>
  );
}

export default Results;
