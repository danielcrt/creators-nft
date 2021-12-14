export type AssetType = {
  name: string;
  description?: string;
  media?: AssetMedia;
  owner?: string;
}

export type AssetMedia = {
  [key: string]: string;
}