export async function postJson(path, payload) {
  return requestJson(path, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function getJson(path, options = {}) {
  return requestJson(path, { method: "GET" }, options);
}

export async function patchJson(path, payload, options = {}) {
  return requestJson(
    path,
    {
      method: "PATCH",
      body: JSON.stringify(payload)
    },
    options
  );
}

async function requestJson(path, options, config = {}) {
  const headers = {
    "Content-Type": "application/json"
  };
  if (config.token) {
    headers.Authorization = `Bearer ${config.token}`;
  }

  const response = await fetch(path, {
    headers,
    ...options
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const error = new Error(data.error || "Request failed.");
    error.status = response.status;
    throw error;
  }

  return data;
}
