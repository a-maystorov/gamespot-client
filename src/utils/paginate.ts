import _ from 'lodash';
import Game from '../models/Game';

export default function paginate(
  items: Game[] | [],
  pageNumber: number,
  pageSize: number
) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
