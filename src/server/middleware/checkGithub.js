import axios from "axios";

export default async function checkGithub(ctx, next) {
  const basicAuthString = Buffer.from(
    `${process.env.GITHUB_CLIENT}:${process.env.GITHUB_SECRET}`
  ).toString("base64");

  try {
    await axios.get(
      `https://api.github.com/applications/${
        process.env.GITHUB_CLIENT
      }/tokens/${ctx.cookies.get("github-token")}`,
      { headers: { Authorization: `Basic ${basicAuthString}` } }
    );

    return next();
  } catch (e) {
    console.error(e.message);
    ctx.throw(403);
  }
}
