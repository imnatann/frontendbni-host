import FormFieldDescriptionAndEvidence from "@smpm/components/FormFields/FormFieldDescriptionAndEvidence";
import React from "react";

type UploadEvidenceAndNoteProps = {
  hide?: boolean;
};

const UploadEvidenceAndNote: React.FC<UploadEvidenceAndNoteProps> = ({
  hide,
}) => {
  return (
    <div style={{ display: hide ? "none" : "block" }}>
      <FormFieldDescriptionAndEvidence />
    </div>
  );
};

export default UploadEvidenceAndNote;
