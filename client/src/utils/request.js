export const request = async (url, method, data) => {
  const res = await fetch(url, {
    method: method || "GET",
    headers: { "Content-Type": "application/json" },
    body: data ? JSON.stringify(data) : undefined,
  });
  return await res.json();
};
