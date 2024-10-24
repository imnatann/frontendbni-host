// src/components/TableView.tsx

import {
  CodepenCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import DataTable from "@smpm/components/DataTable";
import { IMerchantModel } from "@smpm/models/merchantModel";
import { ElectronicDataCaptureMachine } from "@smpm/models/edcModel";
import { getEDCsByMerchantId } from "@smpm/services/edcService"; // Tambahkan import ini
import {
  deleteDataMerchant,
  getDataMerchant,
} from "@smpm/services/merchantService";
import { useDebounce } from "@smpm/utils/useDebounce";
import useTableHelper from "@smpm/utils/useTableHelper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Modal, notification, Spin, Table } from "antd"; // Tambahkan Spin dan Table untuk loading dan menampilkan data EDC
import type { ColumnsType } from "antd/es/table";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TableView: React.FC = () => {
  const [searchColumn, setSearchColumn] = useState<string | null>(null);
  const navigate = useNavigate();
  const deleteMutation = useMutation({
    mutationFn: deleteDataMerchant,
  });

  const [api, contextHolder] = notification.useNotification(); // Perbaiki destructuring untuk notification

  const setSelectedSearchColumn = useCallback((value: any) => {
    setSearchColumn(value);
  }, []);

  const { tableFilter, onChangeTable } = useTableHelper<IMerchantModel>({ pagination: true });

  const [search, setSearch] = useState<string>("");

  const searchValue = useDebounce(search, 500);

  const onSearch = (value: string) => setSearch(value);

  const {
    data: merchant,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ["merchant", { ...tableFilter, search }],
    queryFn: () =>
      getDataMerchant({
        order: tableFilter.sort.order,
        order_by: tableFilter.sort.order_by,
        search: searchValue,
        search_by: tableFilter.searchBy,
        page: Number(tableFilter.pagination.current),
        take: Number(tableFilter.pagination.pageSize),
      }),
  });

  // State untuk modal delete
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [merchantData, setMerchantData] = useState<IMerchantModel>({});
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  // State untuk modal EDCs
  const [openEDCModal, setOpenEDCModal] = useState<boolean>(false);
  const [edcData, setEdcData] = useState<ElectronicDataCaptureMachine[]>([]); // Inisialisasi sebagai array kosong
  const [edcLoading, setEdcLoading] = useState<boolean>(false);
  const [selectedMerchantName, setSelectedMerchantName] = useState<string>("");

  // Fungsi untuk membuka modal delete
  const showDeleteModal = (row: IMerchantModel) => {
    setMerchantData(row);
    setOpenDelete(true);
  };

  // Fungsi untuk membuka modal EDC
  const showEDCModal = async (row: IMerchantModel) => {
    setSelectedMerchantName(row.name);
    setOpenEDCModal(true);
    setEdcLoading(true);
    try {
      const edcs = await getEDCsByMerchantId(row.id);
      setEdcData(edcs); // edcData pasti array karena sudah disiapkan di service
    } catch (error: any) {
      api.error({
        message: "Gagal mengambil data EDC.",
        description: error.message || "Terjadi kesalahan saat mengambil data EDC.",
      });
      setEdcData([]); // Reset edcData jika terjadi error
    } finally {
      setEdcLoading(false);
    }
  };

  const handleOkDelete = () => {
    setConfirmLoading(true);
    deleteMutation.mutate(+String(merchantData.id), {
      onSuccess: () => {
        api.success({
          message: "Merchant telah dihapus dan sedang menunggu persetujuan.",
        });
        refetch();
        setOpenDelete(false);
        setConfirmLoading(false);
      },
      onError: () => {
        api.error({
          message: "Terjadi kesalahan saat menghapus merchant.",
        });
        setOpenDelete(false);
        setConfirmLoading(false);
      },
    });
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseEDCModal = () => {
    setOpenEDCModal(false);
    setEdcData([]);
    setSelectedMerchantName("");
  };

  const columns: ColumnsType<IMerchantModel> = useMemo(
    (): ColumnsType<IMerchantModel> => {
      return [
        {
          title: "MID",
          dataIndex: "mid",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "Merchant Name",
          dataIndex: "name",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "Category",
          dataIndex: "category",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "Customer Name",
          dataIndex: "customer_name",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "Telephone",
          dataIndex: "telephone",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "PIC",
          dataIndex: "pic",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "Phone 1",
          dataIndex: "phone1",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "Phone 2",
          dataIndex: "phone2",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "Address 1",
          dataIndex: "address1",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "Address 2",
          dataIndex: "address2",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "Address 3",
          dataIndex: "address3",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "Address 4",
          dataIndex: "address4",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "District",
          dataIndex: "district",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "Sub District",
          dataIndex: "subdistrict",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "City",
          dataIndex: "city",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "Province",
          dataIndex: "province",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "Postal Code",
          dataIndex: "postal_code",
          sorter: true,
          sortDirections: ["descend", "ascend"],
          render: (row) => row || "-",
        },
        {
          title: "ACTION",
          render: (row) => {
            return (
              <span style={{ display: "flex", alignItems: "center" }}>
                <Button
                  onClick={() =>
                    navigate("/merchant/list-merchant/edit/" + row.id)
                  }
                  icon={<EditOutlined />}
                  style={{ marginRight: 8, display: "inline-block" }}
                />
                <Button
                  onClick={() => showDeleteModal(row)}
                  icon={<DeleteOutlined />}
                  style={{ marginRight: 8, display: "inline-block" }}
                />
                {/* Tombol untuk membuka modal EDC */}
                <Button
                  onClick={() => showEDCModal(row)}
                  icon={<CodepenCircleOutlined />}
                  style={{ display: "inline-block" }}
                />
              </span>
            );
          },
        },
      ];
    },
    [navigate]
  );

  // Kolom untuk tabel EDC
  const edcColumns: ColumnsType<ElectronicDataCaptureMachine> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "MID",
      dataIndex: "mid",
      key: "mid",
    },
    {
      title: "TID",
      dataIndex: "tid",
      key: "tid",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Brand Type",
      dataIndex: "brand_type",
      key: "brand_type",
    },
    {
      title: "Serial Number",
      dataIndex: "serial_number",
      key: "serial_number",
    },
    {
      title: "Status Owner",
      dataIndex: "status_owner",
      key: "status_owner",
    },
    {
      title: "Status Machine",
      dataIndex: "status_machine",
      key: "status_machine",
    },
    {
      title: "Status Active",
      dataIndex: "status_active",
      key: "status_active",
      render: (status: boolean) => (status ? "Active" : "Inactive"),
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "Simcard Provider",
      dataIndex: "simcard_provider",
      key: "simcard_provider",
    },
    {
      title: "Simcard Number",
      dataIndex: "simcard_number",
      key: "simcard_number",
    },
    // Tambahkan kolom lain sesuai kebutuhan
  ];

  return (
    <>
      {contextHolder} {/* Tempatkan contextHolder untuk notifications */}
      {/* Modal Delete */}
      <Modal
        title={`Delete Merchant`}
        open={openDelete}
        onOk={handleOkDelete}
        confirmLoading={confirmLoading}
        onCancel={handleCancelDelete}
      >
        <p style={{ fontSize: "18px" }}>
          Are you sure delete Merchant{" "}
          <span style={{ fontWeight: "bold" }}>{merchantData.name}</span>?
        </p>
      </Modal>

      {/* Modal EDC */}
      <Modal
        title={`EDC List for Merchant: ${selectedMerchantName}`}
        open={openEDCModal}
        onCancel={handleCloseEDCModal}
        footer={[
          <Button key="close" onClick={handleCloseEDCModal}>
            Close
          </Button>,
        ]}
        width={1100}
      >
        {edcLoading ? (
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Spin size="large" />
          </div>
        ) : edcData.length > 0 ? (
          <Table
            dataSource={edcData}
            columns={edcColumns}
            pagination={false}
            rowKey="id"
            bordered
            scroll={{ x: "max-content" }}
          />
        ) : (
          <p>No EDCs found for this merchant.</p>
        )}
      </Modal>

      {/* DataTable untuk Merchant */}
      <DataTable<IMerchantModel>
        dataSource={merchant?.result.data}
        pagination={{
          current: merchant?.result.meta.page,
          pageSize: merchant?.result.meta.take,
          total: merchant?.result.meta.item_count,
        }}
        loading={isLoading}
        bordered
        onGlobalSearch={onSearch}
        columns={columns}
        useGlobalSearchInput
        onChange={onChangeTable}
        scroll={{ x: true }}
      />
    </>
  );
};

export default TableView;
