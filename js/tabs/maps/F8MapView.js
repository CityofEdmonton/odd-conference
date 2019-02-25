/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 */
"use strict";

import React from "react";
import { connect } from "react-redux";
import StyleSheet from "../../common/F8StyleSheet";
import { Dimensions, View } from "react-native";
import F8Colors from "../../common/F8Colors";
import F8Button from "../../common/F8Button";
import ListContainer from "../../common/ListContainer";
import MapView from "../../common/MapView";
import ActionsOverlay from "../../common/ActionsOverlay";
import { Heading3 } from "../../common/F8Text";

// static height calculations
import F8Header from "../../common/F8Header";

const HEADER_HEIGHT = F8Header.height,
  WINDOW_WIDTH = Dimensions.get("window").width,
  WINDOW_HEIGHT = Dimensions.get("window").height,
  CONTROLS_HEIGHT = 90,
  MAP_HEIGHT = WINDOW_HEIGHT - HEADER_HEIGHT;

class F8MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: props.map1,
      width: WINDOW_WIDTH,
      height: MAP_HEIGHT
    };
  }

  render() {
    const { map } = this.state;
    const { map1, map2 } = this.props;

    const emptyContent = (
      <ListContainer
        title="Map"
        headerTitleColor={F8Colors.white}
        style={styles.emptyContainer}
      >
        <View style={styles.emptyContainer}>
          <View style={styles.content}>
            <Heading3 style={styles.title}>No maps to display</Heading3>
          </View>
          <F8Button
            style={{ position: "absolute", right: 15, bottom: 15 }}
            theme="blue"
            type="round"
            icon={require("../../common/img/buttons/icon-x.png")}
            onPress={_ => this.props.navigator && this.props.navigator.pop()}
          />
        </View>
      </ListContainer>
    )

    if (map) {
      return (
        <ListContainer title="Map">
          <View style={styles.container}>
            <MapView
              width={WINDOW_WIDTH}
              height={MAP_HEIGHT}
              zoomable={true}
              map={map}
            />
            <ActionsOverlay
              gradientColors={[
                F8Colors.colorWithAlpha("bianca", 0),
                F8Colors.bianca
              ]}
              style={styles.nav}
              buttonContainerStyles={styles.navBtnContainer}
            >
              <F8Button
                theme={map.name === map1.name ? "maps" : "mapsInactive"}
                type="small"
                caption={map1.name}
                onPress={_ => this.switchMap(map1.name)}
              />
              <F8Button
                theme={map.name === map2.name ? "maps" : "mapsInactive"}
                type="small"
                caption={map2.name}
                onPress={_ => this.switchMap(map2.name)}
              />
              <F8Button
                style={{ position: "absolute", right: 14, top: 0 }}
                theme="blue"
                type="round"
                icon={require("../../common/img/buttons/icon-x.png")}
                onPress={_ => this.props.navigator && this.props.navigator.pop()}
              />
            </ActionsOverlay>
          </View>
        </ListContainer>
      );
    } else {
      return (
        emptyContent
      );
    }

  }

  switchMap(mapName) {
    const { map1, map2 } = this.props;
    const { map } = this.state;
    if (mapName === map1.name && map.name !== map1.name) {
      this.setState({ map: map1 });
    } else if (mapName === map2.name && map.name !== map2.name) {
      this.setState({ map: map2 });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nav: {
    position: "absolute",
    height: CONTROLS_HEIGHT,
    left: 0,
    bottom: 0,
    right: 0
  },
  navBtnContainer: {
    height: 64,
    alignSelf: "stretch",
    paddingTop: 8,
    paddingLeft: 14,
    paddingRight: 52 + 14,
    justifyContent: "center"
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: F8Colors.bianca
  },
  content: {
    paddingVertical: 220,
    alignItems: "center"
  },
  title: {
    color: F8Colors.blue,
    textAlign: "center",
  }
});

function select(store) {
  return {
    map1: store.maps.find(map => map.name === "2nd Floor"),
    map2: store.maps.find(map => map.name === "4th Floor")
  };
}

module.exports = connect(select)(F8MapView);
