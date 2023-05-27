/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {Formik, useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as yup from 'yup';
import {constants} from './data/zip-codes';
// import {useOrientation} from '@/hooks/use-orientation';
import {sizeHeight, sizeWidth} from './config/size';
import ErrorText from './components/ErrorText';
import {COLORS_PALETTE, FONT_FAMILY} from './config/app-style';
import {RadioButton} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import {formatNumber} from './helper/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decode as atob, encode as btoa} from 'base-64';

function App({navigation, route}) {
  const [labelColor, setLabelColor] = useState(COLORS_PALETTE.ALICEBLUE);
  const [formValues, setFormValues] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDataPressed, setShowDataPressed] = useState(false);
  const [showDataCount, setShowDataCount] = useState(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [contactZip, setContactZip] = useState('');
  const [contactCity, setContactCity] = useState('');
  const [contactState, setContactState] = useState('');
  const [dobDate, setDobDate] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');
  // const [contactGender, setContactGender] = useState('');

  const delay = ms => new Promise(res => setTimeout(res, ms));
  const handleDataSubmit = async (values, resetForm) => {
    await delay(2000);
    setContactName(values?.name);
    setContactEmail(values?.email);
    setContactMobile(values?.mobilePhone);
    setContactZip(values?.zipCode);
    setContactCity(values?.city);
    setContactState(values?.state);
    setDobDate(values?.dd);
    setDobMonth(values?.mm);
    setDobYear(values?.yyyy);
    // setContactGender(checked);
    setFormValues(savedValues);

    // await formValues && setSubmitDisabled(true);
    setIsSubmitted(true);
    storeData(values);
    // console.log(formValues);
    // console.log(submitDisabled);
    // formValues && setSubmitDisabled(true);
    // if (formValues) {
    //   resetForm();
    // }
  };

  const geoCode = constants?.zipcode_data;
  const [checked, setChecked] = React.useState('male');
  const data = ['BLUEVIOLET', 'BLUE', 'AQUA', 'AQUAMARINE', 'ALICEBLUE'];
  const colours = [
    COLORS_PALETTE.BLUEVIOLET,
    COLORS_PALETTE.BLUE,
    COLORS_PALETTE.AQUA,
    COLORS_PALETTE.AQUAMARINE,
    COLORS_PALETTE.ALICEBLUE,
  ];

  const formik = useFormik({
    initialValues: {
      name: formValues ? formValues.name : '',
      email: formValues ? formValues.email : '',
      mobilePhone: formValues ? formValues.mobilePhone : '',
      zipCode: formValues ? formValues.zipCode : '',
      city: formValues ? formValues.city : '',
      state: formValues ? formValues.state : '',
      dd: formValues ? formValues.dd : '',
      mm: formValues ? formValues.mm : '',
      yyyy: formValues ? formValues.yyyy : '',
      gender: checked ? checked : '',
    },
  });

  const savedValues = {
    name: contactName,
    email: contactEmail,
    mobilePhone: contactMobile,
    zipCode: contactZip,
    city: contactCity,
    state: contactState,
    dd: dobDate,
    mm: dobMonth,
    yyyy: dobYear,
    gender: checked,
  };

  const autoPickZipCode = text => {
    for (var i = 0; i < geoCode.length; i++) {
      if (text?.length === 3 && geoCode[i].zipcode?.startsWith(text)) {
        return geoCode[i].zipcode;
      }
    }
  };
  const autoPickCity = text => {
    for (var i = 0; i < geoCode.length; i++) {
      if (text?.length === 3 && geoCode[i].zipcode?.startsWith(text)) {
        return geoCode[i].city;
      }
    }
  };
  const autoPickState = text => {
    for (var i = 0; i < geoCode.length; i++) {
      if (text?.length === 3 && geoCode[i].zipcode?.startsWith(text)) {
        return geoCode[i].state;
      }
    }
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      const encodedData = btoa(jsonValue);
      await AsyncStorage.setItem('@storage_Key', encodedData);
      console.log(jsonValue);
      setFormValues(savedValues);
      console.log(encodedData);
      alert('Form submitted successfully!');
    } catch (e) {
      console.log('store error', e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        console.log('value', value);
        var decodedData = JSON.parse(atob(value));
        console.log('decodedData ', decodedData);
        console.log('decodedData Name', decodedData.name);
        setFormValues(decodedData);
        console.log(formValues);
        console.log('formValues ', formValues);
        return value;
      }
    } catch (e) {
      console.log('get error', e);
    }
  };

  // var dateObj = new Date();
  // var month = dateObj.getUTCMonth() + 1; //months from 1-12
  // var day = dateObj.getUTCDate();
  // var year = dateObj.getUTCFullYear();

  // const validateDate = (dd, mm, yy) => {
  //   if (yy === year) {
  //     if (mm === month) {
  //       if (dd <= day) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     } else if (mm < month) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else if (yy < year) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const validationSchema = yup.object().shape({
    name: yup
      ?.string()
      ?.nullable()
      ?.matches(/^([A-Z ']*)$/, 'Please enter valid name')
      ?.required('Name is required')
      ?.label('Name is required'),
    email: yup
      ?.string()
      ?.nullable()
      ?.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter valid email')
      ?.required('Email is required')
      ?.label('Email is required'),
    mobilePhone: yup
      ?.string()
      ?.nullable()
      ?.required('Phone Number is required')
      ?.min(10)
      ?.max(10)
      ?.label('Phone Number is required'),
    dd: yup
      ?.string()
      ?.nullable()
      ?.matches(/^(0?[1-9]|[12][0-9]|3[01])$/, 'Please enter a valid date')
      ?.required('Date is required')
      ?.min(2)
      ?.max(2)
      ?.label('Date is required'),
    mm: yup
      ?.string()
      ?.nullable()
      ?.matches(/^(0?[1-9]|1[012])$/, 'Please enter a valid month')
      ?.min(2)
      ?.max(2)
      ?.required('Month is required')
      ?.label('Month is required'),
    yyyy: yup
      ?.string()
      ?.nullable()
      ?.matches(/^[12][0-9]{3}$/, 'Please enter a valid year')
      ?.min(4)
      ?.max(4)
      ?.required('Year is required')
      ?.label('Year is required'),
    // gender: yup
    //   ?.object()
    //   ?.required()
    //   ?.oneOf(['male', 'female'], 'Selecting the gender is required'),
    zipCode: yup
      ?.string()
      ?.nullable()
      ?.matches(/^[1-9][0-9]{5}$/, 'Please enter a valid zip code')
      ?.required('Please enter a valid zip code')
      ?.min(6)
      ?.max(6)
      ?.label('Please enter a valid zip code'),
    // city: yup?.string()?.nullable(),
    // state: yup?.string()?.nullable(),
  });
  /*
   * Update user's profile with the key and value
   */
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: COLORS_PALETTE.BLACK,
          paddingBottom: sizeHeight(1),
        }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}> Contact Form </Text>
        </View>
        <View style={styles.dropdownContainer}>
          <Text
            style={{
              color: COLORS_PALETTE.ALICEBLUE,
              marginBottom: sizeHeight(1),
            }}>
            Customize Field Label
          </Text>
          <SelectDropdown
            data={data}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setLabelColor(colours[index]);
            }}
          />
        </View>
        <View style={styles.formcontainer}>
          <Formik
            validationSchema={validationSchema}
            initialValues={formik?.values}
            onSubmit={(values, {resetForm}) =>
              handleDataSubmit(values, resetForm)
            }>
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              isValid,
              dirty,
              touched,
              isSubmitting,
              resetForm,
              setFieldValue,
            }) => (
              <>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <View style={styles.fieldContainer}>
                    <Text style={{color: labelColor, fontWeight: 'bold'}}>
                      {'NAME'}
                    </Text>
                    <TextInput
                      placeholder="Enter Full Name"
                      placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                      style={styles.textInputContainer}
                      onChangeText={text => setFieldValue('name', text)}
                      name="name"
                      onBlur={handleBlur('name')}
                      value={values?.name}
                      touched={touched?.name}
                      editable={!isSubmitted}
                      keyboardType="default"
                      autoCapitalize="characters"
                    />
                    <ErrorText
                      touched={touched?.name}
                      error={errors?.name}
                      text={errors?.name}
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <Text style={{color: labelColor, fontWeight: 'bold'}}>
                      {'EMAIL'}
                    </Text>
                    <TextInput
                      placeholder="abc@email.com"
                      placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                      style={styles.textInputContainer}
                      onChangeText={text => setFieldValue('email', text)}
                      name="email"
                      onBlur={handleBlur('email')}
                      value={values?.email}
                      touched={touched?.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      editable={!isSubmitted}
                    />
                    <ErrorText
                      touched={touched?.email}
                      error={errors?.email}
                      text={errors?.email}
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <Text style={{color: labelColor, fontWeight: 'bold'}}>
                      {'MOBILE PHONE'}
                    </Text>
                    <TextInput
                      placeholder="89XX-XXXX64"
                      placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                      style={styles.textInputContainer}
                      onChangeText={text => setFieldValue('mobilePhone', text)}
                      name="mobilePhone"
                      onBlur={handleBlur('mobilePhone')}
                      value={formatNumber(values?.mobilePhone)}
                      touched={touched?.mobilePhone}
                      maxLength={11}
                      keyboardType="number-pad"
                      editable={!isSubmitted}
                    />
                    <ErrorText
                      touched={touched?.mobilePhone}
                      error={errors?.mobilePhone}
                      text={errors?.mobilePhone}
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <Text style={{color: labelColor, fontWeight: 'bold'}}>
                      {'DOB'}
                    </Text>
                    <View
                      style={[
                        {flexDirection: 'row', alignItems: 'center'},
                        styles.textInputContainer,
                      ]}>
                      <TextInput
                        placeholder={'dd'}
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                        style={{
                          minWidth: sizeHeight(2),
                          height: sizeHeight(6),
                          color: COLORS_PALETTE.BLACK,
                        }}
                        onChangeText={text => setFieldValue('dd', text)}
                        name="dd"
                        onBlur={handleBlur('dd')}
                        value={values?.dd}
                        touched={touched?.dd}
                        keyboardType="numeric"
                        maxLength={2}
                        editable={!isSubmitted}
                      />
                      <Text style={styles.dateSeperator}>-</Text>
                      <TextInput
                        placeholder={'mm'}
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                        style={{
                          minWidth: sizeHeight(1),
                          height: sizeHeight(6),
                          color: COLORS_PALETTE.BLACK,
                        }}
                        onChangeText={text => setFieldValue('mm', text)}
                        name="mm"
                        onBlur={handleBlur('mm')}
                        value={values?.mm}
                        touched={touched?.mm}
                        keyboardType="numeric"
                        maxLength={2}
                        editable={!isSubmitted}
                      />
                      <Text style={styles.dateSeperator}>-</Text>
                      <TextInput
                        placeholder={'yyyy'}
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                        style={{
                          minWidth: sizeHeight(5),
                          height: sizeHeight(6),
                          color: COLORS_PALETTE.BLACK,
                        }}
                        onChangeText={text => setFieldValue('yyyy', text)}
                        name="yyyy"
                        onBlur={handleBlur('yyyy')}
                        value={values?.yyyy}
                        touched={touched?.yyyy}
                        keyboardType="numeric"
                        maxLength={4}
                        editable={!isSubmitted}
                      />
                    </View>
                    <ErrorText
                      touched={touched?.yyyy || touched?.mm || touched?.dd}
                      error={
                        errors?.dd
                          ? errors?.dd
                          : errors?.mm
                          ? errors?.mm
                          : errors?.yyyy
                      }
                      text={
                        errors?.dd
                          ? errors?.dd
                          : errors?.mm
                          ? errors?.mm
                          : errors?.yyyy
                      }
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <Text style={{color: labelColor, fontWeight: 'bold'}}>
                      {'GENDER'}
                    </Text>
                    <View
                      style={[
                        {
                          flexDirection: 'row',
                          alignItems: 'center',
                        },
                        styles.textInputContainer,
                      ]}>
                      <RadioButton
                        value="male"
                        color={COLORS_PALETTE.BLUEVIOLET}
                        status={checked === 'male' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('male')} //when pressed, set the value of the checked Hook to 'Apple'
                        disabled={isSubmitted}
                      />
                      <Text
                        style={{
                          marginRight: sizeHeight(10),
                          color: COLORS_PALETTE.BLACK,
                        }}>
                        {' '}
                        Male
                      </Text>
                      <RadioButton
                        value="female"
                        status={checked === 'female' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('female')}
                        disabled={isSubmitted}
                      />
                      <Text
                        style={{
                          marginRight: sizeHeight(10),
                          color: COLORS_PALETTE.BLACK,
                        }}>
                        Female
                      </Text>
                    </View>
                  </View>
                  <View style={styles.fieldContainer}>
                    <Text style={{color: labelColor, fontWeight: 'bold'}}>
                      {'ZIP'}
                    </Text>
                    <TextInput
                      placeholder={'ZIP Code'}
                      placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                      style={styles.textInputContainer}
                      onChangeText={text => {
                        setFieldValue('zipCode', autoPickZipCode(text));
                        setFieldValue('city', autoPickCity(text));
                        setFieldValue('state', autoPickState(text));
                      }}
                      name="zipCode"
                      onBlur={handleBlur('zipCode')}
                      value={values?.zipCode}
                      touched={touched?.zipCode}
                      keyboardType="number-pad"
                      maxLength={6}
                      editable={!isSubmitted}
                    />
                    <ErrorText
                      touched={touched?.zipCode}
                      error={errors?.zipCode}
                      text={errors?.zipCode}
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <Text style={{color: labelColor, fontWeight: 'bold'}}>
                      {'CITY'}
                    </Text>
                    <TextInput
                      placeholder={'City'}
                      placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
                      style={[
                        styles.textInputContainer,
                        {backgroundColor: 'rgba(245,245,220,0.7)'},
                      ]}
                      editable={false}
                      name="city"
                      value={values?.city}
                    />
                  </View>
                  <View style={styles.fieldContainer}>
                    <Text style={{color: labelColor, fontWeight: 'bold'}}>
                      {'STATE'}
                    </Text>
                    <TextInput
                      placeholder={'State'}
                      placeholderTextColor={'rgba(0, 0, 0, 0.4)'}
                      style={[
                        styles.textInputContainer,
                        {backgroundColor: 'rgba(245,245,220,0.7)'},
                      ]}
                      editable={false}
                      name="state"
                      value={values?.state}
                    />
                  </View>
                </View>
                {/* {showDataPressed && formValues ? ( */}
                {showDataPressed && formValues && (
                  <View style={styles.showTextInputContainer}>
                    <Text style={{color: COLORS_PALETTE.BLACK}}>
                      {` COUNT: ${showDataCount} \n\nNAME : ${formValues?.name} \n\nEMAIL : ${formValues?.email} \n\nMOBILE PHONE : ${formValues?.mobilePhone} \n\nDOB : ${formValues.dd} - ${formValues.mm} - ${formValues.yyyy} \n\nGENDER : ${savedValues.gender} \n\nZIP : ${formValues.zipCode} \n\nCITY : ${formValues.city} \n\nSTATE : ${formValues.state}`}
                    </Text>
                  </View>
                )}
                {/* ) : null} */}
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          formValues === null
                            ? COLORS_PALETTE.AZURE
                            : COLORS_PALETTE.BLANCHEDAMOND,
                        borderColor: COLORS_PALETTE.BLACK,
                        borderRadius: 12,
                      },
                    ]}
                    disabled={formValues === null}
                    onPress={() => {
                      resetForm();
                      setFormValues(null);
                      setShowDataPressed(false);
                      setIsSubmitted(false);
                      setChecked('male');
                      console.log(formValues);
                    }}>
                    <Text style={{color: COLORS_PALETTE.BLACK}}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        flexDirection: 'row',
                        backgroundColor:
                          !isValid ||
                          !dirty ||
                          isSubmitting ||
                          (formValues && true)
                            ? COLORS_PALETTE.AZURE
                            : COLORS_PALETTE.BLANCHEDAMOND,
                        borderRadius: 12,
                      },
                    ]}
                    disabled={
                      !isValid || !dirty || isSubmitting || formValues !== null
                    }
                    onPress={() => {
                      handleSubmit();
                    }}>
                    <Text style={{color: COLORS_PALETTE.BLACK}}>Submit</Text>
                    {isSubmitting && <ActivityIndicator />}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor:
                          formValues === null
                            ? COLORS_PALETTE.AZURE
                            : COLORS_PALETTE.BLANCHEDAMOND,
                        borderColor: COLORS_PALETTE.BLACK,
                        borderRadius: 12,
                      },
                    ]}
                    disabled={formValues === null}
                    onPress={() => {
                      // setFormValues(savedValues);
                      getData();
                      setShowDataPressed(true);
                      setShowDataCount(showDataCount + 1);
                    }}>
                    <Text style={{color: COLORS_PALETTE.BLACK}}>Show Data</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS_PALETTE.BISQUE,
  },
  headerText: {
    flex: 1,
    paddingVertical: sizeHeight(3),
    paddingHorizontal: sizeHeight(4),
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.APP_FONT_FAMILY,
    color: COLORS_PALETTE.BLACK,
    fontWeight: 'bold',
  },
  formcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    marginTop: '10%',
  },
  fieldContainer: {
    flex: 1,
    width: '100%',
    paddingVertical: sizeHeight(1),
    paddingHorizontal: sizeHeight(1),
  },
  dropdownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: sizeHeight(1),
    marginVertical: sizeHeight(1),
  },
  textInputContainer: {
    backgroundColor: COLORS_PALETTE.BEIGE,
    color: COLORS_PALETTE.BLACK,
    width: '100%',
    height: sizeHeight(6),
    alignSelf: 'center',
    paddingHorizontal: sizeHeight(2),
    borderRadius: 10,
  },
  showTextInputContainer: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: COLORS_PALETTE.ANTIQUEWHITE,
    width: '95%',
    minHeight: sizeHeight(6),
    alignSelf: 'center',
    paddingHorizontal: sizeHeight(2),
    paddingVertical: sizeHeight(2),
    borderRadius: 10,
  },
  dateSeperator: {
    fontWeight: '400',
    paddingBottom: sizeHeight(0.5),
    color: COLORS_PALETTE.BLACK,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: sizeHeight(1),
    marginVertical: sizeHeight(1),
    paddingVertical: sizeHeight(2),
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: sizeWidth(25),
    height: sizeHeight(4),
    textAlign: 'center',
  },
});

export default App;
