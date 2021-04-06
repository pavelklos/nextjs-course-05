// rfce
import path from "path";
import fs from "fs/promises";

import { Fragment } from "react";

function ProductDetailPage(props) {
  // useEffect(() => {}, []); // STANDARD REACT COMPONENT
  const { loadedProduct } = props;

  // fallback: "blocking" -> WE DON'T NEED THAT CHECK
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); // ABSOLUTE PATH
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context; // KEY-VALUE pairs
  const productId = params.pid; //
  // console.log(params);
  // console.log(productId);

  // READ FILE 'dummy-backend.json' BY FILE SYSTEM : Node.js [fs]
  // const filePath = path.join(process.cwd(), "data", "dummy-backend.json"); // ABSOLUTE PATH
  // const jsonData = await fs.readFile(filePath);
  // const data = JSON.parse(jsonData);
  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));
  // console.log(pathsWithParams);

  return {
    paths: pathsWithParams,
    // paths: [
    //   { params: { pid: "p1" } },
    //   { params: { pid: "p2" } },
    //   { params: { pid: "p3" } },
    //   { params: { pid: "p4" } },
    //   { params: { pid: "p5" } },
    // ],
    // fallback: false,
    fallback: true,
    // fallback: "blocking",
  };
}

export default ProductDetailPage;
