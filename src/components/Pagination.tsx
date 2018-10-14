import { PageInfo } from "src/queries";
import * as React from "react";

interface PaginationProps {
  readonly pageInfo: PageInfo;
  readonly onPreviousClick: React.MouseEventHandler<HTMLButtonElement>;
  readonly onNextClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Pagination: React.SFC<PaginationProps> = ({
  pageInfo,
  onPreviousClick,
  onNextClick
}) => {
  return (
    <div className="pagination">
      <button
        disabled={!pageInfo.hasPreviousPage}
        onClick={onPreviousClick}
        className="pagination-button"
      >
        Previous
      </button>
      <button
        disabled={!pageInfo.hasNextPage}
        onClick={onNextClick}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
