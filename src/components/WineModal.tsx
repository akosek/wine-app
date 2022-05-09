import React, { useState } from "react";
import axios from "axios";
import { TWine } from "../types";
import { baseUrl } from "../api";
// UI & Styles
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import { CenteredRow } from "../styles";

type Props = {
  isVisible: boolean;
  handleClose: () => void;
  wineDetails: TWine;
};

const WineModal = ({ isVisible, handleClose, wineDetails }: Props) => {
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [opinion, setOpinion] = useState<string>("");

  const saveOpinion = async (id: number) => {
    try {
      const res = await axios.put(`${baseUrl}/${id}`, {
        id: wineDetails.id,
        name: wineDetails.name,
        img: wineDetails.img,
        text: wineDetails.text,
        opinion: opinion,
      });
      console.log("my new opinion", res.data.opinion);
      setOpinion(res.data.opinion);
      setInputVisible(false);
    } catch (error) {
      alert(error);
    }
  };

  const addText = () => {
    setInputVisible(true);
  };

  const handleChange = (event: any) => {
    const newText = event.target.value;
    setOpinion(newText);
  };

  return (
    <Modal
      show={isVisible}
      onHide={handleClose}
      animation={true}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header>
        <Modal.Title className="Title">{wineDetails?.name}</Modal.Title>
        <Button variant="soutline" onClick={handleClose}>
          <XCircle color="lightgrey" size={26} />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <>
          <Row>
            <Col xs={5}>
              <img src={wineDetails?.img} className="img-fluid" />
            </Col>
            <Col>{wineDetails?.text}</Col>
          </Row>
          {wineDetails.opinion ? (
            <>
              <h5>Your notes:</h5>
              {wineDetails?.opinion}
            </>
          ) : null}
        </>
        {inputVisible ? (
          <Form>
            <Form.Group style={{ marginBottom: "15px" }}>
              <Form.Control
                type="text"
                value={opinion}
                placeholder={
                  wineDetails.opinion
                    ? wineDetails.opinion
                    : "Write down your notes"
                }
                as="textarea"
                onChange={handleChange}
              />
            </Form.Group>
            <CenteredRow>
              <Button
                type="submit"
                className="align-self-center"
                variant="success"
                onClick={() => {
                  setOpinion(opinion);
                  saveOpinion(wineDetails.id);
                }}
              >
                Save
              </Button>
            </CenteredRow>
          </Form>
        ) : null}
      </Modal.Body>
      {!inputVisible ? (
        <Modal.Footer className="justify-content-center">
          <Button variant="outline-primary" onClick={addText}>
            {wineDetails.opinion ? "Edit notes" : "Add notes"}
          </Button>
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};

export default WineModal;
