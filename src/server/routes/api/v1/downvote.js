import checkGithub from "../../../middleware/checkGithub";
import voteHelper from "../../../helpers/voteHelper";

export const post = [checkGithub(), voteHelper("downvotes", "upvotes")];
