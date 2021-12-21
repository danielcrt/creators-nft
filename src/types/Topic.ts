import { Transfer } from ".";
import { Log } from "./Log";
import { TokenPurchase } from "./TokenPurchase";

export type EthereumTopic = {
  id: string;
  hash: string;
  topicable: Transfer | TokenPurchase;
  log?: Log;
  created_at: string;
  updated_at: string;
}