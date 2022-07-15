import GenreList from '../components/genres/GenreList';
import Genre from '../models/Genre';
import GenreService from '../services/GenreService';

interface GenresProps {
  isLoading: boolean;
  genres: Genre[];
}
function Genres({ genres, isLoading }: GenresProps) {
  const removeGenre = async (id: string) => {
    genres.filter((genre) => genre._id !== id);
    await GenreService.removeGenre(id);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <GenreList genres={genres} onRemoveGenre={removeGenre} />
    </>
  );
}

export default Genres;
