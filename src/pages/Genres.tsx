import GenreList from "../components/genres/GenreList";
import LoadingSpinner from "../components/LoadingSpinner";

import Genre from "../models/Genre";

import GenreService from "../services/GenreService";

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
    <div className="d-flex flex-column">
      {isLoading && <LoadingSpinner />}
      <GenreList genres={genres} onRemoveGenre={removeGenre} />
    </div>
  );
}

export default Genres;
