export const commentMailerTemplate = ({
  packageName,
  userName,
  text,
  origin,
  packageSlug,
  commentId,
}) => `
Package: ${packageName}
User: ${userName}
Comment:
------
${text}
------

View this comment: ${origin}/packages/${packageSlug}#comment-${commentId}
`;
