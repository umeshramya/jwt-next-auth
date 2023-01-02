# jwt-next-Auth

This module is used for creating jwt based auth in your next js application

To set SECRET_AUTH (consumed by jasonwebtoken). please set environmental variable SECRET_AUTH

To check the implimentation of the module please check from example/test folder from out github repo
https://github.com/umeshramya/jwt-next-auth.git

This has following API end points

1. jwtSign This is for sign in
2. IsPageLogged This is passed in getServerSideProps method with resolved promise on valied jasonwebtoken of signin else reject promise
3. validateUser This is used to check the user for subesuqent protected routes
4. jwtTokenCreate With this one can create new token for other uses in your application appilcatoin
5. Login route example of login route in next
6. Protected route This is closer for routes of api allowing roles as string of array passed and route function as argument see code below
7. logout This sets token of signin "" thus user is logged out

8. jwtverify Helper function to check jsonwebtoken

### jwtSign

in you api routes

```javascript
import { jwtSign } from "jwt-next-auth";

const route = async (req, res) => {
  try {
    const result = await jwtSign(req.body, req, res).then((res) => res);
    console.log(req.body);
    res.status(200).json({ mes: result });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default route;
```

### IsPageLogged

in your page

```javascript
import Head from "next/head";
import { IsPageLogged } from "jwt-next-auth";

export default function Home(props) {
  return (
    <>
      <h1>{props.pageLogged ? "Page is logged" : "Page is not logged"}</h1>
      // your code of page goes here
    </>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const result = await IsPageLogged(ctx.req, ctx.res).then(
      (result) => result,
    );
    return {
      props: { pageLogged: true }, // will be passed to the page component as props
    };
  } catch (error) {
    return { props: { pageLogged: false } };
  }
}
```

### validateUser

in your api route

```javascript
import { validateUser } from "jwt-next-auth";
const route = async (req, res) => {
  try {
    await validateUser(req, res).then((r) => r);
    res.status(200).json({ mes: JSON.stringify(req.body) });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default route;
```

### jwtTokenCreate

In your route

```javascript
import { jwtTokenCreate } from "jwt-next-auth";

const route = async (req, res) => {
  try {
    const token = await jwtTokenCreate(req.body, 7).then((r) => r);
    res.status(200).json({ mes: token });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default route;
```

### Login route of next

```javascript
import { jwtSign } from "jwt-next-auth";

const route = async (req, res) => {
  try {
    const payload = req.body;
    //write code check from data base usernam and pasword
    // then add role property for the payload most ofetn dervied from database
    payload.role = "admin"; // real world application this comes from database of users
    const result = await jwtSign(payload, req, res).then((res) => res);

    res.status(200).json({ mes: result });
  } catch (error) {
    res.status(500).send(error);
  }
};
```

### Protected route code

```javascript
// this routes are inside api folder of pages of next js app
import { protectedRouteMaster } from "jwt-next-auth";

const route = async (req, res, body, auth) => {
  try {
    console.log("body", body); //access body requet
    console.log("auth", auth); //access auth body from here
    res.status(200).json({ mes: "varied user" });
  } catch (error) {
    res.status(500).send(error);
  }
};

//array of strings second arguments it extrcts the role of payload set durring the login route see above
export default protectedRouteMaster(route, ["admin", "editor"]);
```

### logout

in your route

```javascript
import { logout } from "jwt-next-auth";
const route = (req, res) => {
  try {
    logout(req, res);
    res.status(200).json({ mes: "logged out" });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default route;
```

### jwtverify

in you api routes
async method

```javascript
jwtverify(tokren);
```
