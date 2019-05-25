import axios from "axios";

export const get = async ctx => {
  const token = ctx.cookies.get("github-token");

  if (!token) {
    ctx.throw(401);
  }

  try {
    const headers = { Authorization: `token ${token}` };
    const { data } = await axios.get("https://api.github.com/user", {
      headers,
    });
    ctx.body = data;
  } catch (e) {
    ctx.throw(e.response.status);
  }
};
