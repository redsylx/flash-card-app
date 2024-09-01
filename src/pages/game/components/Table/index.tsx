import usePlay from "../../../play/store";
import usePopup from "../Popup/store";
import useTable from "./store";

export default () => {
  const play = usePlay();
  const popup = usePopup();
  const table = useTable();
  return (
    <div className="overflow-x-auto">
      <p className="mb-8 custom-text-4 font-bold">Game History</p>
      <table className="min-w-full bg-bg text-text">
        <thead className="bg-sub text-left">
          <tr>
            <th className="custom-table-header">date time</th>
            <th className="custom-table-header">category</th>
            <th className="custom-table-header">items</th>
            <th className="custom-table-header">success rate</th>
          </tr>
        </thead>
        <tbody>
          {table.games.length > 0 && table.games.map((item, index) => (
            <tr key={index} className="border-b border-sub">
              <td className="custom-table-row">{new Date(item.createdTime).toLocaleString()}</td>
              <td className="custom-table-row">{item.listCategory.join(", ")}</td>
              <td className="custom-table-row">{item.nCard}</td>
              <td className="custom-table-row">{(item.pctCorrect ?? 0) * 100}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};