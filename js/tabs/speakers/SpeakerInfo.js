"use strict";

import React from "react";
import { Platform, StatusBar } from "react-native";
import F8Header from "../../common/F8Header";
import StyleSheet from "../../common/F8StyleSheet";
import { connect } from "react-redux";

import F8Colors from "../../common/F8Colors";
import F8Fonts from "../../common/F8Fonts";

import { Text, View, Navigator, Image } from "react-native";

import type { Speaker } from "../../reducers/speaker";

type Props = {
  speaker: Speaker,
  navigator: Navigator
};

class SpeakerInfo extends React.Component {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  render() {
    const backItem = {
      title: "Back",
      layout: "icon",
      icon: require("../../common/img/header/back.png"),
      onPress: _ => this.props.navigator.pop()
    };

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" animated={true} />
        <F8Header
          backgroundColor={F8Colors.palatinateBlue}
          itemsColor={F8Colors.white}
          navItem={backItem}
          style={Platform.OS === "ios" ? { height: 70 } : {}}
        />
        <Text>{this.props.speaker.name}</Text>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: this.props.speaker.pic}}
        />
        <Text>{this.props.speaker.title}</Text>
        <Text>{this.props.speaker.bio}</Text>
        {/* <Text>{this.props.speaker.id}</Text> */}
      </View>
    );
  }

  componentDidMount() {
    // do something??
  }

  dismiss() {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: F8Colors.white
  },
  headerContent: {
    android: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-end",
      paddingBottom: 9
    },
    ios: {
      marginTop: -5,
      alignItems: "center"
      // justifyContent: 'center',
    }
  },
  title: {
    ios: {
      textAlign: "center"
    }
  },
  day: {
    color: F8Colors.yellow,
    fontFamily: F8Fonts.fontWithWeight(F8Fonts.basis, "helveticaBold"),
    fontSize: 13,

    android: {
      marginBottom: -4
    }
  },
  time: {
    color: F8Colors.white,
    fontFamily: F8Fonts.fontWithWeight("helvetica", "semibold"),
    fontSize: 15,

    ios: {
      marginVertical: 2
    },
    android: {
      marginBottom: 3
    }
  }
});

module.exports = connect()(SpeakerInfo);
