export default async function (axios, type = "POST", url, params) {
  params.store = "";
  switch (type) {
    case "GET":
      await axios.post(url, { store: params.store });
    case "POST":
      return await axios.post(url, params);
    case "UPDATE":
      return await axios.put(url, params);
    case "REMOVE":
      return await axios.put(url, { active: false, store: params.store });
    case "DELETE":
      return await axios.delete(url, { store: params.store });
    default:
      return {};
  }
}
