exports.get = async ctx => {
  const image = await ctx
    .db("package")
    .select("image.*")
    .where({ slug: ctx.params.packageSlug })
    .join("image", "image.id", "package.image_id")
    .first();

  ctx.response.set("Content-Type", image.type);
  ctx.body = image.file;
};
