import axios from "axios";

const defaultOptions = {
  required: true,
};

export default function checkGithub(options = defaultOptions) {
  return async (ctx, next) => {
    const token = ctx.cookies.get("github-token");
    const user = ctx.cache.get(token);

    if (user) {
      ctx.state.user = user;
      return next();
    }

    // for some requests we don't want to force the user to login, so they can
    // continue through
    if (!token) {
      if (!options.required) {
        return next();
      }
      ctx.throw(403);
    }

    const basicAuthString = Buffer.from(
      `${process.env.GITHUB_CLIENT}:${process.env.GITHUB_SECRET}`
    ).toString("base64");

    try {
      const { data } = await axios.get(
        `https://api.github.com/applications/${
          process.env.GITHUB_CLIENT
        }/tokens/${token}`,
        { headers: { Authorization: `Basic ${basicAuthString}` } }
      );

      const userExists = await ctx
        .knex("user")
        .select("*")
        .where({ id: data.user.id })
        .first();

      if (!userExists) {
        await ctx
          .knex("user")
          .insert({ id: data.user.id, login: data.user.login });
      }

      ctx.cache.set(token, data.user);
      ctx.state.user = data.user;

      return next();
    } catch (e) {
      console.error(e.message);
      ctx.throw(403);
    }
  };
}
