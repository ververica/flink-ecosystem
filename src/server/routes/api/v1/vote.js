import checkGithub from "../../../middleware/checkGithub";

export const post = [
  checkGithub(),
  async ctx => {
    const { slug, vote } = ctx.request.body;

    try {
      const { id } = await ctx
        .knex("package")
        .select()
        .where({ slug })
        .first();

      // insert or replace the vote.
      await ctx.knex.raw(
        `replace into vote (user_id, package_id, vote) values(?, ?, ?)`,
        [ctx.state.user.id, id, vote]
      );

      // query the table again to get the current vote status, and scores
      const results = await ctx
        .knex("vote")
        .select(
          "vote.vote",
          ctx.knex.raw("count(distinct upvote.id) as upvotes"),
          ctx.knex.raw("count(distinct downvote.id) as downvotes")
        )
        .where({ "vote.package_id": id, "vote.user_id": ctx.state.user.id })
        .leftJoin("vote as upvote", join => {
          join.on("upvote.package_id", id).on("upvote.vote", 1);
        })
        .leftJoin("vote as downvote", join => {
          join.on("downvote.package_id", id).on("downvote.vote", -1);
        })
        .first();

      ctx.body = results;
    } catch (e) {
      ctx.throw(500, e);
    }
  },
];
