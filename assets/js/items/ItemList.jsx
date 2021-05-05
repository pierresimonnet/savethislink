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
      <>
        <div className="itemsContainer listMargin-lg">
          {isLoading && <div className="text-center">Loading...</div>}
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
          <div className="d-flex justify-flex-center mt-1">
            <button
              disabled={isLoading}
              onClick={onLoadMore}
              className="button-primary"
            >
              {isLoading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </>
    );
  }
);

export default ItemList;
