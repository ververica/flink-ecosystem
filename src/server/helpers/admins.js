// List of Github IDs that are admins on the site.
// To find someone's ID from their username you can use this:
//    curl -s https://github.com/$username | awk -F '\/|[?]s=' '/og:image/ {print $5}'
export const admins = [
  1727146, // StephanEwen
  5756858, // tillrohrmann
  1756620, // uce
  2388347, // fhueske
  5725237, // zentol
  68551, // aljoscha
  89049, // rmetzger
];

if (process.env.NODE_ENV !== "production") {
  admins.push(
    588852 // sorahn
  );
}

export const checkAccess = (ctx, id) => {
  const canAccess =
    ctx.state.user.id === id || admins.includes(ctx.state.user.id);

  if (!canAccess) {
    // someone other than the package owner, or an admin is trying to make
    // this request.
    ctx.throw(403);
  }
};
