import { useCallback, useEffect, useState } from "react";
import { Data } from "../../pages";
import {
  getRandomData,
  Recommendation,
  recommendations,
} from "../../utils/tmdb";
import HomeRows from "./HomeRows";
import RowCards from "./RowCards";

const items = ["", "movie", "tv"];

const Categories = ({ active }: { active: number }) => {
  const [data, setData] = useState<Data[]>([]);

  const getData = useCallback(async () => {
    const res = await getRandomData();
    setData(res);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const newData =
    active === 0 ? data : data.filter((d: Data) => d.type === items[active]);

  return (
    <div>
      {active === 0
        ? recommendations.map((recommendation: Recommendation, index: number) => (
            <HomeRows key={index} {...recommendation} />
          ))
        : newData.map((props: Data, index: number) => (
            <RowCards key={index} {...props} />
          ))}
    </div>
  );
};

export default Categories;
