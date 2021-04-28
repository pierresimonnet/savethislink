import React, { memo } from "react";
import Item from "./Item";
import { Spinner } from "reactstrap";

const ItemList = memo(
  ({
    isLoading,
    items,
    hasMore,
    onLoadMore,
    onEditItem,
    onRemoveItem,
    user,
  }) => {
    return (
      <div>
        <div
          className="itemsContainer"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {isLoading && <Spinner color="secondary" />}
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
