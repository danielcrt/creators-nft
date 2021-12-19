import api from "../api";
import resolve from "../utils/resolve";

const resourceUrl = 'assets/{assetId}/listings';

const getResourceUrl = (assetId: string): string => {
  return resourceUrl.replace('{assetId}', assetId);
}

export type CreateListingRequest = {
  price: number | undefined;
  expires_at: string | undefined;
  signature: string | undefined;
}
export const createListing = async (assetId: string, parameters: CreateListingRequest) => {
  return await resolve(api.post(getResourceUrl(assetId), parameters).then(res => res.data));
}

export const deleteListing = async (assetId: string, id: string) => {
  return await resolve(api.delete(`${getResourceUrl(assetId)}/${id}`).then(res => res.data));
}