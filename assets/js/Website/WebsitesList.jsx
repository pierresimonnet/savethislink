import React, { memo } from "react";
import { WebsiteItem } from "./WebsiteItem";

export const WebsitesList = memo(
  ({
    websites,
    onLoadMore,
    isLoading,
    onDeleteItem,
    onUpdateItem,
    hasMore,
    user,
  }) => {
    return (
      <>
        <div className="table">
          {isLoading && (
            <p colSpan="7" className="text-center">
              Loading...
            </p>
          )}
          {!isLoading && websites.length === 0 ? (
            <p colSpan="7" className="text-center">
              No data...
            </p>
          ) : (
            websites.map((website) => {
              return (
                <WebsiteItem
                  userId={user}
                  key={website.id}
                  website={website}
                  onDeleteItem={onDeleteItem}
                  onUpdateItem={onUpdateItem}
                />
              );
            })
          )}
        </div>
        {hasMore && (
          <button disabled={isLoading} onClick={onLoadMore}>
            {isLoading ? "Loading..." : "Load more"}
          </button>
        )}
      </>
    );
  }
);
