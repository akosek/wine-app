import React, { useState, useEffect } from "react";
import axios from "axios";
// Assets
import { baseUrl } from "../api";
import { PlusCircle } from "react-bootstrap-icons";

//Styles
import {
  WineList,
  HomeHeader,
  HeaderText,
  HomeContainer,
  EmptyBox,
} from "../styles";

// Components
import WineCard from "../components/WineCard";
import NewWineModal from "../components/NewWineModal";
import { Button, Spinner, Card } from "react-bootstrap";

export function Home() {
  const [wineList, setWineList] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(baseUrl);
      setWineList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const removeItem = async (id: number) => {
    try {
      const res = await axios.delete(`${baseUrl}/${id}`);
      console.log("Item successfully deleted.");
      fetchData();
    } catch (error) {
      alert(error);
    }
  };

  const toogleModal = () => {
    setModalVisible(!modalVisible);
  };

  const refetchData = () => {
    setModalVisible(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HomeContainer className="Home">
      <HomeHeader>
        <HeaderText>Your Wine Collection</HeaderText>
      </HomeHeader>
      {wineList.length ? (
        <WineList>
          <EmptyBox onClick={toogleModal}>
            <Button onClick={toogleModal}>
              <PlusCircle /> Add New
            </Button>
          </EmptyBox>
          {wineList?.map((item) => {
            return (
              <WineCard
                key={item.id}
                name={item.name}
                image={item.img}
                wineItem={item}
                deleteItem={() => removeItem(item.id)}
              />
            );
          })}
        </WineList>
      ) : (
        <Spinner animation="border" role="status" />
      )}
      <NewWineModal
        isVisible={modalVisible}
        handleClose={toogleModal}
        closeModal={refetchData}
      />
    </HomeContainer>
  );
}
