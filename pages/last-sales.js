// rfce
import { Fragment, useEffect, useState } from "react";

function LastSalesPage() {
  const [sales, setSales] = useState(); // []
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // FETCH DATA FROM API : BROWSER DEFAULT fetch()
    fetch("https://nextjs-course-ec66f-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        const transformedSales = [];
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []); // ON INITIAL RENDER

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data yet</p>;
  }

  return (
    <Fragment>
      <h2>Client-Side Data Fetching</h2>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.username} - ${sale.volume}
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default LastSalesPage;
