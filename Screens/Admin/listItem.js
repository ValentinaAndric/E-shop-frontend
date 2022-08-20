import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighLight,
  Dimensions,
  Button,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

var width = Dimensions.get("window");

const ListItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View>
          <View>
            <TouchableOpacity
              underlayColor="lightblue"
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size="20" />
            </TouchableOpacity>
            <Button title="Edit" />
            <Button title="Delete" />
          </View>
        </View>
      </Modal>
      <TouchableOpacity>
        <Image
          source={{
            uri: props.image
              ? props.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
          resizeMode="contain"
        />
        <Text>{props.brand}</Text>
        <Text>{props.name}</Text>
        <Text>{props.category.name}</Text>
        <Text>{props.price}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;
