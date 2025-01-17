import { DownloadDocumentAction } from "Elements/Basic/File/FileAction";
import { IFileDownloadRequest } from "Elements/Basic/File/FileTypes";
import Loader from "Elements/Basic/Loader/Loader";
import { IErrorType } from "Lib/Types/SharedTypes";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { IPrintRequestData, IPrintResponseData } from "./ExportPdfInterfaces";
import DownloadService from "./ExportPdfService";

interface IBlobType {
  data: BlobPart;
}

const ExportPdf = (props: any) => {

  let requestData: IPrintRequestData =
  {
    documentId: 0,
    documentTypeCode: "",
    documentClassificationCode: "",
    roleCode: "",
    rights: "",
    payload: ""
  };

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  //const { printRequest } = (props.hasOwnProperty('location')) ? getUrlParam(props.location.pathname) : props;

  const getUrlParam = (str: string) => {
    return str.split('download/')[1];
  }

  if (props.hasOwnProperty('location')) {
    console.log("QR Code Request");
    console.log(props.location);
    requestData.payload = getUrlParam(props.location.pathname);

  } else {
    console.log("User Request");
    const { printRequest } = props;
    requestData = printRequest;
  }

  console.log(requestData);

  const handleDownload = () => {
    setLoading(true);
    DownloadService.ExportPdfService(requestData).then((res: IPrintResponseData) => {
      if (res.isAttachment) {
        getFile(res.attachmentIds, "Certificate");
        setLoading(false);
      }
      else {
        const fileContent = base64ToArrayBuffer(res.fileContent);
        saveByteArray(res.fileName, fileContent, res.fileContentType);
        setLoading(false);
      }
    }).catch((err: IErrorType) => {
      setLoading(false);
      swal("Unable to download certificate !", err.description, "error");
      console.log(err);
    });
  }

  const getFile = async (fileId: string, fileName: string) => {
    if (fileId) {
      const downloadData: IFileDownloadRequest = {
        id: `${fileId}`,
        fileName: fileName
      };
      dispatch(DownloadDocumentAction(downloadData));
    }
  };

  const base64ToArrayBuffer = (base64: any) => {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  const saveByteArray = (reportName: string, byte: any, contentType: string) => {
    const blob = new Blob([byte], { type: contentType });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = reportName;
    link.download = fileName;
    link.click();
  };

  useEffect(() => {
    handleDownload();
  }, [props]);

  return <div>{loading ? <Loader /> : null}</div>;
};

export default React.memo(ExportPdf);