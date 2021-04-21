import React, { memo, useCallback } from "react";
import { usePost } from "../api/websites_api";

export const WebsiteItem = memo(
  ({ website, highlightedRowId, onRowClick, onDeleteItem }) => {
    const onDeleteCallback = useCallback(() => {
      onDeleteItem(website);
    }, [website]);

    const { load: deleteItem, loading } = usePost(
      website["@id"],
      "DELETE",
      onDeleteCallback
    );

    const handleDeleteClick = (e, website) => {
      e.preventDefault();

      website.isDeleting = true;
      deleteItem(website);
    };

    return (
      <tr
        className={highlightedRowId === website.id ? "info" : ""}
        onClick={(e) => onRowClick(website.id)}
        style={{
          opacity: website.isDeleting ? 0.3 : 1,
        }}
      >
        <td>{website.id}</td>
        <td>{website.url}</td>
        <td>{website.title}</td>
        <td>{website.description}</td>
        <td>{website.image}</td>
        <td>{website.comment}</td>
        <td>
          <button onClick={(e) => handleDeleteClick(e, website)}>
            &#128465;
          </button>
        </td>
      </tr>
    );
  }
);
