import React from 'react'
import useSWR from 'swr'
import { Movie, TMDBResponse } from '../../../typing'
import { config } from '../../utils/tmdb'
import { Card } from './SimilarCard'

const RecommendedCard = ({ id }: {id: number }) => {
    const { data } = useSWR<TMDBResponse<Movie[]>>(`${config.BASE_URL}movie/${id}/recommendations?api_key=${config.API_KEY}&language=en-US&page=1`);


  return data ? data?.results?.length > 0 ? (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-white text-md font-semibold">
          {" "}
          Recommendations
        </p>
      </div>

      <div className="flex overflow-scroll scrollbar-hide">
        {data?.results?.slice(0, 10).map((props: Movie, i: number) => (
          <Card key={i} {...props} />
        ))}
      </div>
    </div>
  ): null : null
}

export default RecommendedCard
