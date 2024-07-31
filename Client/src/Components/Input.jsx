import { Button, Stack, TextField, Typography,FormHelperText } from "@mui/material";
import CountrySelect from "./CountryInput";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InputForm = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [response, setResponse] = useState(null);

  const [carrier, setCarrier] = useState("");
  const [fraudScore, setFraudScore] = useState("");
  const [message, setMessage] = useState("");
  const [region, setRegion] = useState("");

  const [error,setError]=useState("");

  const handleCountryChange = (country) => {
    setError("");
    setCountry(country);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async () => {
    if (country) {
      const response = await axios.post("https://who-call-me.vercel.app/", {
        phoneNumber: phoneNumber,
        country: country.code,
        countryCode: country.phone,
      });
      if (response.status === 200) {
        setResponse(response);
        console.log(response);
      }
    }else{
      setError("Please Select The Country")
    }
  };

  const handleReport = () => {
    navigate("/reportPage");
  };

  useEffect(() => {
    if (response && response.status === 200) {
      setCarrier(response.data.carrier);
      setFraudScore(response.data.fraud_score);
      setMessage(response.data.message);
      setRegion(response.data.region);
    }
  }, [response]);
  return (
    <Stack
      sx={{
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        // marginTop: "50px",
        paddingTop:"50px"
      }}
    >
      <Stack
        sx={{ width: "80%", justifyContent: "center", alignItems: "center" }}
      >
        <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
          <Stack sx={{ height: "200px", width: "200px" }}>
            <img src="https://png.pngtree.com/png-clipart/20220605/original/pngtree-shield-security-safe-png-image_7963298.png" />
          </Stack>
          <Typography sx={{ fontWeight: "600", fontSize: "30px" }}>
            Who Called Me ?
          </Typography>
        </Stack>
        <Stack
          sx={{
            width: "55%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <CountrySelect
            value={country}
            onChange={(event, country) => handleCountryChange(country)}
          />
          <TextField
            label="Phone Number"
            sx={{ width: 200 }}
            onChange={(e) => {
              handlePhoneNumber(e);
            }}
            value={phoneNumber}
          />
          <Button
            sx={{ width: 150, height: "35px" }}
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            Search
          </Button>
        </Stack>
          <FormHelperText sx={{ color: "red", fontWeight: 600 ,float:"left"}}>
            {error}
          </FormHelperText>
      </Stack>

      {response && (
        <Stack
          sx={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Stack
            sx={{
              background: "#E9F1FB",
              height: "100px",
              width: "200px",
              borderRadius: "10px",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "600", marginTop: "10px" }}>
              Carrier
            </Typography>
            <Typography sx={{ textAlign: "center" }}>{carrier}</Typography>
          </Stack>
          <Stack
            sx={{
              background: "#E9F1FB",
              height: "100px",
              width: "200px",
              borderRadius: "10px",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "600", marginTop: "10px" }}>
              Spam Reports
            </Typography>
            <Typography>{fraudScore}</Typography>
          </Stack>
          <Stack
            sx={{
              background: "#E9F1FB",
              height: "100px",
              width: "200px",
              borderRadius: "10px",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "600", marginTop: "10px" }}>
              Message
            </Typography>
            <Typography>
              {Array.isArray(message) ? message[0] : message.substring(0,25)}
            </Typography>
          </Stack>
          <Stack
            sx={{
              background: "#E9F1FB",
              height: "100px",
              width: "200px",
              borderRadius: "10px",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "600", marginTop: "10px" }}>
              Region
            </Typography>
            <Typography>{region}</Typography>
          </Stack>
        </Stack>
      )}
      <Stack sx={{ display: "flex", flexDirection: "row", marginTop: "25px" }}>
        <Stack sx={{ height: "60px", width: "60px" }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8QpdZpcY1Jrn9C03DcI114O-RwtqvfqHRNQ&s" />
        </Stack>
        <Button
          sx={{
            color: "red",
            fontWeight: "600",
            fontSize: "20px",
          }}
          onClick={() => {
            handleReport();
          }}
        >
          Report Number
        </Button>
      </Stack>
    </Stack>
  );
};

export default InputForm;
