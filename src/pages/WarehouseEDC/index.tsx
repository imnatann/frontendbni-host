// src/electronic-data-capture/WarehouseEDC.tsx

import { PlusOutlined, UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import { IconUpload, IconWashMachine } from "@tabler/icons-react";
import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Flex,
  Modal,
  Typography,
  message,
} from "antd";
import TableEDC from "./components/TableEDC";
import { useNavigate } from "react-router-dom";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";
import { bulkCreateEDC } from "@smpm/services/edcService"; // Pastikan fungsi bulkCreateEDC ditambahkan di edcService
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const { Title } = Typography;

// Contoh data brand dan brand_type
const BRANDS = ["Brand A", "Brand B", "Brand C"];
const BRAND_TYPES: { [key: string]: string[] } = {
  "Brand A": ["Type A1", "Type A2", "Type A3"],
  "Brand B": ["Type B1", "Type B2"],
  "Brand C": ["Type C1", "Type C2", "Type C3", "Type C4"],
};

// Mengumpulkan semua Brand Types tanpa duplikasi
const ALL_BRAND_TYPES = Array.from(new Set(Object.values(BRAND_TYPES).flat()));

const WarehouseEDC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onOke = () => setModalOpen(false);
  const onCancel = () => setModalOpen(false);

  const onAddNewEDC = () => navigate("/inventory/warehouse-edc/add");

  const onAddBulk = () => setModalOpen(true);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await bulkCreateEDC(formData);
      console.log("API Response:", response);

      const success = response?.result?.success ?? 0;
      const failed = response?.result?.failed ?? 0;
      const errors = response?.result?.errors ?? [];

      message.success(
        `Upload berhasil: ${success} data berhasil ditambahkan, ${failed} data gagal.`
      );

      if (errors.length > 0) {
        // Menampilkan detail error dalam modal atau menggunakan notification
        errors.forEach((errorItem: any) => {
          message.error(`Baris ${errorItem.row}: ${errorItem.error}`);
        });
      }

      // Refresh data tabel setelah upload jika diperlukan
      // Misalnya, menggunakan React Query untuk refetch data

    } catch (error: any) {
      message.error("Gagal mengunggah file. Silakan coba lagi.");
      console.error("Upload Error:", error);
    } finally {
      setUploading(false);
      setModalOpen(false);
    }
  };

  const handleDownloadTemplate = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data EDC");

    // Tambahkan header
    const headers = [
      "MID",
      "TID",
      "Brand",
      "Brand Type",
      "Serial Number",
      "Status Owner",
      "Status Owner Desc",
      "Status Machine",
      "Status Machine Desc",
      "Status Active",
      "Simcard Provider",
      "Simcard Number",
      "Region",
      "Info",
      "Kondisi Barang",
    ];
    worksheet.addRow(headers);

    // Menambahkan style untuk header
    headers.forEach((header, index) => {
      const cell = worksheet.getRow(1).getCell(index + 1);
      cell.font = { bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    // Menambahkan data validation untuk Brand
    const brandColumn = 3; // Kolom C
    worksheet.getColumn(brandColumn).eachCell((cell, rowNumber) => {
      if (rowNumber === 1) return; // Lewati header
      cell.dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: [`"${BRANDS.join(",")}"`],
        showErrorMessage: true,
        errorStyle: "error",
        errorTitle: "Invalid Brand",
        error: `Please select a brand from the dropdown.`,
      };
    });

    // Menambahkan data validation untuk Brand Type
    const brandTypeColumn = 4; // Kolom D
    worksheet.getColumn(brandTypeColumn).eachCell((cell, rowNumber) => {
      if (rowNumber === 1) return; // Lewati header
      cell.dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: [`"${ALL_BRAND_TYPES.join(",")}"`],
        showErrorMessage: true,
        errorStyle: "error",
        errorTitle: "Invalid Brand Type",
        error: `Please select a brand type from the dropdown.`,
      };
    });

    // Atur lebar kolom agar lebih rapi
    worksheet.columns.forEach((column) => {
      column.width = 20;
    });

    // Tambahkan sheet terpisah untuk Brand Types jika Anda ingin membuat dependent dropdowns
    // Namun, ExcelJS di frontend memiliki keterbatasan dalam membuat dependent dropdowns
    // Oleh karena itu, kita menyederhanakan dengan menggunakan list statis untuk Brand Type

    // Simpan workbook ke Blob
    try {
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "Template_Warehouse_EDC.xlsx");
      message.success("Template berhasil diunduh.");
    } catch (error) {
      message.error("Gagal mengunduh template.");
      console.error("Download Template Error:", error);
    }
  };

  const handleUploadDragger = async (file: File) => {
    await handleUpload(file);
    return false; // Mencegah upload otomatis
  };

  const props = {
    name: "file",
    multiple: false,
    accept: ".xlsx,.xls",
    customRequest: ({ file, onSuccess, onError }: any) => {
      handleUploadDragger(file as File)
        .then(() => {
          onSuccess && onSuccess("Ok");
        })
        .catch((err) => {
          onError && onError(err);
        });
    },
    showUploadList: false,
  };

  return (
    <Page title={"Warehouse EDC"}>
      <PageLabel
        title={<span className="text-2xl font-semibold">Warehouse EDC</span>}
        subtitle={
          <Breadcrumb
            items={[
              {
                href: "",
                title: (
                  <Flex align={"end"}>
                    <IconWashMachine />
                    <span>Warehouse EDC</span>
                  </Flex>
                ),
              },
            ]}
          />
        }
      />
      <PageContent>
        <Modal
          title="Upload Bulk"
          open={isModalOpen}
          onCancel={onCancel}
          footer={[
            <Button
              key="download-template"
              onClick={handleDownloadTemplate}
              icon={<DownloadOutlined />}
            >
              Download Template
            </Button>,
            <Button key="cancel" onClick={onCancel}>
              Cancel
            </Button>,
            <Button
              key="upload"
              type="primary"
              loading={uploading}
              disabled
              // Tombol ini di-disable karena upload dilakukan secara otomatis melalui Dragger
            >
              {uploading ? "Uploading" : "Start Upload"}
            </Button>,
          ]}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Klik atau seret file ke area ini untuk diunggah
            </p>
            <p className="ant-upload-hint">
              Mendukung unggahan tunggal atau massal. Hanya mendukung format .xlsx atau .xls
            </p>
          </Dragger>
        </Modal>
        <Card>
          <Flex justify="space-between" align="flex-end">
            <Title level={3}>Warehouse EDC</Title>
            <Flex align={"center"} gap={3}>
              <Button
                type={"primary"}
                onClick={onAddBulk}
                icon={<UploadOutlined />}
              >
                <span>Upload Bulk</span>
              </Button>
              <Button
                type={"primary"}
                icon={<PlusOutlined />}
                onClick={onAddNewEDC}
              >
                Add New
              </Button>
            </Flex>
          </Flex>
          <Divider />
          <TableEDC />
        </Card>
      </PageContent>
    </Page>
  );
};

export default WarehouseEDC;
