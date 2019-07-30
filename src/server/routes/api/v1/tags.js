import fs from "fs";
const tagsQuery = fs.readFileSync("src/server/sql/tags_query.sql");

exports.get = async ctx => {
  const [tagsResult] = await ctx.db.raw(tagsQuery);
  const tags = tagsResult.map(({ tag }) => tag);
  ctx.body = { tags };
};
