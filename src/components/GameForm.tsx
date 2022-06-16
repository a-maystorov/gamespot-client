import { useParams, useNavigate } from 'react-router-dom';

function GameForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Game Form {id}</h1>
      <button
        className="btn btn-primary rounded-pill"
        onClick={() => navigate('/games')}>
        Save
      </button>
    </div>
  );
}

export default GameForm;
