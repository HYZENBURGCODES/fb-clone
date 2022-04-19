import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "@use-expo/font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Entypo } from "@expo/vector-icons";
import { getpost } from "../Rest-API";

export default function HomePage() {

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState('');


  const Fetch_posts = async () => {
    setLoading(true);
    let response = await getpost();
    try {
      setLoading(false);
      setData(response);
      console.log("Data::::::::::", response);
    } catch (error) {
      setLoading(false);
      console.log("Erorr :: ", error);
    }
  };

  React.useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec
    );
  }, []);

  React.useEffect(() => {
    Fetch_posts();
  }, []);

  const renderItem = ({ item }) => (
    <Item creator={item.author} id={item.id} pic={item.download_url} />
  );

  const Item = ({ creator, id, pic }) => (
    <View style={styles.box}>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: 45,
              height: 45,
              marginHorizontal: 5,
              borderRadius: 10,
              top: 3,
              backgroundColor: "#000",
            }}
            source={{pic}}
          />
          <Text style={styles.post_text}>{creator+"\n"+currentDate}</Text>
          <Entypo
            name="dots-three-vertical"
            size={24}
            color="black"
            style={{ position: "absolute", right: 0, top: 10 }}
          />
        </View>
        <Text style={styles.post_caption}>{pic}</Text>
      </View>
      <Image
        style={{
          width: wp(100),
          padding: 150,
          top: 4,
          //backgroundColor:"#000"
        }}
        source={{ uri: pic }}
      />
    </View>
  );

  const [loaded] = useFonts({
    klavikaBold: require("../Fonts/klavika-bold.otf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#2a4fd9"
        translucent={false}
      />
      <View style={styles.container}>
        <View style={styles.header_Container}>
          <Text style={styles.header_title}>facebook</Text>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          //contentContainerStyle={{ paddingRight: 0, paddingLeft: 90 }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header_Container: {
    //backgroundColor:"#000",
    paddingHorizontal: 25,
    marginTop: 10,
  },
  header_title: {
    color: "#1877f2",
    fontSize: 38,
    fontFamily: "klavikaBold",
    marginTop: 17,
  },
  post_text: {
    color: "#1877f2",
    fontSize: 14,
    fontFamily: "klavikaBold",
    marginTop: 15,
    marginLeft: 10,
  },
  post_caption: {
    color: "#000",
    fontSize: 14,
    fontFamily: "klavikaBold",
    marginTop: 15,
    marginLeft: 10,
  },
  box: {
    //justifyContent:"center",
    marginTop: 10,
    // alignItems:"center",
  },
});
