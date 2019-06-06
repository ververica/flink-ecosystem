import checkGithub from "../../../middleware/checkGithub";

export const get = [
  checkGithub(),
  ctx => {
    //do thing
  },
];
