import api from "../api";
import resolve from "../utils/resolve";

const resourceUrl = 'assets/{assetId}/listings';

const getResourceUrl = (assetId: string): string => {
  return resourceUrl.replace('{assetId}', assetId);
}

export type CreateListingRequest = {
  price: number | undefined;
  expires_at: string | undefined;
}
export const createAsset = async (assetId: string, parameters: CreateListingRequest) => {
  return await resolve(api.post(getResourceUrl(assetId), parameters).then(res => res.data));
}