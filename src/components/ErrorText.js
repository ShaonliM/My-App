/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {Icon} from 'react-native-elements';

import {COLORS_PALETTE, DEVICE_CONSTANTS} from '../config/app-style';
import {sizeFont} from '../config/size';

function ErrorText({text, error, touched, padding, containerStyle}) {
  if (!error || !touched) {
    return null;
  }
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignSelf: 'flex-start',
          justifyContent: 'center',
          paddingVertical: 1,
          paddingLeft: padding
            ? (DEVICE_CONSTANTS.windowWidth -
                DEVICE_CONSTANTS.windowWidth * 0.83) /
              2
            : 0,
        },
        containerStyle,
      ]}>
      {/* <Icon
        name="alert-circle"
        type="material-community"
        color={COLORS_PALETTE.BROWN}
        size={16}
        style={{alignSelf: 'center'}}
      /> */}
      <Text style={styles.textStyle}>* {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: COLORS_PALETTE.BROWN,
    fontSize: sizeFont(3.1),
    alignSelf: 'center',
    marginLeft: '1%',
    marginTop: '2%',
  },
});
export default ErrorText;
