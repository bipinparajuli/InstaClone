import React from 'react'
import { SafeAreaView,View, Text, Image,StyleSheet, Dimensions,TouchableOpacity } from 'react-native'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather'
import highlights from '../../data/banner'
import categories from "../../data/categories"


const {width,height} = Dimensions.get("window")

export default function HomeScreen({navigation}) {

    const style = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:"#f8fffa",
        },
        header:{
            backgroundColor:"#43bb6c",
            borderBottomLeftRadius:40,
            borderBottomRightRadius:40,

    },

    headerWrapper:{
flexDirection:"row",
justifyContent:"space-between",
padding:20,
paddingBottom:50
},
headerImage:{
    height:50,
    width:50,
    borderRadius:50,
    borderWidth:2,
},
headerDetails:{
    flexDirection:"row",
},
mapIconWrapper:{
    alignItems:"center"
},
mapIcon :{
    color:"#346473",
    marginRight:10
},
headerTitle:{
    color:"#fff",
    fontFamily:"Montserrat-Semibold",
},
headerSubtitle:{
    color:"#fff",
    fontFamily:"Mon",
    fontSize:16,
    textDecorationLine:"underline"
},
search:{
marginHorizontal:20,
backgroundColor:"#fff",
borderRadius:20,
padding:15,
marginTop:-25,
shadowColor:"#000",
shadowOffset:{
    height:3,
    width:0
},
shadowRadius:3,
shadowRadius:4,
shadowOpacity:0.1,

},
searchWrapper:{
flexDirection:"row"
},
searchIcon:{
    color:"#b0b0b0",
    marginRight:10
},
searchInput:{
    color:"#b4b4b4",
    fontFamily:"Montserrat-Medium",
},
highlightWrapper:{
marginTop:20
},

highlight:{
marginLeft:20,
marginRight:10,
paddingLeft:20,
borderRadius:20,
paddingBottom:20
},
highlightItem:{
flexDirection:"row",
alignItems:"flex-end",
marginBottom:10
},
chipsContainer:{
backgroundColor:"#ff6a14",
paddingHorizontal:20,
paddingVertical:10,
borderRadius:20
},
chips:{
color:"#fff",
textTransform:"uppercase",
fontFamily:"Montserrat-Bold",
fontSize:12
}
,
highlightImage:{
height:100,
width:100
},
highlightTitle:{
fontFamily:"Montserrat-Bold",
fontSize:16,
textTransform:"uppercase",
color:"#fff",
marginBottom:5
},
highlightSubtitle:{
fontFamily:"Montserrat-Bold",
fontSize:12,
color:"#fff"
},
categoryWrapper:{
paddingHorizontal:20,
marginTop:40,
flex:1
},
category:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"flex-end"
},
categoryTitle:{
fontFamily:"Montserrat-SemiBold",
color:"#00312d",
fontSize:18
},
categorySubTitle:{
fontFamily:"Montserrat-Regular",
color:"#4f7985",
textDecorationLine:"underline"
},
footerIcon:{
    color:"#6d8f9a"
}


    });


    const Highlight = ({item}) => {
console.log(item);        
        return (
        <View style={[style.highlight,{backgroundColor:item.backgroundColor}]}>
            <View style={style.highlightItem}>
                <View style={style.chipsContainer}>
                    <Text style={style.chips}>{item.chips}</Text>
                </View>
                <Image source={item.image} style={style.highlightImage} />
            </View>
            <View>
                <Text style={style.highlightTitle}>{item.title}</Text>
                <Text style={style.highlightSubtitle}>{item.subtitle}</Text>
            </View>
        </View>
            )
    }
    return (
    <View style={style.container}>
        <SafeAreaView style={style.header}>
            <View style={style.headerWrapper}>
                <View style={style.headerDetails}>
                            <View style={style.mapIconWrapper}>
                                <Icon style={style.mapIcon} size={25} name="map-pin"></Icon>
                            </View>
                        <View>
                            <Text style={style.headerTitle}>Delivery to</Text>
                            <Text style={style.headerSubtitle}>63, St, Clira, NYC</Text>
                        </View>
                </View>
                <View>
                    <Image 
                    source={require("../Assets/person.jpg")}
                     style={style.headerImage}
                      />
                </View>
                </View>
        </SafeAreaView>
    <View style={style.search}>
        <View style={style.searchWrapper}>
            <Icon name="search" size={20} style={style.searchIcon} />
            <TextInput 
            placeholder="Search for anything"
            />
        </View>

        </View>

<View style={style.highlightWrapper}>
    
    <FlatList           
        data={highlights}
        renderItem={Highlight}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
/>

    </View>
<View style={style.categoryWrapper}>
    <View style={style.category}>
        <View>
            <Text style={style.categoryTitle}>Shop by category</Text>
        </View>
        <View>
        <Text style={style.categorySubTitle}>See all</Text>
        </View>
    </View>
<ScrollView 
style={{marginTop:10}}
>
{
    categories.map((chunk,i)=>{
        return (
            <TouchableOpacity
            onPress={()=>navigation.navigate("Details")}
            key={i} style={{
flexDirection:"row",
justifyContent:"center",
marginTop:10
}}>

            {chunk.map((category)=>
   {

    return(
        <View key={category.id} style={{
            width:width/3-30,
            marginHorizontal:10,
            justifyContent:"center",
            marginBottom:20

        }}>
            <View
            style={{
                position:"absolute",
                top:0,
                backgroundColor:"#def6e6",
                width:width/3-30,
                height:width/3-60
            }}
            />
            <View>
                <Image 
                style={{
                    width:width/3-30,
                    height:width/3-30
                }}
                source={category.image} />
                <Text
                style={{
                    textAlign:"center",
                    fontFamily:"Montserrat-Regular"
                }}
                >{category.title}</Text>
            </View>
        </View>
    )
   }         
                   
            )
            }
            </TouchableOpacity>
            
        )
    })
}
</ScrollView>
</View>
<View style={{
    position:"absolute",
    width,
    bottom:0,
    paddingBottom:60,
    paddingTop:20,
    paddingHorizontal:20,
    backgroundColor:"#fff",
    shadowColor:"#000",
    shadowOffset:{
        height:-2,
        width:0
    },
    shadowRadius:10,
    shadowOpacity:0.5
}}>
    <View
    style={{
        flexDirection:"row",
        paddingHorizontal:20,
        justifyContent:"space-around"
    }}
    >
        <View>
            <Icon name="home" size={24} style={style.footerIcon} />
        </View>
        <View>
            <Icon name="grid" size={24} style={style.footerIcon} />
        </View><View>
            <Icon name="percent" size={24} style={style.footerIcon} />
        </View><View>
            <Icon name="shopping-bag" size={24} style={style.footerIcon} />
        </View><View>
            <Icon name="more-horizontal" size={24} style={style.footerIcon} />
        </View>
    </View>
</View>


</View>
        
    )
}
