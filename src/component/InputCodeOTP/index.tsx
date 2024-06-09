import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import globalStyle from '../../constants/styles';

type InputOTPProps = {
  valueCode: Array<string>;
  onChange(value: Array<string>): void;
};

const InputCodeOTP = (props: InputOTPProps) => {
  const {valueCode, onChange} = props;
  const inputRefs = useRef<Array<TextInput>>([]);
  const handleChange = (value: string, index: number) => {
    valueCode[index] = value;
    onChangeValue(value, index);
    if (value.length !== 0) {
      return inputRefs?.current[index + 1]?.focus();
    }
    return inputRefs?.current[index - 1]?.focus();
  };

  const handleBackspace = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    const {nativeEvent} = event;
    if (nativeEvent.key === 'Backspace') {
      handleChange('', index);
    }
  };

  const onChangeValue = (code: string, index: number) => {
    const newValue = valueCode.map((item, valueIndex) => {
      if (valueIndex === index) {
        return code;
      }
      return item;
    });

    onChange(newValue);
  };
  return (
    <View style={styles.container}>
      {[...new Array(4)].map((_, index) => (
        <TextInput
          ref={ref => {
            if (ref && !inputRefs.current.includes(ref)) {
              inputRefs.current = [...inputRefs.current, ref];
            }
          }}
          key={index}
          style={[globalStyle.fontText, styles.inputOTP]}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          onChangeText={value => handleChange(value, index)}
          onKeyPress={event => handleBackspace(event, index)}
        />
      ))}
    </View>
  );
};

export default InputCodeOTP;
