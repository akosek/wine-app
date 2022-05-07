import React, { useState, FormEvent } from "react";
// Api
import { baseUrl } from "../api";

// UI & Styles
import { Button, Modal, Form } from "react-bootstrap";
import { CenteredRow } from "../styles";

type Props = {
  isVisible: boolean;
  handleClose?: () => void;
  dataSent?: () => void;
  closeModal: () => void;
};

const NewWineModal = ({ isVisible, handleClose, closeModal }: Props) => {
  const [name, setName] = useState<string>("");
  const [wineText, setWineText] = useState<string>("");
  const [wineType, setWineType] = useState<string>("");
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setWineText(newText);
  };

  const handleType = (event: any) => {
    const newType = event.target.id;
    setWineType(newType);
  };

  const handleSubmit = (event: FormEvent) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        text: wineText,
        img:
          wineType === "red"
            ? "./wines/wine-added.jpeg"
            : "./wines/white-added.png",
        type: wineType,
      }),
    };
    fetch(baseUrl, requestOptions).then((response) => response.json());

    setIsAdded(true);
    event.preventDefault();
  };

  return (
    <Modal
      show={isVisible}
      onHide={handleClose}
      animation={true}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header className="justify-content-center">
        <Modal.Title>
          {!isAdded ? "Add New wine to the colleciton" : "Woohoo! :)"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isAdded ? (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Wine's Name"
                onChange={handleNameChange}
              />
            </Form.Group>

            <div className="mb-3">
              <Form.Check
                inline
                label="White wine"
                name="wineType"
                type="radio"
                onChange={handleType}
                id={`white`}
              />
              <Form.Check
                inline
                label="Red wine"
                name="wineType"
                type="radio"
                id={`red`}
                onChange={handleType}
              />
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Insert your text"
                onChange={handleTextChange}
              />
            </Form.Group>
            <CenteredRow>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </CenteredRow>
          </Form>
        ) : (
          <div className="text-center">
            <p>Your new wine wass added succesfully!</p>
            <Button
              variant="primary"
              type="submit"
              onClick={() => {
                closeModal();
                setIsAdded(false);
              }}
            >
              OK
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default NewWineModal;
