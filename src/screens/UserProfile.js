import { StyleSheet, Text, View, Image, Dimensions, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import config from '../../config'
import axios from 'axios'
import { AuthContext } from '../context/authContext'
import { COLORS, FONTSIZE, SPACING } from '../themes/themes'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'

const UserProfile = () => {
  const navigation =  useNavigation()
  const {logout} = useContext(AuthContext)
  const IPV4 = config.extra.IPV4
  const PORT = config.extra.PORT
  const {state} = useContext(AuthContext);
  const accessToken = state.accessToken
  
  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    const getData =  async () => {
        try {
          let res = await axios.get(`http://${IPV4}:${PORT}/api/v1/account/me/info`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
            setUserInfo(res.data)
        } catch (error) {
          console.log('Error in getDataUser function', error)
        }
      }
      getData()
  }, [])
 
// console.log(userInfo)
if (userInfo.length === 0) {
  return (

      <SafeAreaView>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={COLORS.RedRGBA0} />
        </View>
      </SafeAreaView>
  );
}
const originalPath = userInfo.avatar.url;
const updatedPath = originalPath.replace(/\\/g, "/");
// console.log(`http://${IPV4}:${PORT}/${updatedPath}`)

const handleLogout = () => {
  try {
    logout()
    // console.log('profilescreen ', accessToken)
    navigation.navigate('WelcomeScreen')
  } catch (error) {
    console.log('Error in handleLogout', error)
  }
}
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
              source={{ uri: `http://${IPV4}:${PORT}/${updatedPath}` }}
              style={styles.imgMovie}
            />
            <View style={styles.nameContainer}>
            <Text style={styles.name}>{userInfo.fullName}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
              <FontAwesomeIcon icon={faEdit} size={25} color={COLORS.Black}/>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonContainer}  onPress={handleLogout}>
              <Text style={styles.buttonText}>log out</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}

export default UserProfile
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').width

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: COLORS.LightBlue
  },
  profileContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.White,
    height: HEIGHT*1.5,
    width: WIDTH,
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: SPACING.space_32,
    borderTopLeftRadius: SPACING.space_32

  },
  avatar:{
    width: WIDTH*0.2,
    height: WIDTH*0.2,
    marginVertical: SPACING.space_12,
    marginHorizontal: SPACING.space_15
  },
  loadingContainer: {
    marginTop: SPACING.space_20*2,
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: SPACING.space_8,
  },
  imgMovie: {
    width: WIDTH*0.45,
    height: WIDTH*0.45,
    alignSelf: "center",
    borderRadius: SPACING.space_20*10,
  },
  nameContainer:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  name:{
    marginVertical: SPACING.space_12,
    marginHorizontal: SPACING.space_15,
    fontSize: FONTSIZE.size_24,
    color: COLORS.Black,
    fontWeight: 'bold'
  },
  buttonContainer:{
    width: WIDTH*0.7,
    height: WIDTH*0.1,
    backgroundColor: COLORS.Black,
    borderRadius: SPACING.space_15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_15*2,
    marginHorizontal: SPACING.space_15
  },
  buttonText:{
    textTransform: 'uppercase',
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
    fontWeight: 'bold'
  }
})