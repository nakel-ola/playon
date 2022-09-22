async function fetchData<T>(url: string) {
  try {
    const res = await fetch(url);
    const data: T = await res.json();


    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
}
export default fetchData;
