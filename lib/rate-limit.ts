type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export function enforceRateLimit(
  key: string,
  options: { limit: number; windowMs: number }
) {
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + options.windowMs
    });
    return {
      success: true,
      remaining: options.limit - 1
    };
  }

  if (current.count >= options.limit) {
    return {
      success: false,
      remaining: 0,
      retryAfterMs: current.resetAt - now
    };
  }

  current.count += 1;
  store.set(key, current);

  return {
    success: true,
    remaining: options.limit - current.count
  };
}
