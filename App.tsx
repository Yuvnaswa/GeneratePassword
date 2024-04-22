import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";

//Form Validatin
import * as Yup from 'yup';
import { Formik } from 'formik';

const PasswordShema=Yup.object().shape({
  passwordLength:Yup.number().min(4,'Should be minimum of 4 charecters')
  .max(16,'Should be max of 16 charecters').required('Length is required')
})

export default function App() {

  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = (passwordLength:number) => {
    let charecterList = '';

    const upperCaseCharts='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseCharts='abcdefghijklmnopqrstuvwxyz';
    const digitCharts='0123456789';
    const specialChars='!@#$%^&*()_+';

    if(lowerCase){
      charecterList += lowerCaseCharts;
    }
    if(upperCase){
      charecterList += upperCaseCharts;
    }
    if(numbers){
      charecterList += digitCharts;
    }
    if(symbols){
      charecterList+= specialChars;
    }

    const passwordResult = createPassword(charecterList,passwordLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  }

  const createPassword = (charecters:string, passwordLength:number) => {
    let result='';
    for(let i=0; i<passwordLength;i++){
      const charecterIndex= Math.round(Math.random() * charecters.length);
      result += charecters.charAt(charecterIndex);
    }
    return result;
  }

  const resetPassword = () =>{
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false); 
    setNumbers(false);
    setSymbols(false);
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ passwordLength:'' }}
       validationSchema={PasswordShema}
      onSubmit={values => {
        console.log(values);
        generatePassword(Number(values.passwordLength))}}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
           
          </View>
          <TextInput
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            keyboardType='numeric'
            />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase</Text>
          <BouncyCheckbox 
          isChecked={lowerCase} onPress={() => setLowerCase(!lowerCase)}
          fillColor='#27ae60'
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include upercase</Text>
          <BouncyCheckbox
          isChecked={upperCase} onPress={() => setUpperCase(!upperCase)}
          fillColor='#f1c40f'
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include numbers</Text>
          <BouncyCheckbox
          isChecked={numbers} onPress={() => setNumbers(!numbers)}
          fillColor='#8e44ad'
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include special charecters</Text>
          <BouncyCheckbox
          isChecked={symbols} onPress={() => setSymbols(!symbols)}
          fillColor='#c0392b'
          />
         </View>

         <View style={styles.formActions}>
          <TouchableOpacity
          disabled={!isValid}
          style={styles.primaryBtn} onPress={() => handleSubmit()}
          >
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() =>{
            handleReset();
            resetPassword();
          }}
          >
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
         </View>
         </>
       )}
          </Formik>
        </View>
       {isPassGenerated ? (
        <View style={[styles.card, styles.cardElevated]}>
          <Text style={styles.subTitle}>Result:</Text>
          <Text style={styles.description}>Long Press to copy</Text>
          <Text style={styles.generatedPassword}  selectable={true}>{password}</Text>
        </View>
       ):null}

      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#34495e',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#bdc3c7',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});