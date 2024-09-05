import { ArrowDownward, ArrowLeft, ArrowRight, ArrowUpward, Visibility } from "@mui/icons-material";
import { IconContainer } from "../../../../components/IconContainer";
import useTable from "./store";
import { usePopup } from "../Popup/store";

export default () => {
  const table = useTable();
  const popup = usePopup();

  const onNextClick = () => {
    if (table.paginationResult.pageNumber === table.paginationResult.maxPageNumber) return;
    table.setPaginationResult({
      ...table.paginationResult,
      pageNumber: table.paginationResult.pageNumber + 1
    });
    table.setRefresh(!table.refresh);
  };

  const onPrevClick = () => {
    if (table.paginationResult.pageNumber <= 1) return;
    table.setPaginationResult({
      ...table.paginationResult,
      pageNumber: table.paginationResult.pageNumber - 1
    });
    table.setRefresh(!table.refresh);
  };

  const getHeaderClassName = (header: string) => {
    return header === table.order
      ? "custom-table-header active-header text-main flex justify-between items-center"
      : "custom-table-header";
  };

  const renderArrow = (header: string) => {
    return table.isDescending ? (
      <ArrowDownward fontSize="small" className={table.order === header ? "text-main" : "text-sub"} />
    ) : (
      <ArrowUpward fontSize="small" className={table.order === header ? "text-main" : "text-sub"} />
    );
  };

  const headerClick = (header: string) => {
    if (table.order === header) {
      table.setIsDescending(!table.isDescending);
      table.setRefresh(!table.refresh);
    } else {
      table.setOrder(header);
      table.setIsDescending(false);
      table.setRefresh(!table.refresh);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-bg text-text">
        <thead className="bg-sub text-left">
          <tr>
            {["clue", "category", "freq", "success rate", "created date"].map((header) => (
              <th
                key={header}
                className={getHeaderClassName(header)}
                onClick={() => headerClick(header)}
              >
                {header}
                {renderArrow(header)}
              </th>
            ))}
            <th className="custom-table-header"></th>
          </tr>
        </thead>
        <tbody>
          {table.items.length > 0 &&
            table.items.map((item, index) => (
              <tr key={index} className="border-b border-sub">
                <td className="custom-table-row">{item.clueTxt}</td>
                <td className="custom-table-row">{item.categoryName}</td>
                <td className="custom-table-row">{item.nFrequency}x</td>
                <td className="custom-table-row">{(item.pctCorrect ?? 0) * 100}%</td>
                <td className="custom-table-row">{new Date(item.createdTime).toLocaleString()}</td>
                <td className="custom-table-row">
                  <div className="flex" onClick={() => { table.setSelectedItem(item);  popup.setIsOpen(true)}}>
                    <IconContainer>
                      <Visibility />
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
              table.setPaginationResult({
                ...table.paginationResult,
                pageSize: newSize
              });
              table.setRefresh(!table.refresh);
            }}
            className="border border-sub bg-bg focus:outline-none rounded-md p-1 custom-text-1 me-4"
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <div onClick={onPrevClick}>
            <ArrowLeft />
          </div>
          <p className="custom-text-1 mx-4">{table.paginationResult.pageNumber}</p>
          <div onClick={onNextClick}>
            <ArrowRight fontSize="medium" />
          </div>
        </div>
      </div>
    </div>
  );
};
