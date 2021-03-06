import 'package:flutter/material.dart';
import 'package:mobile_traffic/models/signup_request_model.dart';
import 'package:mobile_traffic/screens/common_components/Button.dart';
import 'package:mobile_traffic/screens/common_components/header_text.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'package:mobile_traffic/screens/driver/driver_home.dart';
import 'package:get/get.dart';
import 'package:mobile_traffic/services/api_service.dart';

class Signup extends StatefulWidget {
  const Signup({Key? key}) : super(key: key);
  // final _formKey = GlobalKey<FormState>();
  @override
  State<Signup> createState() => _SignupState();
}

class _SignupState extends State<Signup> {
  bool isApiCallProcess = false;
  bool hidePassword = true;
  static final GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  final first_nameController = TextEditingController();
  final last_nameController = TextEditingController();
  final emailController = TextEditingController();
  final phone_numberController = TextEditingController();
  final passwordController = TextEditingController();
  final confirm_passwordController = TextEditingController();
  final addressController = TextEditingController();

  RegisterRequestModel? signupModel;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Stack(children: [
            Container(
              width: double.infinity,
              height: double.infinity,
              child: Image.asset(
                "assets/world_map.png",
                fit: BoxFit.fill,
              ),
            ),
            Container(
              decoration: BoxDecoration(
                  gradient: LinearGradient(
                      begin: FractionalOffset.topCenter,
                      end: FractionalOffset.bottomCenter,
                      colors: [
                    Color.fromRGBO(72, 131, 246, 0.7),
                    Color.fromRGBO(0, 0, 0, 0.7)
                  ],
                      stops: [
                    0.0,
                    1.0
                  ])),
            ),
            Container(
              padding: EdgeInsets.all(20),
              child: Form(
                key: globalFormKey,
                child: ListView(
                  // crossAxisAlignment: CrossAxisAlignment.center,
                  // mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // The validator receives the text that the user has entered.
                    // SizedBox(height: 30,),
                    // Container(padding: EdgeInsets.fromLTRB(20, 30, 0, 0),child: Text("sign up",style: TextStyle(fontSize: 36,color: Colors.white),)),

                    Container(
                        padding: EdgeInsets.all(10),
                        alignment: Alignment.center,
                        child: HeaderText('Signup')),

                    TextFormField(
                      controller: first_nameController,
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                          border: UnderlineInputBorder(),
                          labelText: "First name",
                          labelStyle: TextStyle(color: Colors.white)),

                      // The validator receives the text that the user has entered.
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),

                    TextFormField(
                      controller: last_nameController,
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                          border: UnderlineInputBorder(),
                          labelText: "Last name",
                          labelStyle: TextStyle(color: Colors.white)),

                      // The validator receives the text that the user has entered.
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                    TextFormField(
                      controller: emailController,
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                          border: UnderlineInputBorder(),
                          labelText: "email",
                          labelStyle: TextStyle(color: Colors.white)),

                      // The validator receives the text that the user has entered.
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter email';
                        }
                        return null;
                      },
                    ),
                    TextFormField(
                      controller: phone_numberController,
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                          border: UnderlineInputBorder(),
                          labelText: "Phone number",
                          labelStyle: TextStyle(color: Colors.white)),
                      // The validator receives the text that the user has entered.
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter phone number';
                        }
                        return null;
                      },
                    ),
                    TextFormField(
                      controller: addressController,
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                          border: UnderlineInputBorder(),
                          labelText: "address",
                          labelStyle: TextStyle(color: Colors.white)),
                      // The validator receives the text that the user has entered.
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter address';
                        }
                        return null;
                      },
                    ),
                    TextFormField(
                      controller: passwordController,
                      obscureText: true,
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                          border: UnderlineInputBorder(),
                          labelText: "Password",
                          labelStyle: TextStyle(color: Colors.white)),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                    TextFormField(
                      controller: confirm_passwordController,
                      obscureText: true,
                      style: TextStyle(color: Colors.white),
                      decoration: InputDecoration(
                          border: UnderlineInputBorder(),
                          labelText: "confirm password",
                          labelStyle: TextStyle(color: Colors.white)),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please enter some text';
                        }
                        return null;
                      },
                    ),
                    SizedBox(
                      height: 10,
                    ),
                    Button('submit', () async{
                      
                      RegisterRequestModel model = RegisterRequestModel(
                          first_name: first_nameController.text,
                          last_name: last_nameController.text,
                          email: emailController.text,
                          phone_number: phone_numberController.text,
                          address: addressController.text,
                          password: passwordController.text);
                           Get.snackbar(
                                "Success", "Registered successfully!",
                                duration: Duration(seconds: 10),
                                snackPosition: SnackPosition.BOTTOM);

                      if(first_nameController.text==""||last_nameController.text==""||emailController.text==""||addressController.text==""||passwordController.text==""||phone_numberController.text==""){
                        Get.snackbar("error","all fields should be filled",
                              backgroundColor: Colors.red[200],
                              duration: Duration(seconds:3),
                              snackPosition: SnackPosition.TOP,
                              isDismissible: true,
                              snackStyle: SnackStyle.FLOATING);
                      }else{
                      print(passwordController.text);
                      // Get.to(DriverHome()),
                      try{
                         showDialog(
                                context: context,
                                builder: (BuildContext context) {
                                  return Center(child: CircularProgressIndicator(),);
                                });
                     await APIService.register(model);
                      }catch(err){
                         Get.snackbar("Network error", "try again",
                              // backgroundColor: Colors.redAccent[100],
                              duration: Duration(seconds:5),
                              snackPosition: SnackPosition.TOP,
                              );
                      }
                      }
                    }, Color.fromRGBO(0, 193, 31, 0.25)),
                    
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        GestureDetector(
                          onTap: () {},
                          child: Container(
                            padding: EdgeInsets.all(10),
                            child: Image.asset('assets/google_logo.png',
                                height: 31, width: 31),
                          ),
                        ),
                        SignInButton(
                          Buttons.Facebook,
                          onPressed: () {},
                          mini: true,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            )
          ]),
        ),
      ),
    );
  }
}
