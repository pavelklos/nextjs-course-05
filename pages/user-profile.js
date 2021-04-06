// rfce

function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  // console.log(params);
  // console.log(req);
  // console.log(res);
  // console.log("Server side code");

  return {
    props: {
      username: "Max",
    },
  };
}
