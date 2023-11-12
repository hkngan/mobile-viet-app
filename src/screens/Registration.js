import {
  ScrollView,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Alert,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { COLORS, FONTSIZE, SPACING } from "../themes/themes";
import { Header, UIButton, Input } from "../components";
import ImagePicker from 'react-native-image-crop-picker';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome/'
import { faUser,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import AnnouceAlert from "../components/AnnouceAlert";

const Registration = () => {
  const navigation = useNavigation()
  const [userAvatar, setUserAvatar] = useState(null);
  const [userImage, setUserImage] = useState(null);  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState([]);
  const [password, setPassword] = useState("");
  const [selectNational, setSelectNational] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [checkedGender, setCheckedGender] = useState("");

  const IPV4_ADDRESS = config.extra.IPV4
  const PORT = config.extra.PORT

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const onPressContinue = () => {
    setShowAlert(false);
  };

  const togglePasswordVisibility = () => {
  setIsPasswordVisible(!isPasswordVisible);
};

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
  };

  useEffect(() => {
    async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access camera roll is required!");
      }
    };
    const getCountry = async () => {
      try {
        let response = await axios.get(
          `http://${IPV4_ADDRESS}:${PORT}/api/v1/country`
        );
        const formattedResponse = response.data.map((item) => ({
          label: item.nameEN,
          value: item.id,
        }));
        setNationality(formattedResponse);
      } catch (error) {}
    };
    getCountry();
  }, []);

  const genders = [
    {
      id: 1,
      label: "Male",
      value: "male",
    },
    {
      id: 2,
      label: "Female",
      value: "female",
    },
  ];

  const getMimeTypeFromUri = (uri) => {
    const extension = uri.split(".").pop();
    switch (extension) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      case "gif":
        return "image/gif";
      case "pdf":
        return "application/pdf";
      default:
        return "application/octet-stream";
    }
  };


const handleUploadImage = async () => {
  try {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });

    const uri = image.path;
    const type = getMimeTypeFromUri(uri);
    const fileName = uri.substring(uri.lastIndexOf("/") + 1);

    const formData = new FormData();
    formData.append("file", {
      uri,
      type,
      name: fileName,
    });

    setUserAvatar(formData);
    setUserImage({ uri });
  } catch (error) {
    console.log("Error in handleUploadImage func", error);
  }
};
  const handleRegister = async () => {
    try {
      if (
        !userAvatar ||
        !name ||
        !email ||
        !phone ||
        !checkedGender ||
        !selectNational ||
        !selectedDate ||
        !password
      ) {
        return (
          Alert.alert('Please enter all fields')
        );
      }
      const response = await axios.post(
        "http://192.168.1.4:4000/api/v1/file/upload/single",
        userAvatar,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const avatar = response.data.id
      console.log(avatar, name, email, phone, checkedGender, selectNational, selectedDate, password)

      const {data} = await axios.post('http://192.168.1.4:4000/api/v1/account', {
        fullName: name,
        phone: phone,
        email: email,
        avatar: avatar,
        dob: selectedDate,
        gender: checkedGender,
        nationality: selectNational,
        password: password  
      })
      console.log("Register Data", data)
      navigation.navigate('LoginStack')
    } catch (error) {
      console.log("Error in handleRegister func", error);
    }
  };

  // console.log( name, email, phone, checkedGender, selectNational, selectedDate, password)
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Header onPress={() => navigation.goBack()} title={"Registration"} />
        </View>
        <ScrollView>
          <View style={styles.content}>
            <TouchableOpacity onPress={handleUploadImage} style={{marginVertical: SPACING.space_18}}>
              {userImage ? (
                <Image
                    source= {userImage}
                    style={styles.imgInput}
                    />              ) : (              
              <FontAwesomeIcon style={{alignSelf:'center'}} icon={faUser} color={COLORS.Black} size={50}/>
              )}
            </TouchableOpacity>
            <Input
              placeholder="Fullname"
              heightInput={50}
              widthInput={WIDTH * 0.7}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Input
              placeholder="Email"
              heightInput={50}
              value={email}
              onChangeText={(text) => setEmail(text)}
              widthInput={WIDTH * 0.7}
            />
            <Input
              placeholder="Phone number"
              heightInput={50}
              widthInput={WIDTH * 0.7}
              keyboardType={"numeric"}
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={genders}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Choose your gender" : "..."}
              value={checkedGender}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setCheckedGender(item.value);
                setIsFocus(false);
              }}
            />
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={nationality}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Choose your country" : "..."}
              searchPlaceholder="Search..."
              value={selectNational}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setSelectNational(item.value);
                setIsFocus(false);
              }}
            />
            <View style={styles.dateContainer}>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.inputContainer}>
              Your birthday: {selectedDate ? new Date(selectedDate).toISOString().slice(0, 10): null}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
            </View>
            <View style={styles.password}>
                <Input
                  placeholder="Password"
                  heightInput={50}
                  widthInput={WIDTH * 0.7}
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconEye}>
                    <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} size={20} color="black" />
                </TouchableOpacity>
            </View>
            
            <UIButton
              title="sign up"
              backgroundColor="#0A6EBD"
              textColor="white"
              size={18}
              event={handleRegister}
            />
          </View>
          <AnnouceAlert
                 title={'Incorrect email or password'}
                 isVisible={showAlert}
                 onNextQuestion={onPressContinue}
                />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Registration;

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EEED",
  },
  header: {
    width: WIDTH,
  },
  content: {
    alignItems: "center",
    width: WIDTH,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  imgInput: {
    backgroundColor: COLORS.WhiteRGBA75,
    width: WIDTH * 0.25,
    height: WIDTH * 0.25,
    borderRadius: 50,
    justifyContent: "center",
    alignContent: "center",
    marginVertical: SPACING.space_16,
  },
  password:{
    flexDirection: 'row',
    alignItems: 'center'
},
  Camicon: {
    alignSelf: "center",
  },
  dropdown: {
    width: WIDTH * 0.7,
    height: 50,
    padding: 15,
    marginVertical: 7,
    fontSize: SPACING.size_16,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#444",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.LightBlack,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: SPACING.size_16,
  },
  dateContainer: {
    width: WIDTH * 0.7,
    height: 50,
    padding: 15,
    marginVertical: 7,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#444",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    flexDirection: "row",
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_10,
  },
  dateText: {
    alignSelf: "center",
    fontSize: FONTSIZE.size_16,
    color: COLORS.LightBlack,
  },
  genderContainer: {
    width: WIDTH * 0.7,
    height: 70,
    padding: 15,
    marginVertical: 7,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#444",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    flexDirection: "row",
    // paddingVertical: SPACING.space_10,
    // paddingHorizontal: SPACING.space_10,
    alignContent: "center",
  },
  customAlertContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.Grey,
  },
  alertBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  titleAlert: {
    color: COLORS.Black,
    fontWeight: "bold",
    fontSize: FONTSIZE.size_20,
    textAlign: "center",
    textTransform: "uppercase",
    marginVertical: SPACING.space_10,
  },
  redText: {
    color: COLORS.Red,
    textTransform: "capitalize",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancelButton: {
    borderColor: COLORS.Red,
    borderWidth: 1,
    borderRadius: SPACING.space_10,
    width: WIDTH * 0.25,
    height: 30,
    paddingHorizontal: SPACING.space_18,
    marginHorizontal: SPACING.space_10,
    marginVertical: SPACING.space_15,
    alignItem: "center",
    justifyContent: "center",
  },
  confirmButton: {
    backgroundColor: COLORS.Red,
    width: WIDTH * 0.25,
    borderRadius: SPACING.space_10,
    paddingHorizontal: SPACING.space_18,
    marginHorizontal: SPACING.space_10,
    marginVertical: SPACING.space_15,
    alignItem: "center",
    height: 30,
    justifyContent: "center",
  },
  iconEye:{
    position: 'absolute',
    right: 0,
    marginHorizontal: SPACING.space_16
}
});
