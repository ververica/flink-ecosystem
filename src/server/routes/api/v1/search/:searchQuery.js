import checkUser from "server/middleware/checkUser";
import { selectVotes, joinVotes } from "server/helpers/votes";

exports.get = [
  checkUser({ required: false }),
  async ctx => {
    const { searchQuery } = ctx.params;
    const { page = 1 } = ctx.request.query;
    const sqlSearch = `%${decodeURIComponent(searchQuery)}%`;

    // pagination
    const limit = 15;
    const offset = (page - 1) * limit;

    const baseSearchQuery = ctx
      .db("package")
      .orWhere("name", "like", sqlSearch)
      .orWhere("description", "like", sqlSearch)
      .orWhere("readme", "like", sqlSearch)
      .orWhere("tags", "like", sqlSearch)
      .orWhere("category", "like", sqlSearch)
      .andWhere("package.deleted", 0)
      .groupBy("package.id");

    const packagesQuery = baseSearchQuery
      .clone()
      .select(
        "package.*",
        ctx.db.raw("count(distinct comment.id) as comments"),
        ...selectVotes(ctx)
      )
      .leftJoin("comment", "package.id", "comment.package_id")
      .offset(offset);

    const countQuery = baseSearchQuery
      .clone()
      .count("* as count")
      .first();

    const finalPackagesQuery = joinVotes(packagesQuery, ctx.state.user.id);

    const [packages, countRow] = await Promise.all([
      finalPackagesQuery,
      countQuery,
    ]);
    const count = (countRow && countRow.count) || 0;

    // + 1 pecause pages are 1 indexed, not 0 indexed.
    const totalPages = ((count / limit) | 0) + 1;

    // if there are no search results, it will return a single package with
    // null for everyting. We just throw it off the array.
    if (packages[0].id === null) {
      packages.shift();
    }

    ctx.body = { packages, count, totalPages };
  },
];
