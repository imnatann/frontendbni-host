import FormFieldInputListEDC from "@smpm/components/FormFields/FormFieldInputListEDC";  
import FormFieldReceivedOutEDC from "@smpm/components/FormFields/FormFieldReceivedOutEdc";
 import FormFieldSerialNumberEDC from "@smpm/components/FormFields/FormFieldSerialNumberEDC";  
import { Divider, Typography } from "antd";  
import { useEffect, useState } from "react";  

const { Title } = Typography;  

type InputEDCProps = {  
  hide?: boolean;  
};  

const InputEDC: React.FC<InputEDCProps> = ({ hide }) => {  
  const [jobOrderCode, setJobOrderCode] = useState("");  

  useEffect(() => {  
     const urlParts = window.location.pathname.split("/");  
    const jobOrderIndex = urlParts.findIndex((part) => part === "activity") + 1;  
    const jobOrderCode = urlParts[jobOrderIndex];  
    setJobOrderCode(jobOrderCode);  
  }, []);  

  return (  
    <div  
      style={{  
        display: hide ? "none" : "block",  
      }}  
    >  
      {!jobOrderCode.includes("WD") && (  
        <>  
          <Title level={5}>EDC</Title>  
          <FormFieldSerialNumberEDC />  
        </>  
      )}  
      {jobOrderCode.includes("WD") && (  
        <>  
          <Title level={5}>Out EDC</Title>  
          <FormFieldSerialNumberEDC />  
        </>  
      )}  
      {(jobOrderCode.includes("CM")) && (  
        <>  
          <Title level={5}>Out Edc</Title>  
          <FormFieldReceivedOutEDC />  
        </>  
      )}  
      <Divider />  
      <Title level={5}>Products</Title>  
      <FormFieldInputListEDC />  
    </div>  
  );  
};  

export default InputEDC;