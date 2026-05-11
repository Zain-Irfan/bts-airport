"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";

export function SignupPhoneInput() {
  const [phone, setPhone] = useState("");

  return (
    <PhoneInput
      country="pk"
      value={phone}
      onChange={setPhone}
      enableSearch
      countryCodeEditable={false}
      inputProps={{
        name: "phone",
        required: true,
      }}
      containerStyle={{ width: "100%" }}
      inputStyle={{ width: "100%", height: "44px" }}
      buttonStyle={{ borderTopLeftRadius: "0.5rem", borderBottomLeftRadius: "0.5rem" }}
      containerClass="phone-input-container"
      buttonClass="phone-input-button"
      inputClass="phone-input-field"
      dropdownClass="phone-input-dropdown"
    />
  );
}

