import { Dictionary } from "./Dictionary"

export type Asset = {
  id: string;
  name: string;
  description?: string;
  media?: AssetMedia[];
  owner?: string;
}

export type AssetMedia = {
  id: string;
  media: Dictionary<string>;
  meta: any[];
  type: string;
  created_at: string;
  updated_at: string;
}