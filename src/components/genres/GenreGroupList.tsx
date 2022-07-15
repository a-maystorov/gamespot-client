import Genre from '../../models/Genre';

interface GenreListProps {
  genres: Genre[];
  onGenreSelect: (genre: Genre) => void;
  selectedGenre: Genre;
}

function GenreList({ genres, onGenreSelect, selectedGenre }: GenreListProps) {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre._id}
          className={
            genre === selectedGenre
              ? 'list-group-item clickable active'
              : 'list-group-item clickable'
          }
          onClick={() => onGenreSelect(genre)}>
          {genre.name}
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
