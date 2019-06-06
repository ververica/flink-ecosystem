export default function voteHelper(mainVote, secondaryVote) {
  return async ctx => {
    const { slug } = ctx.request.body;

    try {
      const { id } = await ctx
        .knex("package")
        .select()
        .where({ slug })
        .first();

      const voted = await ctx
        .knex(mainVote)
        .select(`${mainVote}.id`)
        .where({ user_id: ctx.state.user.id, package_id: id })
        .first();

      if (voted) {
        // remove vote
        await ctx
          .knex(mainVote)
          .where({ user_id: ctx.state.user.id, package_id: id })
          .delete();
        ctx.body = { [mainVote]: false };
      } else {
        Promise.all([
          // insert vote
          await ctx
            .knex(mainVote)
            .insert({ user_id: ctx.state.user.id, package_id: id }),

          // delete the other vote
          await ctx
            .knex(secondaryVote)
            .where({ user_id: ctx.state.user.id, package_id: id })
            .delete(),
        ]);

        ctx.body = { [mainVote]: true, [secondaryVote]: false };
      }
    } catch (e) {
      ctx.throw(500, e);
    }
  };
}
