import { mutate } from "swr";

function prefetch() {
  mutate("/api/data",fetch("/api/data").then((res) => res.json()));
  // the second parameter is a Promise
  // SWR will use the result when it resolves
}

export default prefetch