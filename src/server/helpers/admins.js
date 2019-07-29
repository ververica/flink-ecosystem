// List of Github IDs that are admins on the site.
// To find someone's ID from their username you can use this:
//    curl -s https://github.com/$username | awk -F '\/|[?]s=' '/og:image/ {print $5}'
export const admins = [
  1727146, // StephanEwen
  5756858, // tillrohrmann
  105434, // hsaputra
  5880972, // gyfora
  1756620, // uce
  2388347, // fhueske
  5725237, // zentol
  68551, // aljoscha
  89049, // rmetzger
  5746567, // twalthr
  5990983, // mbalassi
  5284370, // tzulitai
  569655, // greghogan
  1826769, // warneke
  498957, // vasia
  332352, // alanfgates
  837221, // mxm
  9400874, // shaoxuan-wang
  22488084, // sunjincheng121
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
