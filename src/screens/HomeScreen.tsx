import React, { FC, useMemo, useState, ReactElement } from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from 'src/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import MasonryList from '@react-native-seoul/masonry-list';
// import {useTheme} from 'dooboo-ui';


interface Furniture {
  id: string;
  imgURL: string;
  text: string;
}

const data: Furniture[] = [
  {
    id: 'id123',
    imgURL:
      'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Pioneer LHS Chaise Lounger in Grey Colour',
  },
  {
    id: 'id124',
    imgURL:
      'https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red',
    text: 'Precedant Furniture',
  },
  {
    id: 'id125',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg',
    text: 'Leverette Upholstered Platform Bed',
  },
  {
    id: 'id126',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*',
    text: 'Briget Accent Table',
  },
  {
    id: 'id127',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Rivet Emerly Media Console',
  },
  {
    id: 'id128',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Drew Barrymore Flower Home Accent Chair',
  },
  {
    id: 'id129',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Ecobirdy Charlie Chair',
  },
  {
    id: 'id130',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*',
    text: 'Hailey Sofa',
  },
  {
    id: 'id131',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*',
    text: 'Farmhouse Dining Table',
  },
  {
    id: 'id132',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Evelyn Coffee Table',
  },
  {
    id: 'id133',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Slope Nomad Leather Sofa',
  },
  {
    id: 'id134',
    imgURL:
      'https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg',
    text: 'Chair and Table',
  },
  {
    id: 'id223',
    imgURL:
      'https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg',
    text: 'Pioneer LHS Chaise Lounger in Grey Colour',
  },
  {
    id: 'id224',
    imgURL:
      'https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red',
    text: 'Precedant Furniture',
  },
  {
    id: 'id225',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg',
    text: 'Leverette Upholstered Platform Bed',
  },
  {
    id: 'id226',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*',
    text: 'Briget Accent Table',
  },
  {
    id: 'id227',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Rivet Emerly Media Console',
  },
  {
    id: 'id228',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Drew Barrymore Flower Home Accent Chair',
  },
  {
    id: 'id229',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Ecobirdy Charlie Chair',
  },
  {
    id: 'id230',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*',
    text: 'Hailey Sofa',
  },
  {
    id: 'id231',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*',
    text: 'Farmhouse Dining Table',
  },
  {
    id: 'id232',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Evelyn Coffee Table',
  },
  {
    id: 'id233',
    imgURL:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*',
    text: 'Slope Nomad Leather Sofa',
  },
  {
    id: 'id234',
    imgURL:
      'https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg',
    text: 'Chair and Table',
  },
];

const FurnitureCard: FC<{item: Furniture; style: StyleProp<ViewStyle>}> = ({
  item,
  style,
}) => {
  const randomBool = useMemo(() => Math.random() > 0.5, []);
  // const {colors} = useTheme();
  const colors = { text: '#100' };

  return (
    <View key={item.id} style={[{marginTop: 12, flex: 1}, style]}>
      <Image
        source={{uri: item.imgURL}}
        style={{
          height: randomBool ? 150 : 280,
          alignSelf: 'stretch',
        }}
        resizeMode="cover"
      />
      <Text style={{marginTop: 8, color: colors.text}}>{item.text}</Text>
    </View>
  )
}

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const {loggedInUser, setLoggedInUser} = useAuth();
  const [furnitureList, setFurnitureList] = useState(data.slice(0, 7));
  console.log('------ loggedInUser: ', loggedInUser);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('error signing out', error);
    }
    setIsLoading(false);
  };
  const renderItem = ({item, i}: {item: any; i: number}): ReactElement => {
    return (
      <FurnitureCard item={item} style={{marginLeft: i % 2 === 0 ? 0 : 12}} />
    );
  };
  const listEmptyComponent = () => {
    return (
      <>
        <Text>
          No Posts Found
        </Text>
      </>
    );
  };
  const delay = (ms :number) => new Promise((resolve) => setTimeout(resolve, ms));
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:1}}>
        <Text style={styles.title}>Welcome {loggedInUser.name}</Text>
        <MasonryList
          keyExtractor={(item: Furniture): string => item.id}
          ListHeaderComponent={<View />}
          contentContainerStyle={{
            paddingHorizontal: 24,
            alignSelf: 'stretch',
          }}
          // loading={isLoading}
          // onEndReached={async() => {
          //   setIsLoading(true);
          //   await new Promise(
          //     resolve => {
          //       setTimeout(resolve, 1000);
          //       setFurnitureList(prevList => [
          //         ...prevList,
          //         ...data.slice(prevList.length, prevList.length + 7),
          //       ]);
          //     }
          //   );
          //   setIsLoading(false);
          // }}

          onEndReached={async() => {
            setIsLoading(true);
            await delay(1000);
            setIsLoading(false);
            setFurnitureList(prevList => [
              ...prevList,
              ...data.slice(prevList.length, prevList.length + 7),
            ]);
          }}
          numColumns={2}
          data={furnitureList}
          renderItem={renderItem}
          ListEmptyComponent={listEmptyComponent}
        />
        <LinearGradient
          colors={['#8839ED', '#2F49ED']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Pressable onPress={handleLogout} style={styles.button}>
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color="white"
                style={styles.loader}
              />
            ) : (
              <Text style={styles.buttonText}>Log Out</Text>
            )}
          </Pressable>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 10,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 24,
    marginLeft: 24,
  },
  gradient: {
    borderRadius: 16,
    marginTop: 32,
  },
  button: {
    padding: 16,
  },
  loader: {
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Manrope-SemiBold',
  },
});

export default HomeScreen;