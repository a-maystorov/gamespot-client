import _ from "lodash";

export default function paginate(items: any[], pageNumber: number, pageSize: number) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
