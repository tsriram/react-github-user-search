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
      <button disabled={!pageInfo.hasPreviousPage} onClick={onPreviousClick}>
        Previous
      </button>
      <button disabled={!pageInfo.hasNextPage} onClick={onNextClick}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
