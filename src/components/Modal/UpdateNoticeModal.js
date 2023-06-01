import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Modal, Portal } from "react-native-paper";
import MyContext from "../../utility/MyContext";
import { auxDataApi } from "../../api/Shipment/VerifyShipment";
import { viewUpdate } from "../../api/BookingApi/updateBookingGetApi";

export default function UpdateNoticeModal({
  setExtraWork,
  openExtraWork,
  setInputCode,
  setCode,
  navigation
}) {
  const [primaryData, setPrimaryData] = useState([]);
  const [mainData, setMainData] = useState([]);
  console.log(mainData);
  const auxData = async () => {
    const data = await auxDataApi();
    setPrimaryData(data);
  };
  useEffect(() => {
    auxData();
  }, [openExtraWork]);

  const extraWorkData = async () => {
    const z = await viewUpdate(openExtraWork?.booking);
    setMainData(z?.data?.primary_data?.extra_work?.work);
  };

  useEffect(() => {
    extraWorkData();
  }, [openExtraWork]);

  // const { primaryData, setRefatchData,refetchDatar } = useContext(MyContext);

  const handleDisMis = () => {
    setExtraWork(false);
    // setRefatchData(!refetchDatar);
    setInputCode("");
  };

  const updateBooking = () => {
    navigation.navigate("update", {
      trackingID: openExtraWork?.trackingID,
      BookingID: openExtraWork?.booking
    });
    setCode("");
    setInputCode("");
    setExtraWork(false);
  };

  const containerStyle = { backgroundColor: "white", padding: 20, margin: 10 };
  return (
    <Portal>
      <Modal
        visible={openExtraWork}
        contentContainerStyle={containerStyle}
        dismissable={!openExtraWork}
        onDismiss={openExtraWork}
      >
        <View>
          <Text style={{ fontSize: 20 }}>
            Client has requested for extra work:{" "}
          </Text>

          <View style={{ marginLeft: 10, marginBottom: 20, marginTop: 13 }}>
            {mainData?.map((item, index) =>
              item?.name === "Payment" ? (
                <Text key={index} style={{ fontSize: 14 }}>{`${index + 1}. ${
                  item?.name
                } - ${item?.amount} ${
                  primaryData?.data?.country_json?.find(
                    (c) => c?.code === item?.currency && c
                  )?.currency
                }`}</Text>
              ) : (
                <Text key={index} style={{ fontSize: 14 }}>{`${index + 1}. ${
                  item?.name
                }`}</Text>
              )
            )}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            justifyContent: "center",
            marginTop: 10
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={() => handleDisMis()}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#00aeef",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              width: 150
            }}
            onPress={() => updateBooking()}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Update Booking</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
}
