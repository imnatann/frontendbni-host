import FormFieldInputListEDC from "@smpm/components/FormFields/FormFieldInputListEDC";  
import FormFieldReceivedOutEDC from "@smpm/components/FormFields/FormFieldReceivedOutEdc";  
import FormFieldSerialNumberEDC from "@smpm/components/FormFields/FormFieldSerialNumberEDC";  
import { findJobOrder } from "@smpm/services/jobOrderService";
import { Divider, Typography } from "antd";  
import { useEffect, useState } from "react";  
import { useParams } from "react-router-dom";  
 
const { Title } = Typography;  

type InputEDCProps = {  
  hide?: boolean;  
};  

const InputEDC: React.FC<InputEDCProps> = ({ hide }) => {  
  const { no_jo } = useParams<{ no_jo?: string }>();   
  const [jobOrder, setJobOrder] = useState<any>(null);  
  const [isCMJobOrder, setIsCMJobOrder] = useState(false);  
  const [_isPreventiveMaintenanceJobOrder, setIsPreventiveMaintenanceJobOrder] = useState(false);  

 
  useEffect(() => {  
    const fetchJobOrder = async () => {  
      if (typeof no_jo === "string") {  
        const jobOrder = await findJobOrder(no_jo);  
        setJobOrder(jobOrder);  

        setIsCMJobOrder(jobOrder.result.type === "CM Replace");  

        setIsPreventiveMaintenanceJobOrder(jobOrder.type === "Preventive Maintenance");  
      } else {  
        console.error("No job order number found in the URL");  
      }  
    };  

    fetchJobOrder();  
  }, [no_jo]);  

  if (!jobOrder) {  
    return null;  
  }  

  return (  
    <div  
      style={{  
        display: hide ? "none" : "block",  
      }}  
    >  
      <>  
        <Title level={5}>EDC</Title>  
        <FormFieldSerialNumberEDC />  
      </>  
      {isCMJobOrder && (  
        <>  
          <Title level={5}>Out Edc</Title>  
          <FormFieldReceivedOutEDC isRequired={true} />  
        </>  
      )}  
      <Divider />  
      <Title level={5}>Products</Title>  
      <FormFieldInputListEDC />  
    </div>  
  );  
};  

export default InputEDC;