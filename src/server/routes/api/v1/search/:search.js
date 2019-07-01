import checkUser from "server/middleware/checkUser";

exports.get = [
  checkUser({ required: false }),
  async ctx => {
    const { search } = ctx.params;
    const sqlSearch = `%${decodeURIComponent(search)}%`;

    const results = await ctx
      .db("package")
      .select("*")
      .where("name", "like", sqlSearch)
      .orWhere("description", "like", sqlSearch)
      .orWhere("readme", "like", sqlSearch)
      .orWhere("tags", "like", sqlSearch);

    ctx.body = results;
  },
];
