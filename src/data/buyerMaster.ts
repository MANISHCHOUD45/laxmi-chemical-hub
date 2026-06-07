import masterData from "@/components/quotation/Master.json";

export interface BuyerOption {
  id: string;
  label: string;
  gstNumber?: string;
  mobile?: string;
  email?: string;
  billingAddress?: string;
  state?: string;
  pincode?: string;
  city?: string;
  searchKey: string;
}

function normalizeText(value: unknown): string {
  if (!value && value !== 0) return "";
  return String(value)
    .replace(/\s+/gu, " ")
    .trim();
}

function normalizeAddress(address: unknown): string {
  if (!address) return "";
  if (Array.isArray(address)) {
    return address
      .flatMap((item) => (Array.isArray(item) ? item : [item]))
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
      .join(", ");
  }
  return String(address).trim();
}

function normalizeArrayField(value: unknown): string {
  if (!value) return "";
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => (Array.isArray(item) ? item : [item]))
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
      .join(" ");
  }
  return String(value).trim();
}

function parseCityFromAddress(lines: string[]): string {
  if (!lines.length) return "";
  const text = lines.join(" ");
  const match = text.match(/([A-Za-z ]+?)\s+\d{6}/);
  if (match?.[1]) {
    return match[1].trim().replace(/[,\s]+$/u, "");
  }
  return "";
}

function buildBillingAddress(record: any): string {
  const mailing = Array.isArray(record.ledmailingdetails) ? record.ledmailingdetails[0] : undefined;
  const addressFromMailing = normalizeAddress(mailing?.address);
  const oldAddress = normalizeAddress(record.oldaddress);
  if (addressFromMailing) return addressFromMailing;
  if (oldAddress) return oldAddress;
  return "";
}

function buildState(record: any): string {
  const mailing = Array.isArray(record.ledmailingdetails) ? record.ledmailingdetails[0] : undefined;
  return normalizeText(mailing?.state) || normalizeText(record.priorstatename) || normalizeText(record.oldledstatename);
}

function buildPincode(record: any): string {
  const mailing = Array.isArray(record.ledmailingdetails) ? record.ledmailingdetails[0] : undefined;
  return normalizeText(mailing?.pincode) || normalizeText(record.oldpincode);
}

function buildMobile(record: any): string {
  const mobile = normalizeText(record.ledgermobile);
  if (!mobile) return "";
  return mobile
    .split(/[;,|]/u)
    .map((item) => item.trim())
    .find(Boolean) || mobile;
}

function buildBuyerOption(record: any): BuyerOption | null {
    console.log("Processing record:", record); // Debug log to inspect the record structure
  if (record?.metadata?.type !== "Ledger") return null;

  const label = normalizeText(
    record?.metadata?.name || record?.mailingname || normalizeArrayField(record?.oldmailingname)
  );
  if (!label) return null;

  const gstNumber = normalizeText(
    record.partygstin || record.gstin || record?.ledgstregdetails?.[0]?.gstin
  );
  const email = normalizeText(record.email);
  const mobile = buildMobile(record);
  const billingAddress = buildBillingAddress(record);
  const state = buildState(record);
  const pincode = buildPincode(record);
  const city = parseCityFromAddress(
    billingAddress.split(",").map((part) => part.trim()).filter(Boolean)
  );

  const searchKey = [
    label,
    normalizeText(record?.mailingname),
    normalizeArrayField(record?.oldmailingname),
    normalizeAddress(record?.oldaddress),
    normalizeAddress(record?.ledmailingdetails?.[0]?.address),
    normalizeText(record.priorstatename),
    normalizeText(record.oldledstatename),
    normalizeText(record.oldpincode),
    normalizeText(record.ledgermobile),
    normalizeText(record.incometaxnumber),
    normalizeText(record.countryofresidence),
    gstNumber,
    email,
    mobile,
    billingAddress,
    state,
    pincode,
    city,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return {
    id: normalizeText(record.guid) || label,
    label,
    gstNumber,
    mobile,
    email,
    billingAddress,
    state,
    pincode,
    city,
    searchKey,
  };
}

export function buildBuyerOptions(source: any): BuyerOption[] {
  if (!source || !Array.isArray(source.tallymessage)) return [];

  return source.tallymessage
    .map((item: any) => buildBuyerOption(item))
    .filter((option): option is BuyerOption => Boolean(option));
}

export const buyerOptions: BuyerOption[] = buildBuyerOptions(masterData);

export function loadBuyerOptions(): BuyerOption[] {
  return buyerOptions;
}
