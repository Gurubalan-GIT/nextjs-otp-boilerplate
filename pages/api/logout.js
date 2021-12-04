import cookie from "cookie";
import { ACCESS_DENIED_ENDPOINT, AUTH_TOKEN, SET_COOKIE } from "@localization";
import { cookieSerializeOptions } from "@constants";

export default (req, res) => {
  const { key } = req.body;
  if (!key || key !== process.env.NEXT_PUBLIC_SERVER_ACCESS_KEY) {
    return res.redirect(ACCESS_DENIED_ENDPOINT);
  }
  res.setHeader(
    SET_COOKIE,
    cookie.serialize(AUTH_TOKEN, "", {
      ...cookieSerializeOptions,
      maxAge: new Date(0),
    })
  );
  return res.status(200).json({ success: true });
};
