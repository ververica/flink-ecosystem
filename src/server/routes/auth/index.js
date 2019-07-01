import qs from "querystring";
import crypto from "crypto";

exports.get = ctx => {
  const params = {
    client_id: process.env.GITHUB_CLIENT,
    redirect_uri: `${ctx.request.origin}/auth/callback`,
    state: crypto.randomBytes(8).toString("hex"),
  };

  const query = qs.encode(params);

  const githubUrl = `https://github.com/login/oauth/authorize?${query}`;
  ctx.status = 302;
  ctx.cookies.set("state", params.state);
  ctx.body = "Redirecting you to Github";
  ctx.redirect(githubUrl);
};
