import FormFieldInputListEDC from "@smpm/components/FormFields/FormFieldInputListEDC";
import FormFieldSerialNumberEDC from "@smpm/components/FormFields/FormFieldSerialNumberEDC";
import { Divider, Typography } from "antd";

const { Title } = Typography;

type InputEDCProps = {
  hide?: boolean;
};

const InputEDC: React.FC<InputEDCProps> = ({ hide }) => {
  return (
    <div
      style={{
        display: hide ? "none" : "block",
      }}
    >
      <Title level={5}>EDC</Title>
      <FormFieldSerialNumberEDC />
      <Divider />
      <Title level={5}>Products</Title>
      <FormFieldInputListEDC />
    </div>
  );
};

export default InputEDC;
