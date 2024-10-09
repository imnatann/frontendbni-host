import { Document, Page, Text, View } from "@react-pdf/renderer";  
import { ReportPDFProps } from "@smpm/models/jobOrderModel";  

const ReportPDF = ({ data }: ReportPDFProps) => {  
  const formatDate = (dateString: string | number | Date) => {  
    const date = new Date(dateString);  
    const day = String(date.getDate()).padStart(2, '0');  
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const year = date.getFullYear();  
    return `${day}/${month}/${year}`;  
  };  

  const displayValue = (value: string | null | undefined | "" | " " | "undefined" | "null") => (value && value.trim() !== "") ? value : "-";  

  interface CheckboxProps {  
    label: string;  
    checked: boolean;  
  }  

  const Checkbox = ({ label, checked }: CheckboxProps) => (  
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>  
      <Text>{checked ? "[X]" : "[ ]"} {label}</Text>  
    </View>  
  );  

  const addPlaceholders = (items: { label: string; value: string; color?: string }[]) => {  
    while (items.length < 4) {  
      items.push({ label: "", value: "" });  
    }  
    return items;  
  };  

  return (  
    <Document>  
      <Page size="A4" style={{ padding: 20, fontSize: 10 }}>  
        <Text style={{  
          fontSize: 16,  
          marginBottom: 20,  
          textAlign: "center",  
          fontWeight: "bold",  
          color: "#3c8acf",  
          padding: 10,  
        }}>  
          Work Order #{displayValue(data.job_order_no)} Done: {displayValue(data.job_order.merchant_name)}  
        </Text>  

        {data.status_approve?.toLowerCase() !== "approved" && (  
          <View style={{ marginBottom: 20 }}>  
            <Text style={{   
              fontWeight: "bold",   
              fontSize: 16,   
              marginBottom: 5,   
              textAlign: "center",   
              color: data.status_approve?.toLowerCase() === "rejected" ? "red" : "blue",   
              padding: 10,  
            }}>  
              {data.status_approve?.toLowerCase() === "rejected" ? "Approval Rejected" : "Menunggu Untuk Approval"}  
            </Text>  
          </View>  
        )}  

        <View style={{ marginBottom: 20 }}>  
          {[  
            { label: "Target Kedatangan:", value: displayValue(formatDate(data.job_order.target_date)) },  
            { label: "Jenis Tempo:", value: displayValue(data.job_order.type) },  
            { label: "No Case/SPK:", value: displayValue(data.job_order_no) },  
            { label: "TID:", value: displayValue(data.job_order.tid) },  
            { label: "Case Type:", value: displayValue(data.job_order.case_type) },  
            { label: "Tipe Pengajuan:", value: displayValue(data.job_order.type) },  
          ].map((item, index) => (  
            <View key={index} style={{ flexDirection: "row", marginBottom: 10, justifyContent: "space-between" }}>  
              <Text style={{ fontWeight: "bold" }}>{item.label}</Text>  
              <Text style={{ marginLeft: 5 }}>{item.value}</Text>  
            </View>  
          ))}  
        </View>  

        <View style={{  
          width: "100%",  
          borderStyle: "solid",  
          borderWidth: 1,  
          borderRightWidth: 0,  
          borderBottomWidth: 0,  
          marginBottom: 20,  
        }}>  
          <View style={{ flexDirection: "row", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>  
            {["Product", "Serial Number", "Notes", "Action"].map((header, index) => (  
              <View key={index} style={{  
                width: "25%",  
                borderStyle: "solid",  
                borderWidth: 1,  
                borderLeftWidth: 0,  
                borderTopWidth: 0,  
                padding: 5,  
              }}>  
                <Text>{header}</Text>  
              </View>  
            ))}  
          </View>  
          {data.products.map((product, index) => (  
            <View style={{ flexDirection: "row" }} key={index}>  
              <View style={{  
                width: "25%",  
                borderStyle: "solid",  
                borderWidth: 1,  
                borderLeftWidth: 0,  
                borderTopWidth: 0,  
                padding: 5,  
              }}>  
                <Text>{displayValue(product.name)}</Text>  
              </View>  
              <View style={{  
                width: "25%",  
                borderStyle: "solid",  
                borderWidth: 1,  
                borderLeftWidth: 0,  
                borderTopWidth: 0,  
                padding: 5,  
              }}>  
                <Text>{displayValue(product.serial_number)}</Text>  
              </View>  
              <View style={{  
                width: "25%",  
                borderStyle: "solid",  
                borderWidth: 1,  
                borderLeftWidth: 0,  
                borderTopWidth: 0,  
                padding: 5,  
              }}>  
                <Text>{displayValue(product.notes)}</Text>  
              </View>  
              <View style={{  
                width: "25%",  
                borderStyle: "solid",  
                borderWidth: 1,  
                borderLeftWidth: 0,  
                borderTopWidth: 0,  
                padding: 5,  
              }}>  
                <Text>{displayValue(product.action)}</Text>  
              </View>  
            </View>  
          ))}  
        </View>  

        {data.status_approve?.toLowerCase() === "approved" && (  
          <>  
            <Text style={{  
              fontSize: 12,  
              marginBottom: 20,  
              textAlign: "center",  
              fontWeight: "bold",  
              backgroundColor: "#ff0000",  
              color: "#ffffff",  
              padding: 6,  
            }}>  
              Laporan Kerja Teknisi  
            </Text>  

            <View style={{ marginBottom: 20, flexDirection: "row", justifyContent: "space-between" }}>  
              <View>  
                {addPlaceholders([  
                  { label: "Status Kunjungan:", value: displayValue(data.status), color: data.status?.toLowerCase() === "done" ? "green" : "black" },  
                  {   
                    label: "Status Approval:",   
                    value: displayValue(data.status_approve),   
                    color: data.status_approve?.toLowerCase() === "pending" ? "blue" :   
                           data.status_approve?.toLowerCase() === "rejected" ? "red" :   
                           "green"   
                  },  
                  { label: "Waktu Kedatangan:", value: displayValue(formatDate(data.arrival_time)) },  
                ]).map((item, index) => (  
                  <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>  
                    <Text style={{ fontWeight: "bold" }}>{item.label}</Text>  
                    <Text style={{ marginLeft: 5, color: item.color || "black" }}>{item.value}</Text>  
                  </View>  
                ))}  
              </View>  
              <View>  
                {addPlaceholders([  
                  { label: "Waktu Mulai:", value: displayValue(formatDate(data.start_time)) },  
                  { label: "Line Komunikasi:", value: displayValue(data.communication_line) },  
                  { label: "No. Direct Line:", value: displayValue(data.direct_line_number) },  
                ]).map((item, index) => (  
                  <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>  
                    <Text style={{ fontWeight: "bold" }}>{item.label}</Text>  
                    <Text style={{ marginLeft: 5 }}>{item.value}</Text>  
                  </View>  
                ))}  
              </View>  
              <View>  
                {addPlaceholders([  
                  { label: "Waktu Selesai:", value: displayValue(formatDate(data.end_time)) },  
                  { label: "PIC Merchant:", value: displayValue(data.merchant_pic) },  
                  { label: "Phone:", value: displayValue(data.merchant_pic_phone) },  
                ]).map((item, index) => (  
                  <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>  
                    <Text style={{ fontWeight: "bold" }}>{item.label}</Text>  
                    <Text style={{ marginLeft: 5 }}>{item.value}</Text>  
                  </View>  
                ))}  
              </View>  
              <View>  
                {addPlaceholders([  
                  { label: "Supply Kertas:", value: displayValue(data.paper_supply) },  
                  { label: "Indikasi Gesek Tunai:", value: displayValue(data.swipe_cash_indication) },  
                ]).map((item, index) => (  
                  <View key={index} style={{ flexDirection: "row", marginBottom: 5 }}>  
                    <Text style={{ fontWeight: "bold" }}>{item.label}</Text>  
                    <Text style={{ marginLeft: 5 }}>{item.value}</Text>  
                  </View>  
                ))}  
              </View>  
            </View>  

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>  
              {[  
                { title: "Kelengkapan EDC Dongle", items: data.dongle },  
                { title: "Material Promo", items: data.promo_materials },  
                { title: "Materi Training", items: data.training_materials },  
              ].map((section, index) => (  
                <View key={index} style={{ width: "30%", paddingRight: 10 }}>  
                  <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{section.title}</Text>  
                  <View>  
                    {Object.entries(section.items).map(([key, value]) => (  
                      <Checkbox key={key} label={key.replace(/_/g, ' ')} checked={value} />  
                    ))}  
                  </View>  
                </View>  
              ))}  
            </View>  
          </>  
        )}  
      </Page>  
    </Document>  
  );  
};  

export default ReportPDF;