import React, { useState } from "react";
import { View, Button, Text } from "react-native";

import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";
import { ListItem } from "react-native-elements";

const methods = [
  { name: "Cash on delivery", value: 1, icon: "dollar" },
  { name: "Bank Transfer", value: 2, icon: "bank" },
  { name: "Card Payment", value: 3, icon: "address-card" },
];
const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];
const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();
  const [color, setColor] = useState("white");
  return (
    <View>
      <View style={{ marginTop: 100 }}>
        <View>
          <Text style={{ fontSize: 25, marginLeft: 20, marginBottom: 10 }}>
            Chose your payment method
          </Text>
        </View>
        <View>
          {methods.map((item, index) => {
            return (
              <ListItem
                key={item.name}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#1e90ff",
                }}
              >
                <View style={{ marginLeft: 25 }}>
                  <Button
                    title={item.name}
                    onPress={() => [setSelected(item.value)]}
                  />
                </View>

                <Icon
                  name={item.icon}
                  color="green"
                  size={20}
                  style={{ position: "absolute", marginLeft: 5 }}
                />
              </ListItem>
            );
          })}
        </View>
      </View>
      {selected == 2 ? (
        <View style={{ marginRight: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 20 }}>You chose bank transfer</Text>
        </View>
      ) : null}

      {selected == 1 ? (
        <View style={{ marginRight: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 20 }}>You chose cash on delivery</Text>
        </View>
      ) : null}

      {selected == 3 ? (
        <View>
          <Text style={{ marginTop: 10, fontSize: 20 }}>
            Your card payment: {card}
          </Text>
          <Picker
            mode="dropdown"
            selectedValue={card}
            onValueChange={(x) => setCard(x)}
          >
            {paymentCards.map((c, index) => {
              return <Picker.Item key={c.name} label={c.name} value={c.name} />;
            })}
          </Picker>
        </View>
      ) : null}
      <View
        style={{
          marginTop: 60,
          alignSelf: "center",
          width: "50%",
          alignItems: "center",
          borderWidth: 2,
          borderRadius: 5,
          backgroundColor: "#1e90ff",
          borderColor: "#1e90ff",
        }}
      >
        <Button
          title={"Confirm"}
          color={"white"}
          onPress={() => props.navigation.navigate("Confirm", { order })}
        />
      </View>
    </View>
  );
};
export default Payment;
