import "./ChemicalLabel.css";
import laxmiLogo from "@/assets/laxmi-chemicals-logo.png";
import type { ProductSafety } from "@/data/productSafety";

export interface ChemicalLabelProps {
  productName: string;
  batchNo: string;
  invoice: string;
  mfgDate: string;
  expDate: string;
  make: string;
  netQty: string;
  tareQty: string;
  grossQty: string;
  safety: ProductSafety;
}

/* ── Inline SVG Sub-Components ───────────────────── */

const LaxmiLogo = () => (
  <img src={laxmiLogo} alt="Laxmi Chemicals" className="cl__logo-img" />
);

const GhsFlame = () => (
  <svg viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
    <polygon points="42,0 84,42 42,84 0,42" fill="#FFF" stroke="#EF1A1A" strokeWidth="5" strokeLinejoin="round" />
    <path d="M42 18 C 37 28, 28 33, 28 48 C 28 58, 33 65, 40 68 C 37 62, 39 55, 44 52 C 47 57, 45 63, 47 68 C 53 65, 58 58, 57 50 C 57 43, 52 39, 49 32 C 47 37, 44 35, 42 18 Z" fill="#111" />
    <rect x="30" y="62" width="24" height="3" rx="1" fill="#111" />
  </svg>
);

const GhsExclamationTriangle = () => (
  <svg viewBox="0 0 84 84" xmlns="http://www.w3.org/2000/svg">
    {/* Equilateral triangle with slightly rounded corners */}
    <path
      d="M42 6 L78 70 Q79 74, 75 74 L9 74 Q5 74, 6 70 Z"
      fill="#FFF"
      stroke="#EF1A1A"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    {/* Exclamation mark */}
    <rect x="38.5" y="28" width="7" height="24" rx="1.5" fill="#111" />
    <circle cx="42" cy="62" r="3.8" fill="#111" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="cl__wa-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
      fill="#25D366"
    />
    <path
      d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.11-1.14l-.29-.174-3.01.79.8-2.93-.19-.3A7.96 7.96 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"
      fill="#25D366"
    />
  </svg>
);

/** Helper: render a data row. `alwaysShow` keeps the row visible even if value is empty. */
const DataRow = ({
  label,
  value,
  red,
  alwaysShow,
}: {
  label: string;
  value: string;
  red?: boolean;
  alwaysShow?: boolean;
}) => {
  if (!value && !alwaysShow) return null;
  return (
    <div className="cl__data-row">
      <span className="cl__data-key">{label}</span>
      <span className="cl__data-colon">:</span>
      <span className={`cl__data-val${red ? " cl__data-val--red" : ""}`}>{value}</span>
    </div>
  );
};

/** Split "Inhalation – ... \n Ingestion – ..." into two clean strings */
const splitInhalationIngestion = (combined: string): [string, string] => {
  const parts = combined.split("\n");
  const inhalation = (parts[0] || "").replace(/^\s*Inhalation\s*[\u2013-]\s*/i, "");
  const ingestion = (parts[1] || "").replace(/^\s*Ingestion\s*[\u2013-]\s*/i, "");
  return [inhalation, ingestion];
};

/* ── Label Component ─────────────────────────────── */

const ChemicalLabel = ({
  productName,
  batchNo,
  invoice,
  mfgDate,
  expDate,
  make,
  netQty,
  tareQty,
  grossQty,
  safety,
}: ChemicalLabelProps) => {
  const [inhalation, ingestion] = splitInhalationIngestion(safety.inhalationIngestion);

  return (
    <div className="cl">
      {/* ── Top Red Banner ──────────────────────── */}
      <div className="cl__header">
        <span className="cl__header-text">{productName}</span>
      </div>

      {/* ── Body — 3 Columns ────────────────────── */}
      <div className="cl__body">
        {/* ═════ COLUMN 1 — Company Info ═════ */}
        <div className="cl__col cl__col--1">
          <div className="cl__marketed">Marketed By :</div>
          <div className="cl__logo"><LaxmiLogo /></div>

          <div className="cl__company-name">LAXMI CHEMICALS</div>
          <div className="cl__address-line">Plot No.B-4, Hebbal Industrial Area,</div>
          <div className="cl__address-line">Mysore, Karnataka &ndash; 570016</div>
          <div className="cl__address-line">
            E-mail : <span className="cl__email">laxmichem7@gmail.com</span>
          </div>
          <div className="cl__address-phone">
            <WhatsAppIcon />
            +91 9886174335
          </div>

          <div className="cl__data-card">
            <DataRow label="MFG DATE" value={mfgDate} red alwaysShow />
            <DataRow label="INVOICE" value={invoice} red alwaysShow />
            <DataRow label="BATCH" value={batchNo} alwaysShow />
            <DataRow label="MAKE" value={make} alwaysShow />
            <DataRow label="EXP DATE" value={expDate} red alwaysShow />
            <DataRow label="NET QTY" value={netQty} />
            <DataRow label="TARE QTY" value={tareQty} />
            <DataRow label="GROSS QTY" value={grossQty} />
          </div>
        </div>

        {/* ═════ COLUMN 2 — Hazards + First Aid + DANGEROUS ═════ */}
        <div className="cl__col cl__col--2">
          <div className="cl__section">
            <div className="cl__section-title">HAZARDOUS STATEMENT</div>
            <p className="cl__section-body">{safety.hazardous}</p>
          </div>

          <div className="cl__section">
            <div className="cl__section-title">PRECAUTIONARY STATEMENT</div>
            <div className="cl__section-body">
              {safety.precautionary.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>

          <div className="cl__section">
            <div className="cl__section-title">FIRST AID MEASURES</div>
            <div className="cl__section-subtitle">EYE CONTACT</div>
            <p className="cl__section-body">{safety.firstAidEye}</p>
          </div>

          <div className="cl__dangerous-wrap">
            <div className="cl__dangerous">DANGEROUS!</div>
          </div>
        </div>

        {/* ═════ COLUMN 3 — Exposure Response + Pictograms ═════ */}
        <div className="cl__col cl__col--3">
          <div className="cl__section">
            <div className="cl__section-subtitle">SKIN CONTACT</div>
            <p className="cl__section-body">{safety.skinContact}</p>
          </div>

          {inhalation && (
            <div className="cl__section">
              <div className="cl__section-subtitle">INHALATION</div>
              <p className="cl__section-body">{inhalation}</p>
            </div>
          )}

          {ingestion && (
            <div className="cl__section">
              <div className="cl__section-subtitle">INGESTION</div>
              <p className="cl__section-body">{ingestion}</p>
            </div>
          )}

          <div className="cl__pictograms">
            <div className="cl__pictogram"><GhsFlame /></div>
            <div className="cl__pictogram cl__pictogram--triangle"><GhsExclamationTriangle /></div>
          </div>
        </div>
      </div>

      {/* ── Bottom Red Banner ───────────────────── */}
      <div className="cl__footer">
        <span className="cl__footer-text">
          SEE MATERIAL SAFETY DATA SHEET FOR FURTHER REGARDING THIS PRODUCT
        </span>
      </div>
    </div>
  );
};

export default ChemicalLabel;
