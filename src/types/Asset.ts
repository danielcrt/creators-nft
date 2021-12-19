import { Collection } from "."
import { Listing } from "./Listing"

export type Asset = {
  id: string;
  token_id?: string;
  name: string;
  description?: string;
  media?: AssetMedia[];
  owner?: string;
  collection?: Collection;
  listing?: Listing | null;
}

export type AssetMedia = {
  id: string;
  media: AssetMediaSizes;
  meta: any[];
  type: string;
  created_at: string;
  updated_at: string;
}

export type AssetMediaSizes = {
  original: string;
  2000: string;
  1000: string;
  500: string;
  150: string;
  [key: string]: string;
}