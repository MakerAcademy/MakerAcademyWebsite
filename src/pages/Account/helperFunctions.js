export const fetchUserProfile = async (id, callback) => {
  const url = `/api/users?_id=${id}`;

  const res = await fetch(url, {
    method: "GET",
  });
  const jsonData = await res.json();

  callback?.(jsonData.message || {});

  return jsonData.message;
};
