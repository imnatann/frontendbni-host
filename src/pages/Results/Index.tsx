
import React, { useState } from 'react';
import { CloudDownloadOutlined, HomeOutlined } from "@ant-design/icons";
import PageContent from "@smpm/components/PageContent";
import PageLabel from "@smpm/components/pageLabel";
import Page from "@smpm/components/pageTitle";
import TableErrorValidationInfo from "@smpm/components/tableErrorValidationInfo";
import {
  IBaseResponseService,
  IErrorResponseService,
  IErrorTable,
} from "@smpm/models";
import { IFormInputImportResults } from "@smpm/models/resultsModel";
import {
  uploadResultsAcknowledge,
  uploadResultsNew,
} from "@smpm/services/resultsService";
import { makeResponseServiceError } from "@smpm/utils";
import { IconSortDescendingNumbers, IconUserCog } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Card, Drawer, Space, message } from "antd";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import FilterTableResults from "./components/FilterTableResults";
import FormImportResultsAcknowledge from "./components/FormImportResultsAcknowledge";
import FormImportResultsNew from "./components/FormImportResultsNew";
import TableResults from "./components/TableResults";

const Results = () => {
  const [errorTableResultsNew, setErrorTableResultsNew] = useState<IErrorTable[]>([]);
  const [errorTableResultsAcknowledge, setErrorTableResultsAcknowledge] = useState<IErrorTable[]>([]);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [openDrawerImportNew, setOpenDrawerImportNew] = useState(false);
  const [openDrawerImportAcknowledge, setOpenDrawerImportAcknowledge] = useState(false);
  const [filter, setFilter] = useState({});

  const showDrawerImportAcknowledge = () => {
    setOpenDrawerImportAcknowledge(true);
  };

  const showDrawerImportNew = () => {
    setOpenDrawerImportNew(true);
  };

  const onClose = () => {
    setOpenDrawerImportNew(false);
    setOpenDrawerImportAcknowledge(false);
  };

  const onResetResultsNew = () => {
    setErrorTableResultsNew([]);
  };

  const onResetResultsAcknowledge = () => {
    setErrorTableResultsAcknowledge([]);
  };

  const uploadResultsNewMutation = useMutation<
    IBaseResponseService<any>,
    AxiosError<IBaseResponseService<IErrorResponseService>>,
    any
  >({
    mutationFn: uploadResultsNew,
  });

  const onFinishImportResultsNew = (values: IFormInputImportResults) => {
    const formData = new FormData();
    formData.append("files", values.files);
    uploadResultsNewMutation.mutate(formData, {
      onSuccess: () => {
        message.success("Data berhasil diupload");
        queryClient.invalidateQueries({
          queryKey: ["results"],
        });
        onClose();
        onResetResultsNew();
      },
      onError: (err) => {
        makeResponseServiceError(dispatch, "import-results-new", err);

        if (
          err.response?.data.status.code == 400 &&
          err.response.data.result.errors
        ) {
          setErrorTableResultsNew(err.response.data.result.errors as any);
        }
      },
    });
  };

  const uploadResultsAcknowledgeMutation = useMutation<
    IBaseResponseService<any>,
    AxiosError<IBaseResponseService<IErrorResponseService>>,
    any
  >({
    mutationFn: uploadResultsAcknowledge,
  });

  const onFinishImportResultsAcknowledge = (values: IFormInputImportResults) => {
    const formData = new FormData();
    formData.append("files", values.files);
    uploadResultsAcknowledgeMutation.mutate(formData, {
      onSuccess: () => {
        message.success("Data berhasil diupload");
        queryClient.invalidateQueries({
          queryKey: ["results"],
        });
        onClose();
        onResetResultsAcknowledge();
      },
      onError: (err) => {
        makeResponseServiceError(dispatch, "import-results-acknowledge", err);

        if (
          err.response?.data.status.code == 400 &&
          err.response.data.result.errors
        ) {
          setErrorTableResultsAcknowledge(err.response.data.result.errors as any);
        }
      },
    });
  };

  return (
    <Page title="Results">
      <PageLabel
        title={<span className="font-semibold text-2xl">Results</span>}
        subtitle={
          <Breadcrumb
            items={[
              {
                href: "/",
                title: (
                  <>
                    <HomeOutlined />
                    <span>Home</span>
                  </>
                ),
              },
              {
                title: (
                  <div className="flex gap-1">
                    <IconSortDescendingNumbers size="1rem" />
                    <span>Results</span>
                  </div>
                ),
              },
              {
                title: "Results List",
              },
            ]}
          />
        }
        endSection={
          <Space>
            <Button
              icon={<IconUserCog size="1rem" />}
              onClick={showDrawerImportAcknowledge}
            >
              Import Results Acknowledge
            </Button>
            <Button
              type="primary"
              icon={<CloudDownloadOutlined />}
              onClick={showDrawerImportNew}
            >
              Import New Results
            </Button>
          </Space>
        }
      />
      <PageContent>
        <Card>
          <FilterTableResults
            onFinish={(values) => {
              setFilter(values);
            }}
          />
          <TableResults filter={filter} />
        </Card>
      </PageContent>
      <Drawer
        title="Import New Results"
        width={720}
        onClose={onClose}
        open={openDrawerImportNew}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <FormImportResultsNew
          onFinish={onFinishImportResultsNew}
          onReset={onResetResultsNew}
          isLoading={uploadResultsNewMutation.isPending}
        />
        {errorTableResultsNew.length > 0 && (
          <TableErrorValidationInfo
            title="Terdapat data yang tidak valid pada file yang diupload. Dibawah ini merupakan keterangan sejumlah baris, kolom dan pesan kesalahannya :"
            errors={errorTableResultsNew}
          />
        )}
      </Drawer>

      <Drawer
        title="Import Results Acknowledge"
        width={720}
        onClose={onClose}
        open={openDrawerImportAcknowledge}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <FormImportResultsAcknowledge
          onFinish={onFinishImportResultsAcknowledge}
          onReset={onResetResultsAcknowledge}
          isLoading={uploadResultsAcknowledgeMutation.isPending}
        />
        {errorTableResultsAcknowledge.length > 0 && (
          <TableErrorValidationInfo
            title="Terdapat data yang tidak valid pada file yang diupload. Dibawah ini merupakan keterangan sejumlah baris, kolom dan pesan kesalahannya :"
            errors={errorTableResultsAcknowledge}
          />
        )}
      </Drawer>
    </Page>
  );
};

export default Results;
