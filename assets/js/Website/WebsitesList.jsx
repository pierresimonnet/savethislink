import React from "react";

export default function WebsitesList({
  websites,
  highlightedRowId,
  onRowClick,
  onDeleteItem,
}) {
  const handleDeleteClick = (e, id) => {
    e.preventDefault();

    onDeleteItem(id);
  };

  return (
    <tbody>
      {websites.map((website) => {
        return (
          <tr
            key={website.id}
            className={highlightedRowId === website.id ? "info" : ""}
            onClick={(e) => onRowClick(website.id)}
          >
            <td>{website.id}</td>
            <td>{website.url}</td>
            <td>{website.title}</td>
            <td>{website.description}</td>
            <td>{website.image}</td>
            <td>{website.comment}</td>
            <td>
              <a href="#">show</a>
              <a href="#">&#128394;</a>
              <a href="#" onClick={(e) => handleDeleteClick(e, website.id)}>
                &#128465;
              </a>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
