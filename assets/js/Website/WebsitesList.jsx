import React from "react";

export default function WebsitesList({
  websites,
  highlightedRowId,
  onRowClick,
  onDeleteItem,
  isLoaded,
  isSavingNewItem,
}) {
  const handleDeleteClick = (e, id) => {
    e.preventDefault();

    onDeleteItem(id);
  };

  if (!isLoaded) {
    return (
      <tbody>
        <tr>
          <td colSpan="7" className="text-center">
            Loading...
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {isSavingNewItem && (
        <tr>
          <td
            colSpan="7"
            className="text-center"
            style={{
              opacity: 0.5,
            }}
          >
            Saving into the database ...
          </td>
        </tr>
      )}
      {websites.map((website) => {
        return (
          <tr
            key={website.id}
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
              <button onClick={(e) => handleDeleteClick(e, website.id)}>
                &#128465;
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
