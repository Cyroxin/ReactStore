import React, { useEffect, useState } from "react";
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

  const banner = {
    width: width,
    height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const [posts, setPosts] = useState();
  useEffect(() => {
    getPosts(undefined, route.tag).then((out) => {
      out.sort(
        (a, b) =>
          timeSince(new Date(a.time_added)) > timeSince(new Date(b.time_added))
      );
      setPosts(out);
      console.log(out);
    });
  }, []);

  return (
    <>
      <PostsList
        ListHeaderComponent={
          <>
            <Carousel onContentSizeChangeInterval={(w) => setWidth(w)}>
              <Pressable
                onPress={(e) =>
                  getPosts(undefined, undefined).then((out) => setPosts(out))
                }
              >
                <View style={{ ...banner, backgroundColor: "#d9baba" }}>
                  <Text style={{ fontSize: 50 }}>Handicraft</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={(e) =>
                  getPosts(undefined, "art").then((out) => setPosts(out))
                }
              >
                <View style={{ ...banner, backgroundColor: "#d9baba" }}>
                  <Text style={{ fontSize: 50 }}>Art</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={(e) =>
                  getPosts(undefined, "textiles").then((out) => setPosts(out))
                }
              >
                <View style={{ ...banner, backgroundColor: "#d9baba" }}>
                  <Text style={{ fontSize: 50 }}>Textiles</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={(e) =>
                  getPosts(undefined, "electronics").then((out) =>
                    setPosts(out)
                  )
                }
              >
                <View style={{ ...banner, backgroundColor: "#d9baba" }}>
                  <Text style={{ fontSize: 50 }}>Electronics</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={(e) =>
                  getPosts(undefined, "crafts").then((out) => setPosts(out))
                }
              >
                <View style={{ ...banner, backgroundColor: "#d9baba" }}>
                  <Text style={{ fontSize: 50 }}>Crafts</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={(e) =>
                  getPosts(undefined, "food and drink").then((out) =>
                    setPosts(out)
                  )
                }
              >
                <View style={{ ...banner, backgroundColor: "#d9baba" }}>
                  <Text style={{ fontSize: 50 }}>Food and Drink</Text>
                </View>
              </Pressable>
              <PopupInput
                onPress={[
                  () => {},
                  (text) => {
                    getPosts(undefined, text).then((out) => setPosts(out));
                  },
                ]}
              >
                <View style={{ ...banner, backgroundColor: "#d9baba" }}>
                  <Text style={{ fontSize: 50 }}>Other</Text>
                </View>
              </PopupInput>
            </Carousel>
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
      />
      <FloatingNavigator
        onPress={[
          () => console.log("disabled by fabnav"),
          () => navigation.navigate("Profile"),
          () => navigation.navigate("Upload"),
          () => console.log("home"),
        ]}
      />
    </>
  );
};

export default Home;
