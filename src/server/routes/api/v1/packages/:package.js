export const get = async ctx => {
  try {
    ctx.body = await ctx
      .knex("package")
      .select(
        "package.slug",
        "package.name",
        "user.name as owner",
        "package.description",
        "package.readme",
        "package.image",
        "package.website",
        "package.repository",
        "package.added",
        "package.updated",
        "package.license",
        "package.category"
      )
      .where({ slug: ctx.params.package })
      .leftJoin("user", "package.owner_id", "user.id")
      .first();
  } catch (err) {
    ctx.throw(500, err);
  }
};
