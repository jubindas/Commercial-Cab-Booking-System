import type { PullCar } from "@/table-types/pull-car-types";

type PullCarProps = {
  id: number;
  rowData: PullCar;
};

export default function PullCarTableColumnsDropdown({
  id,
  rowData,
}: PullCarProps) {
  console.log(id, rowData);
  return <div>pull-car-dropdown</div>;
}
