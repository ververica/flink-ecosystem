-- The tags are just stored as a list of strings on any given package.
-- We restrict the tags to < 10 per package, so this query will convert the
-- comma,separated,values into rows.
-- https://stackoverflow.com/a/17942691
SELECT
  DISTINCT
  substring_index(
    substring_index(tags, ',', n.digit + 1),
    ',',
    -1
  )
    AS tag
FROM
  package
  INNER JOIN (
      SELECT 0 AS digit
      UNION ALL SELECT 1
      UNION ALL SELECT 2
      UNION ALL SELECT 3
      UNION ALL SELECT 4
      UNION ALL SELECT 5
      UNION ALL SELECT 6
      UNION ALL SELECT 7
      UNION ALL SELECT 8
      UNION ALL SELECT 9
    )
      AS n ON
      length(replace(tags, ',', ''))
      <= length(tags) - n.digit
WHERE
  tags != ''
ORDER BY
  tag;