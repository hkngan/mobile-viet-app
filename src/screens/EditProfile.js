import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Header, UIButton} from '../components';
import {useNavigation} from '@react-navigation/native';
import config from '../../config';
import {AuthContext} from '../context/authContext';
import {COLORS, FONTSIZE, SPACING} from '../themes/themes';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome/';
import {faEye, faEyeSlash, faUser} from '@fortawesome/free-solid-svg-icons';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Dropdown} from 'react-native-element-dropdown';
import AnnouceAlert from '../components/AnnouceAlert';

const EditProfile = () => {
  const navigation = useNavigation();

  const IPV4 = config.extra.IPV4;
  const PORT = config.extra.PORT;
  const {state} = useContext(AuthContext);
  const accessToken = state.accessToken;

  const [userInfo, setUserInfo] = useState([]);
  const [userAvatar, setUserAvatar] = useState(undefined);
  const [userImage, setUserImage] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nationality, setNationality] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [selectNational, setSelectNational] = useState(null);
  const [checkedGender, setCheckedGender] = useState('');

  const [showAlert, setShowAlert] = useState(false);

  const onPressContinue = () => {
    setShowAlert(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setSelectedDate(date);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  useEffect(() => {
    async () => {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access camera roll is required!');
      }
    };
    const getData = async () => {
      try {
        let res = await axios.get(
          `http://${IPV4}:${PORT}/api/v1/account/me/info`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const getCountry = async () => {
          try {
            let response = await axios.get(
              `http://${IPV4}:${PORT}/api/v1/country`,
            );
            const formattedResponse = response.data.map(item => ({
              label: item.nameEN,
              value: item.id,
            }));
            setNationality(formattedResponse);
          } catch (error) {}
        };

        setUserInfo(res.data);
        getCountry();
      } catch (error) {
        console.log('Error in getDataUser function', error);
      }
    };
    getData();
  }, [accessToken]);

  const getMimeTypeFromUri = uri => {
    const extension = uri.split('.').pop();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'pdf':
        return 'application/pdf';
      default:
        return 'application/octet-stream';
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
      const fileName = uri.substring(uri.lastIndexOf('/') + 1);

      const formData = new FormData();
      formData.append('file', {
        uri,
        type,
        name: fileName,
      });
      setUserAvatar(formData);
      setUserImage({uri});
    } catch (error) {
      console.log('Error in handleUploadImage func', error);
    }
  };
  const handleFullNameChange = text => {
    setUserInfo({...userInfo, fullName: text});
  };
  const handleEmailChange = text => {
    setUserInfo({...userInfo, email: text});
  };
  const handlePhoneChange = text => {
    setUserInfo({...userInfo, phone: text});
  };
  const handlePasswordChange = text => {
    setUserInfo({...userInfo, password: text});
  };
  const genders = [
    {
      id: 1,
      label: 'Male',
      value: 'male',
    },
    {
      id: 2,
      label: 'Female',
      value: 'female',
    },
  ];
  //   console.log(userInfo);
  if (userInfo.length === 0) {
    return (
      <SafeAreaView>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.RedRGBA0} />
        </View>
      </SafeAreaView>
    );
  }
  const handleUpdate = async () => {
    try {
      setShowAlert(true)
      // const response = await axios.post(
      //   `http://${IPV4}:${PORT}/api/v1/file/upload/single`,
      //   userAvatar,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   },
      // );
      // const avatar = response.data.id;
      // console.log(avatar)
      // console.log( userInfo.fullName, userInfo.phone, selectedDate, checkedGender, selectNational, userInfo.password)

      // const {data} = await axios.put(
      //   `http://${IPV4}:${PORT}/api/v1/account/me/info/hndb`,
      //   {
      //       headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //       },
      //     },
      //     {
      //       fullName: userInfo.fullName,
      //       phone: userInfo.phone,
      //       dob: selectedDate,
      //       gender: checkedGender,
      //       nationality: selectNational,
      //       password: userInfo.password,
      //     }
      //   );
      // console.log('Thành công', data);

    } catch (error) {
      console.log('Error in handleUpdate func', error);
    }
  };
  const originalPath = userInfo.avatar.url;
  const updatedPath = originalPath.replace(/\\/g, '/');
  return (
    <SafeAreaView style={styles.container}>
      <View style={{position: 'absolute'}}>
        <Header onPress={() => navigation.navigate('UserProfile')} />
      </View>
      <View style={styles.containerContent}>
        <TouchableOpacity onPress={handleUploadImage}>
          <Image
            source={
              userImage
                ? userImage
                : {uri: `http://${IPV4}:${PORT}/${updatedPath}`}
            }
            style={styles.imgMovie}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.inputContainer}
          value={userInfo.fullName}
          onChangeText={handleFullNameChange}
          placeholder="Fullname"
        />
        <TextInput
          style={styles.emailContainer}
          value={userInfo.email}
          onChangeText={handleEmailChange}
          editable={false}
        />
        <TextInput
          style={styles.inputContainer}
          value={userInfo.phone}
          onChangeText={handlePhoneChange}
          placeholder="Phone Number"
        />
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={genders}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={userInfo.gender}
          value={checkedGender}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            if(item.value){
               setCheckedGender(item.value);
            }else{
                setCheckedGender(userInfo.gender)
            }
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={nationality}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={userInfo.nationality.name}
          searchPlaceholder="Search..."
          value={selectNational}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSelectNational(item.value);
            setIsFocus(false);
          }}
        />
        <View>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.inputContainer}>
              Your birthday:{' '}
              {selectedDate
                ? new Date(selectedDate).toISOString().slice(0, 10)
                : userInfo.dob.toISOString().slice(0, 10)}
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
          <TextInput
            style={styles.inputContainer}
            value={userInfo.password}
            onChangeText={handlePasswordChange}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor={COLORS.LightBlack}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.iconEye}>
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEye : faEyeSlash}
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <UIButton
          title="update"
          backgroundColor="#0A6EBD"
          textColor="white"
          size={18}
          event={handleUpdate}
        />
         <AnnouceAlert
           title={'Update success!!'}
          isVisible={showAlert}
          onNextQuestion={onPressContinue}
                />
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    marginTop: SPACING.space_20 * 2,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_8,
  },
  imgMovie: {
    width: WIDTH * 0.45,
    height: WIDTH * 0.45,
    alignSelf: 'center',
    borderRadius: SPACING.space_20 * 8,
    marginTop: SPACING.space_20 * 3,
    marginVertical: SPACING.space_10,
  },
  containerContent: {
    alignItems: 'center',
  },
  inputContainer: {
    height: 50,
    width: WIDTH * 0.7,
    margin: 5,
    color: COLORS.Black,
    backgroundColor: COLORS.White,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingRight: 70,
    paddingVertical: 10,
    fontSize: FONTSIZE.size_16,
    borderRadius: 10,
    shadowColor: '#444',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    marginVertical: SPACING.space_10,
  },
  emailContainer: {
    height: 50,
    width: WIDTH * 0.7,
    margin: 5,
    color: COLORS.Black,
    backgroundColor: COLORS.Beige,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingRight: 70,
    paddingVertical: 10,
    fontSize: FONTSIZE.size_16,
    borderRadius: 10,
    shadowColor: '#444',
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    marginVertical: SPACING.space_10,
  },
  password: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconEye: {
    position: 'absolute',
    right: 0,
    marginHorizontal: SPACING.space_16,
  },
  dropdown: {
    width: WIDTH * 0.7,
    height: 50,
    padding: 15,
    marginVertical: 7,
    fontSize: SPACING.size_16,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#444',
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
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: COLORS.Black,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.Black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: SPACING.size_16,
  },
});
