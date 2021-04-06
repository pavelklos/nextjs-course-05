// rfce
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesSWRCombPage(props) {
  const [sales, setSales] = useState(props.sales); // []

  // FETCH DATA FROM API
  const { data, error } = useSWR(
    "https://nextjs-course-ec66f-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]); // ON INITIAL RENDER + DEPENDENCY 'data'

  if (error) {
    return <p>Failed to load.</p>;
  }

  // if (!data || !sales) {
  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h2>Client-Side Data Fetching : useSWR : Combining</h2>
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

export default LastSalesSWRCombPage;

export async function getStaticProps(context) {
  const response = await fetch(
    "https://nextjs-course-ec66f-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
}
