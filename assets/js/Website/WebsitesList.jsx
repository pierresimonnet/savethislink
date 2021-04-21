import React, { memo } from "react";
import { WebsiteItem } from "./WebsiteItem";

export const WebsitesList = memo(
  ({
    websites,
    highlightedRowId,
    onLoadMore,
    onRowClick,
    isLoaded,
    onDeleteItem,
    hasMore,
  }) => {
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Url</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Comment</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoaded && (
              <tr>
                <td colSpan="7" className="text-center">
                  Loading...
                </td>
              </tr>
            )}
            {isLoaded && websites.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No data...
                </td>
              </tr>
            ) : (
              websites.map((website) => {
                return (
                  <WebsiteItem
                    key={website.id}
                    website={website}
                    highlightedRowId={highlightedRowId}
                    onRowClick={onRowClick}
                    onDeleteItem={onDeleteItem}
                  />
                );
              })
            )}
          </tbody>
        </table>
        {hasMore && (
          <button disabled={!isLoaded} onClick={onLoadMore}>
            Load more
          </button>
        )}
      </>
    );
  }
);
