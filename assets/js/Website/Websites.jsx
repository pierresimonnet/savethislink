import React from "react";
import WebsitesList from "./WebsitesList";
import WebsiteCreator from "./WebsiteCreator";

export default function Websites({
  websites,
  highlightedRowId,
  onRowClick,
  onAddItem,
  onDeleteItem,
  isLoaded,
  isSavingNewItem,
  successMessage,
}) {
  return (
    <div>
      <h1>Website index</h1>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <WebsiteCreator onAddItem={onAddItem} />
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
        <WebsitesList
          websites={websites}
          highlightedRowId={highlightedRowId}
          onRowClick={onRowClick}
          onDeleteItem={onDeleteItem}
          isLoaded={isLoaded}
          isSavingNewItem={isSavingNewItem}
        />
      </table>
    </div>
  );
}
