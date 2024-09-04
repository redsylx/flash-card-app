import { ArrowCircleRight, ArrowLeft, ArrowRight, ArrowRightAlt, RampRightSharp, Visibility } from "@mui/icons-material";
import { IconContainer } from "../../../../components/IconContainer";
import useTable from "./store";

export default () => {
  const table = useTable();

  const onNextClick = () => {
    if(table.paginationResult.pageNumber === table.paginationResult.maxPageNumber) return;
    table.setPaginationResult({...table.paginationResult, pageNumber: table.paginationResult.pageNumber += 1, isChange: !table.paginationResult.isChange});
  }

  const onPrevClick = () => {
    if(table.paginationResult.pageNumber <= 1) return;
    table.setPaginationResult({...table.paginationResult, pageNumber: table.paginationResult.pageNumber -= 1, isChange: !table.paginationResult.isChange});
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-bg text-text">
        <thead className="bg-sub text-left">
          <tr>
            <th className="custom-table-header">clue</th>
            <th className="custom-table-header">category</th>
            <th className="custom-table-header">freq</th>
            <th className="custom-table-header">success rate</th>
            <th className="custom-table-header">created date</th>
            <th className="custom-table-header"></th>
          </tr>
        </thead>
        <tbody>
          {table.items.length > 0 && table.items.map((item, index) => (
            <tr key={index} className="border-b border-sub">
              <td className="custom-table-row">{item.clueTxt}</td>
              <td className="custom-table-row">{item.categoryName}</td>
              <td className="custom-table-row">{item.nFrequency}x</td>
              <td className="custom-table-row">{(item.pctCorrect ?? 0) * 100}%</td>
              <td className="custom-table-row">{new Date(item.createdTime).toLocaleString()}</td>
              <td className="custom-table-row">
                <div className="flex">
                  <IconContainer>
                    <Visibility/>
                  </IconContainer>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4 items-center">
        <p>found {table.paginationResult.totalCount} Items</p>
        <div className="flex items-center">
          <select
            value={table.paginationResult.pageSize}
            onChange={(e) => {
              const newSize = Number(e.target.value);
              table.setPaginationResult({...table.paginationResult, pageSize: newSize, isChange: !table.paginationResult.isChange});
            }}
            className="border border-sub bg-bg focus:outline-none rounded-md p-1 custom-text-1 me-4"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <div 
            onClick={onPrevClick} 
            >
            <ArrowLeft/>
          </div>
          <p className="custom-text-1 mx-4">{table.paginationResult.pageNumber}</p>
          <div 
            onClick={onNextClick}
            >
            <ArrowRight fontSize="medium"/>
          </div>
        </div>
      </div>

    </div>
  );
};