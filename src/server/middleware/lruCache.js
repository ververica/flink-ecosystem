import LRU from "lru-cache";

const cache = new LRU({
  max: 500,
  maxAge: 1000 * 60 * 60 * 24, // 1 day
});

export default function lruCache(ctx, next) {
  ctx.cache = cache;
  return next();
}
