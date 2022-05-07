import React, { useState } from "react";
// UI & Styles
import { Card, Button } from "react-bootstrap";
import WineModal from "./WineModal";
import { Trash, Info } from "react-bootstrap-icons";
import { ButtonContainer, CardPicture, CardTitle } from "../styles";

type Props = {
  wineItem: { id: number; name: string; img: string; text: string };
  name: string;
  image: string;
  deleteItem: () => void;
};

const WineCard = ({ name, image, wineItem, deleteItem }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openCard = () => {
    setIsOpen(true);
  };

  const closeCard = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Card className="shadow" style={{ width: "16rem", margin: "16px" }}>
        <CardPicture src={image} className="img-responsive" />
        <Card.Body>
          <CardTitle>{name}</CardTitle>
          <ButtonContainer>
            <Button variant="outline-danger" onClick={deleteItem}>
              <Trash /> Delete
            </Button>
            <Button variant="outline-success" onClick={openCard}>
              <Info />
              More
            </Button>
          </ButtonContainer>
        </Card.Body>
      </Card>
      <WineModal
        isVisible={isOpen}
        handleClose={closeCard}
        wineDetails={wineItem}
      />
    </>
  );
};

export default WineCard;
