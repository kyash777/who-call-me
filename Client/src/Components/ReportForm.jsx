import { Button, Stack, TextField, FormHelperText } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useState } from "react";
import "../app.css";
import axios from "axios";

const ReportForm = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [messageError,setMessageError]=useState("");
  const [success,setSuccess]=useState("");

  const handlePhone = (e) => {
    if (!matchIsValidTel(e)) {
      setPhoneError("Please Enter a Valid Phone Number");
    }else{
      setPhoneError("");
    }
    setPhone(e);
    
  };

  const handleMessage = (e) => {
    setMessage(e);
    if(message.length!==0){
      setMessageError("");
    }
  };

  const handleReport = async () => {
    if (matchIsValidTel(phone) && message.length!==0) {
      const response = await axios.post(
        "https://who-call-me.vercel.app/report",
        {
          phoneNumber: phone.replace(/\s+/g, ""),
          message: message,
        }
      );
      if(response.status===200){
        setSuccess("Phone Number Reported Successfully")
        setPhone("");
        setMessage("");
      }
    }else{
      setMessageError("Please Enter a Message")
    }
  };
  return (
    <Stack sx={{ gap: 2, alignItems: "center", paddingTop: "100px" }}>
      <Stack sx={{ width: "200px", height: "200px" }}>
        <img src="https://img.freepik.com/premium-vector/road-red-sign-white-background-road-traffic-controllane-usage-regulatory-sign-stop-yield-street_970024-56304.jpg" />
      </Stack>
      <MuiTelInput
        defaultCountry="IN"
        value={phone}
        onChange={(e) => {
          handlePhone(e);
        }}
        sx={{ width: "400px" }}
        label="Phone"
      />
      <FormHelperText sx={{ color: "red", fontWeight: 600 }}>
        {phoneError}
      </FormHelperText>
      <TextField
        value={message}
        sx={{ width: "400px" }}
        placeholder="Enter The Message"
        label="Message"
        inputProps={{ maxLength: 25 }}
        onChange={(e) => {
          handleMessage(e.target.value);
        }}
      />
      <FormHelperText sx={{ color: "red", fontWeight: 600 }}>
        {messageError}
      </FormHelperText>
      <Button
        onClick={handleReport}
        variant="contained"
        color="error"
        sx={{ width: "150px", marginTop: "5px" }}
      >
        Send Report
      </Button>
      <FormHelperText sx={{ color: "green", fontWeight: 600 }}>
        {success}
      </FormHelperText>
    </Stack>
  );
};

export default ReportForm;
