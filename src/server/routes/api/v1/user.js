import checkUser from "server/middleware/checkUser";
import { admins } from "server/helpers/admins";
import { pick } from "lodash/fp";

const pickFields = pick(["id", "login", "avatar_url"]);

exports.get = [
  checkUser(),
  ctx => {
    ctx.body = {
      ...pickFields(ctx.state.user),
      isAdmin: admins.includes(ctx.state.user.id),
    };
  },
];
