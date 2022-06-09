import { useState } from 'react';
import Genre from '../models/Genre';

interface GenreListProps {
  genres: Genre[];
}

function GenreList({ genres }: GenreListProps) {
  const [selectedGenre, setSelectedGenre] = useState<Genre>();

  const selectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
  };

  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre._id}
          className={
            genre === selectedGenre
              ? 'list-group-item active'
              : 'list-group-item'
          }
          onClick={() => selectGenre(genre)}>
          {genre.name}
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
