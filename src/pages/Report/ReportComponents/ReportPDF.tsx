import React from "react";
import {
  Document,
  Page,
  View,
  Image as ImagePdf,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
import { Checkbox, Input, Typography } from "antd";

type TFormData = {
  title: string;
  value: string;
  value_color?: string;
  font_weight?: string;
};

type TFormDataCheckbox = {
  title: string;
  isChecked: boolean;
};

type TTableInformasiTerminal = {
  product: string;
  serial_number: string;
  notes: string;
  action: string;
};

type TTableFeature = {
  account: string;
  no_reference: string;
  feature: string;
  mid: string;
  tid: string;
  nominal: string;
};

const KelengkapanEDCDongle: TFormDataCheckbox[] = [
  {
    title: "Tutup Baterai",
    isChecked: true,
  },
  {
    title: "Baterai",
    isChecked: true,
  },
  {
    title: "Adaptor Dongle",
    isChecked: false,
  },
  {
    title: "Adaptor EDC",
    isChecked: true,
  },
  {
    title: "Bracket EDC",
    isChecked: false,
  },
  {
    title: "Dudukan Dongle",
    isChecked: false,
  },
  {
    title: "Dudukan EDC",
    isChecked: false,
  },
  {
    title: "Kabel ECR",
    isChecked: false,
  },

  {
    title: "Kabel LAN",
    isChecked: false,
  },
  {
    title: "Kabel Line Telepon",
    isChecked: false,
  },
  {
    title: "Label MID/TID",
    isChecked: false,
  },
  {
    title: "Magic Box",
    isChecked: false,
  },
  {
    title: "Panduan Transaksi",
    isChecked: false,
  },
  {
    title: "Pin Cover",
    isChecked: true,
  },
  {
    title: "Spliter Line Telepon",
    isChecked: false,
  },
  {
    title: "Sticker Bank",
    isChecked: true,
  },

  {
    title: "Sticker Dongle",
    isChecked: false,
  },
  {
    title: "Sticker GPN",
    isChecked: false,
  },
  {
    title: "Sticker QR Code",
    isChecked: false,
  },
];

const MaterialPromo: TFormDataCheckbox[] = [
  {
    title: "Flayer",
    isChecked: false,
  },
  {
    title: "Tendcard",
    isChecked: false,
  },
  {
    title: "Card Holder",
    isChecked: false,
  },
  {
    title: "Pen Holder",
    isChecked: false,
  },
  {
    title: "Bill Holder",
    isChecked: false,
  },
  {
    title: "Sign Pad",
    isChecked: false,
  },
  {
    title: "Pen",
    isChecked: false,
  },
  {
    title: "Acrylic Open Close",
    isChecked: false,
  },
  {
    title: "Sticker Logo",
    isChecked: false,
  },
  {
    title: "Banner",
    isChecked: false,
  },
];

const MateriTraining: TFormDataCheckbox[] = [
  {
    title: "Fraud Awareness",
    isChecked: false,
  },
  {
    title: "Sale/Void/Settlement/Logon",
    isChecked: true,
  },
  {
    title: "Installment",
    isChecked: false,
  },
  {
    title: "Audit Report",
    isChecked: false,
  },
  {
    title: "Top Up",
    isChecked: false,
  },
  {
    title: "Redeem Point",
    isChecked: false,
  },
  {
    title: "Cardver/Pre Auth/Offline",
    isChecked: false,
  },
  {
    title: "Manual Key In",
    isChecked: false,
  },
  {
    title: "Tips and Adjust",
    isChecked: false,
  },
  {
    title: "Mini ATM",
    isChecked: false,
  },
  {
    title: "Fare & Non Fare",
    isChecked: false,
  },
  {
    title: "DCC/Download BIN",
    isChecked: false,
  },
  {
    title: "First Level Maintenance",
    isChecked: true,
  },
  {
    title: "Penyimpanan Struk Transaksi",
    isChecked: false,
  },
];

const InformasiPenugasan: TFormData[] = [
  {
    title: "Target Kedatangan",
    value: "08-Mar-2023 08:30",
    value_color: "red",
  },
  {
    title: "Jatuh Tempo",
    value: "08-Mar-2023 23:59",
    value_color: "red",
  },
  {
    title: "Bank",
    value: "PT Zegen Solusi Mandiri",
    value_color: "#0D0DFF",
  },
  {
    title: "No Case/SPK",
    value: "IN-2303813908",
    value_color: "black",
  },
  {
    title: "Title",
    value: "ZSM/1000073979201/FMS/BNI",
    value_color: "black",
  },
  {
    title: "Case Type",
    value: "Request",
    value_color: "black",
  },
  {
    title: "Tipe Penugasan",
    value: "Installation",
    value_color: "#0D0DFF",
  },
  {
    title: "Service Point",
    value: "Cilegon",
    value_color: "black",
  },
  {
    title: "Keterangan",
    value: `done pemasangan edc. Trx sale void settle ok,
    sinyal bagus, changepart ok, training
    merchant ok. pic veni no.082124807980`,
    value_color: "black",
  },
];

const DataMerchant: TFormData[] = [
  {
    title: "Nama",
    value: "FAVE KITCHEN CILEGON MBL",
    value_color: "red",
  },
  {
    title: "Alamat penugasan",
    value: `FAVE KITCHEN CILEGON TAMAN KRAKATAU RUKO
    BLOK L NO 1 SERDANG KRAMATWATU SERANG`,
    value_color: "black",
  },
  {
    title: "Kota & Kode Pos",
    value: "SERANG (KOTA), 42453",
    value_color: "black",
  },
  {
    title: "Propinsi",
    value: "Indonesia",
    value_color: "black",
  },
  {
    title: "Contact Person",
    value: "VENI HENDRIYANTI",
    value_color: "black",
  },
  {
    title: "Telepon",
    value: "0210000/082124807980",
    value_color: "black",
  },
];

const InformasiTerminal: TFormData[] = [
  {
    title: "MID",
    value: "71149366964,000100214002328",
    value_color: "black",
  },
  {
    title: "TID, TID 2, TID 3",
    value: `74754629,14232825`,
    value_color: "black",
  },
  {
    title: "CSI",
    value: "-",
    value_color: "black",
  },
];

const LaporanKerjaTeknisi: TFormData[] = [
  {
    title: "Waktu Kedatangan",
    value: "09-Mar-2023 18:29",
    value_color: "black",
    font_weight: "bold",
  },
  {
    title: "Waktu Mulai",
    value: "09-Mar-2023 18:29",
    value_color: "black",
    font_weight: "bold",
  },
  {
    title: "Waktu Selesai",
    value: "09-Mar-2023 18:36",
    value_color: "black",
    font_weight: "bold",
  },

  {
    title: "Line Komunikasi",
    value: "GPRS",
    value_color: "black",
    font_weight: "bold",
  },
  {
    title: "No. Direct Line",
    value: "-",
    value_color: "black",
    font_weight: "bold",
  },
  {
    title: "Operator Seluler",
    value: "Telkomsel",
    value_color: "black",
    font_weight: "bold",
  },

  {
    title: "Supply Kertas",
    value: "3 roll",
    value_color: "black",
    font_weight: "bold",
  },
  {
    title: "PIC Merchant",
    value: "Veni",
    value_color: "black",
    font_weight: "bold",
  },
  {
    title: "Phone",
    value: "082124807980",
    value_color: "black",
    font_weight: "bold",
  },
  {
    title: "Indikasi Gesek Tunai",
    value: "Tidak Terindikasi",
    value_color: "black",
    font_weight: "bold",
  },
];

const TableInformasiTerminal: TTableInformasiTerminal[] = [
  {
    product: "INGENICO MOVE 2500 4COMM 4G (VDI)",
    serial_number: "230297303321246629252927",
    notes: "",
    action: "Install",
  },
  {
    product: "Sim Card Telkomsel M2M (Non VDI)",
    serial_number: "6210009294770702",
    notes: "",
    action: "Install",
  },
];

const TableFeature: TTableFeature[] = [
  {
    account: "PT Zegen Solusi Mandiri",
    no_reference: "",
    feature: "Sale",
    mid: "000100214002328",
    tid: "14232825",
    nominal: "12",
  },
];

const ReportPDF = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "white",
      marginTop: 20,
      marginBottom: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    logo: {
      width: 100,
      height: 35,
    },
    center: {
      textAlign: "center",
    },
    mt4: {
      marginTop: 4,
    },
    table: {
      // @ts-ignore
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      margin: "auto",
      marginTop: 5,
      fontSize: "8px",
    },
  });

  const addCharacterAtIndex = (
    originalString: string,
    index: number,
    characterToAdd: string
  ) => {
    return (
      originalString.slice(0, index) +
      characterToAdd +
      originalString.slice(index)
    );
  };

  const handleWordBreak = (text: string): string => {
    let result: string = text;
    if (text.length >= 13) {
      result = addCharacterAtIndex(text, 13, " ");
    }
    return result;
  };

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              color: "#1C77C6",
              gap: 4,
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "semibold",
            }}
          >
            <Text>Work Order</Text>
            <Text>#WO-2303325253</Text>
            <Text>Done :</Text>
            <Text>Henry Daudi</Text>
            <Text>(00220793)</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              fontSize: "9px",
              marginTop: "8px",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                width: "48%",
              }}
            >
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "#FDCE7A",
                }}
              >
                Informasi Penugasan
              </Text>
              {InformasiPenugasan.map((val, index) => (
                <View
                  key={index}
                  style={{
                    fontSize: "8px",
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "3px",
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{val.title} </Text>
                    <Text> : </Text>
                  </View>
                  <View
                    style={{
                      width: "55%",
                      color: val.value_color,
                    }}
                  >
                    <Text>{val.value} </Text>
                  </View>
                </View>
              ))}
            </View>
            <View
              style={{
                width: "48%",
              }}
            >
              <Text
                style={{
                  backgroundColor: "#FDCE7A",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Data Merchant
              </Text>
              {DataMerchant.map((val, index) => (
                <View
                  key={index}
                  style={{
                    fontSize: "8px",
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "3px",
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{val.title} </Text>
                    <Text> : </Text>
                  </View>
                  <View
                    style={{
                      width: "55%",
                      color: val.value_color,
                    }}
                  >
                    <Text>{val.value} </Text>
                  </View>
                </View>
              ))}
              <Text
                style={{
                  backgroundColor: "#FDCE7A",
                  width: "100%",
                  textAlign: "center",
                  marginTop: "2px",
                }}
              >
                Informasi Terminal
              </Text>
              {InformasiTerminal.map((val, index) => (
                <View
                  key={index}
                  style={{
                    fontSize: "8px",
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "3px",
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{val.title} </Text>
                    <Text> : </Text>
                  </View>
                  <View
                    style={{
                      width: "55%",
                      color: val.value_color,
                    }}
                  >
                    <Text>{val.value} </Text>
                  </View>
                </View>
              ))}
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View
                    style={{ ...styles.tableCol, backgroundColor: "#C0C0C0" }}
                  >
                    <Text style={styles.tableCell}>Product</Text>
                  </View>
                  <View
                    style={{ ...styles.tableCol, backgroundColor: "#C0C0C0" }}
                  >
                    <Text style={styles.tableCell}>Serial Number</Text>
                  </View>
                  <View
                    style={{ ...styles.tableCol, backgroundColor: "#C0C0C0" }}
                  >
                    <Text style={styles.tableCell}>Notes</Text>
                  </View>
                  <View
                    style={{ ...styles.tableCol, backgroundColor: "#C0C0C0" }}
                  >
                    <Text style={styles.tableCell}>Action</Text>
                  </View>
                </View>
                {TableInformasiTerminal.map((val, index) => (
                  <View key={index} style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{val.product}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {handleWordBreak(val.serial_number)}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{val.notes}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{val.action}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                backgroundColor: "red",
                width: "98%",
                textAlign: "center",
                marginTop: "8px",
                fontSize: "10px",
                color: "white",
              }}
            >
              Laporan Kerja Teknisi
            </Text>
          </View>
          <View
            style={{
              marginTop: "10px",
              marginLeft: "7px",
              display: "flex",
              flexDirection: "row",
              width: "30%",
              fontSize: "8px",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
              }}
            >
              <Text
                style={{
                  width: "95%",
                }}
              >
                Status
              </Text>
              <Text
                style={{
                  width: "3%",
                }}
              >
                :
              </Text>
            </View>
            <Text
              style={{
                color: "green",
                width: "50%",
              }}
            >
              Done{" "}
            </Text>
          </View>
          <View
            style={{
              marginLeft: "7px",
              display: "flex",
              flexDirection: "row",
              width: "98%",
              fontSize: "8px",
              flexWrap: "wrap",
            }}
          >
            {LaporanKerjaTeknisi.map((val, index) => (
              <View
                key={index}
                style={{
                  marginTop: "3px",
                  display: "flex",
                  flexDirection: "row",
                  width: "30%",
                  fontSize: "8px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "50%",
                    fontWeight: "light",
                  }}
                >
                  <Text
                    style={{
                      width: "95%",
                    }}
                  >
                    {val.title}{" "}
                  </Text>
                  <Text
                    style={{
                      width: "3%",
                    }}
                  >
                    :
                  </Text>
                </View>
                <Text
                  style={{
                    color: val.value_color,
                    fontWeight: "bold",
                    width: "50%",
                  }}
                >
                  {val.value}
                </Text>
              </View>
            ))}
          </View>
          <View
            style={{
              marginTop: "6px",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-around",
              fontSize: "11px",
            }}
          >
            <View
              style={{
                width: "25%",
                fontSize: "10px",
              }}
            >
              <Text
                style={{
                  marginBottom: "3px",
                }}
              >
                Kelengkapan EDC Dongle
              </Text>
              {KelengkapanEDCDongle.map((val, index) => (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    marginBottom: "2px",
                  }}
                >
                  <ImagePdf
                    src={
                      val.isChecked
                        ? "/icons/Report/IconChecked.png"
                        : "/icons/Report/IconUnchecked.png"
                    }
                    style={{
                      width: "10px",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: "9px",
                    }}
                  >
                    {val.title}
                  </Text>
                </View>
              ))}
            </View>
            <View
              style={{
                width: "25%",
              }}
            >
              <Text
                style={{
                  marginBottom: "3px",
                }}
              >
                Material Promo
              </Text>
              {MaterialPromo.map((val, index) => (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    marginBottom: "2px",
                  }}
                >
                  <ImagePdf
                    src={
                      val.isChecked
                        ? "/icons/Report/IconChecked.png"
                        : "/icons/Report/IconUnchecked.png"
                    }
                    style={{
                      width: "10px",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: "9px",
                    }}
                  >
                    {val.title}
                  </Text>
                </View>
              ))}
            </View>
            <View
              style={{
                width: "25%",
              }}
            >
              <Text
                style={{
                  marginBottom: "3px",
                }}
              >
                Materi Training
              </Text>
              {MateriTraining.map((val, index) => (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    marginBottom: "2px",
                  }}
                >
                  <ImagePdf
                    src={
                      val.isChecked
                        ? "/icons/Report/IconChecked.png"
                        : "/icons/Report/IconUnchecked.png"
                    }
                    style={{
                      width: "10px",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: "9px",
                    }}
                  >
                    {val.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              margin: "10px 0",
              display: "flex",
              fontSize: "8px",
              flexDirection: "row",
              marginLeft: "7px",
            }}
          >
            <Text
              style={{
                width: "18%",
              }}
            >
              Keterangan
            </Text>
            <View
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text>: </Text>
              <Text>
                done pemasangan edc. Trx sale void settle ok, sinyal bagus,
                changepart ok, training merchant ok. pic veni no.082124807980
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              marginLeft: "7px",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                width: "18%",
                fontSize: "8px",
              }}
            >
              Bukti Kunjungan
            </Text>
            <View
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                fontSize: "10px",
                flexWrap: "wrap",
                gap: 18,
              }}
            >
              <Text>: </Text>
              <ImagePdf
                src={"/icons/Report/bukti_kunjungan1.png"}
                style={{
                  width: "120px",
                  height: "auto",
                }}
              />
              <ImagePdf
                src={"/icons/Report/bukti_kunjungan2.png"}
                style={{
                  width: "120px",
                  height: "auto",
                }}
              />
              <ImagePdf
                src={"/icons/Report/bukti_kunjungan3.png"}
                style={{
                  width: "120px",
                  height: "auto",
                }}
              />
              <ImagePdf
                src={"/icons/Report/bukti_kunjungan4.png"}
                style={{
                  width: "120px",
                  height: "auto",
                }}
              />
              <ImagePdf
                src={"/icons/Report/bukti_kunjungan5.png"}
                style={{
                  width: "120px",
                  height: "auto",
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: "20px",
              display: "flex",
              marginLeft: "7px",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                width: "18%",
                fontSize: "8px",
              }}
            >
              Feature
            </Text>
            <View
              style={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                fontSize: "10px",
              }}
            >
              <Text>: </Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20%",
                      backgroundColor: "#C0C0C0",
                    }}
                  >
                    <Text style={styles.tableCell}>Account</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20%",
                      backgroundColor: "#C0C0C0",
                    }}
                  >
                    <Text style={styles.tableCell}>No Reference</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "10%",
                      backgroundColor: "#C0C0C0",
                    }}
                  >
                    <Text style={styles.tableCell}>Feature</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20%",
                      backgroundColor: "#C0C0C0",
                    }}
                  >
                    <Text style={styles.tableCell}>MID</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "20%",
                      backgroundColor: "#C0C0C0",
                    }}
                  >
                    <Text style={styles.tableCell}>TID</Text>
                  </View>
                  <View
                    style={{
                      ...styles.tableCol,
                      width: "10%",
                      backgroundColor: "#C0C0C0",
                    }}
                  >
                    <Text style={styles.tableCell}>Nominal</Text>
                  </View>
                </View>
                {TableFeature.map((val, index) => (
                  <View key={index} style={styles.tableRow}>
                    <View
                      style={{
                        ...styles.tableCol,
                        width: "20%",
                      }}
                    >
                      <Text style={styles.tableCell}>{val.account}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={styles.tableCell}>
                        {handleWordBreak(val.no_reference)}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "10%" }}>
                      <Text style={styles.tableCell}>{val.feature}</Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={styles.tableCell}>
                        {handleWordBreak(val.mid)}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "20%" }}>
                      <Text style={styles.tableCell}>
                        {handleWordBreak(val.tid)}
                      </Text>
                    </View>
                    <View style={{ ...styles.tableCol, width: "10%" }}>
                      <Text style={styles.tableCell}>{val.nominal}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default ReportPDF;
