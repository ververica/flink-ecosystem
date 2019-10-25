export const commentMailerTemplate = ({
    packageName,
    userName,
    text,
    origin,
    packageSlug,
    commentId,
}) => `
Package: ${packageName}
Comment:
------
${text}
------

Changed by: ${userName}
View this comment: ${origin}/packages/${packageSlug}#comment-${commentId}
`;

export const packageMailerTemplate = ({
    name,
    slug,
    description,
    readme,
    website,
    repository,
    license,
    category,
    tags,
    origin,
    userName,
}) => `
Name: ${name}
ID: ${slug}
Website: ${website}
Repository: ${repository}
License: ${license}
Category: ${category}
Tags: ${tags}
Description:
---
${description}
---

Readme:
---
${readme}
---

Changed by: ${userName}
View this package: ${origin}/packages/${slug}
`;