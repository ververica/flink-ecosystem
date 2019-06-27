import checkUser from "server/middleware/checkUser";

exports.get = [checkUser(), ctx => (ctx.body = ctx.state.user)];
