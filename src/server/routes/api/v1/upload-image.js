import fs from "fs";

exports.post = async ctx => {
  const { image } = ctx.request.files;
  const file = fs.readFileSync(image.path);
  const previousId = ctx.request.get("x-previous-image");

  try {
    const [image_id] = await ctx.db("image").insert({
      file_type: image.type,
      file_size: image.size,
      file,
    });

    const removed = await ctx
      .db("image")
      .where({ id: previousId })
      .delete();

    ctx.body = { image_id, removed };
  } catch (e) {
    ctx.throw(400, {
      id: "image",
      message: "there was a problem uploading your image.",
    });
  }
};
