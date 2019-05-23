import axios from "axios";

export const get = async ctx => {
  const token = ctx.cookies.get("github-token");

  if (!token) {
    ctx.throw(401, { unauthorized: true });
  }

  try {
    const headers = { Authorization: `token ${token}` };
    const { data } = await axios.get("https://api.github.com/user", {
      headers,
    });
    ctx.body = data;
  } catch (e) {
    console.error("it broke", e.message);
  }
};
