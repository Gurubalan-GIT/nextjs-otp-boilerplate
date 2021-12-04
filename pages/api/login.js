import cookie from "cookie";
import { ACCESS_DENIED_ENDPOINT, AUTH_TOKEN, SET_COOKIE } from "@localization";
import { cookieSerializeOptions } from "@constants";

export default (req, res) => {
  const { token, key } = req.body;
  if (!key || key !== process.env.NEXT_PUBLIC_SERVER_ACCESS_KEY) {
    return res.redirect(ACCESS_DENIED_ENDPOINT);
  }
  if (!token) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
  res.setHeader(
    SET_COOKIE,
    cookie.serialize(AUTH_TOKEN, token, {
      ...cookieSerializeOptions,
      maxAge: 60 * 60 * 24 * 30,
    })
  );
  return res.status(200).json({ success: true });
};
