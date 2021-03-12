import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Text,
  View,
  Touchable,
  TouchableOpacityBase,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackBase,
  useWindowDimensions,
} from "react-native";
import Carousel from "../Components/Carousel";
import FloatingNavigator from "../Components/FloatingNavigator";
import SortSelector from "../Components/SortSelector";
import PostsList from "../Components/PostsList";
import { getPosts, useLike } from "../Hooks/Api";
import { timeSince } from "../utils/relativetime";
import PopupInput from "../Components/PopupInput";
import { Pressable } from "react-native";

const Home = ({ navigation, route }) => {
  const [width, setWidth] = useState(useWindowDimensions().width);
  const height = useWindowDimensions().height;

  const tag = route.params == undefined ? undefined : route.params.tag;
  const user_id = route.params == undefined ? undefined : route.params.user_id;

  const banner = {
    width: width,
    height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [posts, setPosts] = useState();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPosts(user_id, tag).then((out) => {
        out.sort(
          (a, b) =>
            timeSince(new Date(a.time_added)) >
            timeSince(new Date(b.time_added))
        );
        setPosts(out);
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  const setTag = (tag) => {
    getPosts(undefined, tag).then((out) => {
      out.sort(
        (a, b) =>
          timeSince(new Date(a.time_added)) > timeSince(new Date(b.time_added))
      );
      setPosts(out);
    });
  };

  return (
    <>
      <PostsList
        ListHeaderComponent={
          <>
            {user_id == undefined ? (
              <>
                <Carousel onContentSizeChangeInterval={(w) => setWidth(w)}>
                  <Pressable onPress={(e) => setTag(undefined)}>
                    <View style={{ ...banner, backgroundColor: '#d9baba' }}>
                      <Text style={{ fontSize: 50 }}>Handicraft</Text>
                    </View>
                  </Pressable>
                  <Pressable onPress={(e) => setTag('art')}>
                    <View style={{ ...banner, backgroundColor: '#d9baba' }}>
                      <Text style={{ fontSize: 50 }}>Art</Text>
                    </View>
                  </Pressable>
                  <Pressable onPress={(e) => setTag('textiles')}>
                    <View style={{ ...banner, backgroundColor: '#d9baba' }}>
                      <Text style={{ fontSize: 50 }}>Textiles</Text>
                    </View>
                  </Pressable>
                  <Pressable onPress={(e) => setTag('electronics')}>
                    <View style={{ ...banner, backgroundColor: '#d9baba' }}>
                      <Text style={{ fontSize: 50 }}>Electronics</Text>
                    </View>
                  </Pressable>
                  <Pressable onPress={(e) => setTag('crafts')}>
                    <View style={{ ...banner, backgroundColor: '#d9baba' }}>
                      <Text style={{ fontSize: 50 }}>Crafts</Text>
                    </View>
                  </Pressable>
                  <Pressable onPress={(e) => setTag('food and drink')}>
                    <View style={{ ...banner, backgroundColor: '#d9baba' }}>
                      <Text style={{ fontSize: 50 }}>Food and Drink</Text>
                    </View>
                  </Pressable>
                  <PopupInput onPress={[() => {}, (text) => setTag(text)]}>
                    <View style={{ ...banner, backgroundColor: '#d9baba' }}>
                      <Text style={{ fontSize: 50 }}>Other</Text>
                    </View>
                  </PopupInput>
                </Carousel>
              </>
            ) : (
              <></>
            )}
            {/* Sort List */}
            <SortSelector
              onPress={[
                () => {
                  let newlist = posts.slice();
                  newlist.sort(
                    (a, b) => new Date(a.time_added) < new Date(b.time_added)
                  );
                  setPosts(newlist);
                },
                () => {
                  let newlist = posts.slice();
                  newlist.sort(
                    (a, b) =>
                      timeSince(new Date(a.time_added)) > 604800 ||
                      timeSince(new Date(b.time_added)) < 604800 ||
                      (timeSince(new Date(a.time_added)) < 604800 &&
                        timeSince(new Date(b.time_added)) < 604800 &&
                        a.likes.length < b.likes.length)
                  );
                  setPosts(newlist);
                },
                () => {
                  let newlist = posts.slice();
                  newlist.sort((a, b) => a.likes.length < b.likes.length);
                  setPosts(newlist);
                },
              ]}
            />
          </>
        }
        items={posts}
        style={{ height: height, margin: 0 }}
        navigation={navigation}
      />
      <FloatingNavigator
        back={user_id != undefined}
        onPress={[
          () =>
            user_id != undefined && posts != undefined && navigation.goBack(),
          () => console.log('home'),
          () => navigation.navigate('Profile'),
          () => navigation.navigate('Upload'),
        ]}
      />
    </>
  );
};

export default Home;
