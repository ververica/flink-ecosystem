export const selectVotes = ctx => [
  ctx.db.raw("ifnull(vote.vote, 0) as vote"),
  ctx.db.raw("count(distinct upvote.id) as upvotes"),
  ctx.db.raw("count(distinct downvote.id) as downvotes"),
];

export const joinVotes = (query, user_id) =>
  query
    .leftJoin("vote", join => {
      join.on("package.id", "vote.package_id").on("vote.user_id", user_id);
    })
    .leftJoin("vote as upvote", join => {
      join.on("package.id", "upvote.package_id").on("upvote.vote", 1);
    })
    .leftJoin("vote as downvote", join => {
      join.on("package.id", "downvote.package_id").on("downvote.vote", -1);
    });
