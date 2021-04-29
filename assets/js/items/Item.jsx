import React, { memo, useCallback, useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { usePost } from "../api/websites_api";
import DeleteModal from "../component/DeleteModal";
import FormModal from "../component/FormModal";

const Item = memo(({ item, edit, remove, user, ressource }) => {
  const [formModal, setFormModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleEdit = () => setFormModal(!formModal);
  const toggleDelete = () => setDeleteModal(!deleteModal);

  const handleEdit = (newItem) => {
    edit(newItem, item);
  };

  const onDeleteCallback = useCallback(() => {
    remove(item);
  }, [item]);

  const { load: deleteItem, isSaving } = usePost(
    item["@id"],
    "DELETE",
    onDeleteCallback
  );

  const handleDelete = (item) => {
    deleteItem(item);
  };

  return (
    <div
      style={{
        opacity: isSaving ? 0.3 : 1,
      }}
    >
      <Card>
        {ressource === "websites" && (
          <>
            <CardHeader>
              <a href={`/themes/${item.theme.slug}`}>{item.theme.title}</a>
            </CardHeader>
            <CardBody>
              <CardTitle tag="h5">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </CardTitle>
              <CardText>{item.comment}</CardText>
            </CardBody>
            {item.author.id === user && (
              <CardFooter className="text-muted">
                <Button onClick={toggleEdit} disabled={isSaving}>
                  &#9999;&#65039; edit
                </Button>

                <Button onClick={toggleDelete} disabled={isSaving}>
                  &#128465; delete
                </Button>
              </CardFooter>
            )}
          </>
        )}
        {ressource === "themes" && (
          <>
            <CardBody>
              <CardTitle tag="h5">
                <a href={`/themes/${item.slug}`}>{item.title}</a>
              </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {item.owner.username}
              </CardSubtitle>
              <CardText>{item.description}</CardText>
            </CardBody>
            {item.owner.id === user && (
              <CardFooter className="text-muted">
                <a href={`/websites/new/${item.slug}`}>
                  <Button>&#43; Add</Button>
                </a>
                <Button onClick={toggleEdit} disabled={isSaving}>
                  &#9999;&#65039; edit
                </Button>
                <Button onClick={toggleDelete} disabled={isSaving}>
                  &#128465; delete
                </Button>
              </CardFooter>
            )}
          </>
        )}
      </Card>
      <FormModal
        modal={formModal}
        toggle={toggleEdit}
        onSave={handleEdit}
        item={item}
        user={user}
        ressource={ressource}
      />
      <DeleteModal
        modal={deleteModal}
        toggle={toggleDelete}
        onDelete={handleDelete}
        item={item}
      />
    </div>
  );
});

export default Item;
