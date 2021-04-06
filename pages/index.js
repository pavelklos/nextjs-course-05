import path from "path";
import fs from "fs/promises";
import Link from "next/link";
import { Fragment } from "react";

function HomePage(props) {
  const { products } = props;
  return (
    <Fragment>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>{product.title}</Link>
            </li>
          );
        })}
      </ul>
      <ul>
        <li>
          <Link href={`/user-profile`}>User Profile</Link>
        </li>
        <li>
          <Link href={`/1`}>User by UID</Link>
        </li>
        <li>
          <Link href={`/last-sales`}>Last Sales</Link>
        </li>
        <li>
          <Link href={`/last-sales-swr`}>Last Sales : useSWR</Link>
        </li>
        <li>
          <Link href={`/last-sales-swr-comb`}>
            Last Sales : useSWR : Combining
          </Link>
        </li>
      </ul>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  console.log("(Re-)Generating...");
  // console.log(context);
  // READ FILE 'dummy-backend.json' BY FILE SYSTEM : Node.js [fs]
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); // ABSOLUTE PATH
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  // console.log(filePath);
  // console.log(jsonData);
  // console.log(data);
  if (data.products.length === 0) {
    return { notFound: true };
  }
  if (!data) {
    return {
      redirect: {
        destination: "no-data",
      },
    };
  }

  return {
    props: {
      // products: [{ id: "p1", title: "Product 1" }],
      products: data.products,
    },
    revalidate: 10, // = 10 seconds
    // notFound: true,
    // redirect: {
    //   destination: "no-data",
    // },
  };
}

export default HomePage;

// function HomePage(props) {
//   return (
//     <ul>
//       <li>Product 1</li>
//       <li>Product 2</li>
//       <li>Product 3</li>
//     </ul>
//   );
// }
