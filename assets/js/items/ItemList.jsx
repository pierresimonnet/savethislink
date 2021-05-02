import React, { memo } from "react";
import Item from "./Item";

const ItemList = memo(
  ({
    isLoading,
    items,
    hasMore,
    onLoadMore,
    onEditItem,
    onRemoveItem,
    user,
    ressource,
  }) => {
    return (
      <div>
        <div className="itemsContainer">
          {isLoading && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {!isLoading && items.length === 0 ? (
            <p colSpan="7" className="text-center">
              No data
            </p>
          ) : (
            items.map((item) => (
              <Item
                key={item.id}
                item={item}
                edit={onEditItem}
                remove={onRemoveItem}
                user={user}
                ressource={ressource}
              />
            ))
          )}
        </div>
        {hasMore && (
          <button disabled={isLoading} onClick={onLoadMore}>
            {isLoading ? "Loading..." : "Load more"}
          </button>
        )}
      </div>
    );
  }
);

export default ItemList;
