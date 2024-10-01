import FormFieldInputDetailJobActivity from "@smpm/components/FormFields/FormFieldInputDetailJobActivity";
import React from "react";

type InputDetailJobActivityProps = {
  hide?: boolean;
};

const InputDetailJobActivity: React.FC<InputDetailJobActivityProps> = ({
  hide,
}) => {
  return (
    <div style={{ display: hide ? "none" : "block" }}>
      <FormFieldInputDetailJobActivity />
    </div>
  );
};

export default InputDetailJobActivity;
