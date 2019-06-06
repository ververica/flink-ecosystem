import checkGithub from "../../../middleware/checkGithub";

export const get = [checkGithub(), ctx => (ctx.body = ctx.state.user)];
