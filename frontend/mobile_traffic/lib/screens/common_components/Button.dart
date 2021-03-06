import 'package:flutter/material.dart';

class Button extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final Color buttonColor;
  Button(this.text, this.onPressed,this.buttonColor);
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(top:20),
    //  height: MediaQuery.of(context).size.width/5,
      child: SizedBox(
        height: MediaQuery.of(context).size.width*0.13,
        width: double.infinity,
        child: RaisedButton(
          onPressed:
              onPressed, // Simply put the function name here, DON'T use ()
          child: Padding(
              padding: EdgeInsets.symmetric(vertical: 13),
              child: Text(
                text,
                style: TextStyle(fontWeight: FontWeight.bold),
              )),
          color: buttonColor,
          textColor: Colors.white,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
        ),
      ),
    );
  }
}
