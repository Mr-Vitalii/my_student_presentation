export type slideDataTypes = {
  id: number;
  title?: string;
  text?: string;
  listName?: string;
  list?: string[];
  youTubeLink?: string;
  image?: string;
  imagePosition?: string;
  expand?: boolean;
  additionalInformation?: boolean;
  additionalContent?: string[];
  additionalVideo?: string;
  additionalVideo_2?: string;
};

export type modalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
