export const AI_BASELINE_TRIBES = [
  "Client Services Tribe",
  "Automation Tribe",
  "Infrastructure Tribe",
  "Development Tribe",
  "Implementations Tribe",
  "Professional Services",
] as const;

export type AiBaselineTribe = (typeof AI_BASELINE_TRIBES)[number];

export const TRIBE_DIRECTORS = {
  "Client Services Tribe": "Andrey Brenes",
  "Automation Tribe": "Jonathan Herrera",
  "Infrastructure Tribe": "Fernando Golcher",
  "Development Tribe": "Laura Monge",
  "Implementations Tribe": "Harold Castillo",
  "Professional Services": "Adrian Duarte",
} as const satisfies Readonly<Record<AiBaselineTribe, string>>;

export type DirectorName = (typeof TRIBE_DIRECTORS)[AiBaselineTribe];

function uniqueDisplayValues<const T extends string>(values: readonly T[]): readonly T[] {
  return Array.from(new Set(values));
}

export const SERVICES_PRODUCTS_BY_TRIBE = {
  "Client Services Tribe": uniqueDisplayValues([
    "Card Services",
    "Informent",
    "Incident Response Team",
    "Nautilus Essentials",
    "Portico",
    "Premier",
    "Prologue",
    "ATM",
    "ECM",
    "Moogsoft",
    "Nautilus Essential",
    "Payments",
    "Corillian ASP",
    "Corporate systems",
    "InformEnt",
    "Problem Management",
    "Teller",
    "Incident Communication",
    "SCO IP Deposits",
    "Open Payments Platform",
    "Card Services Cash & Logistics (C&L)",
    "Card Services ITCM",
    "Cards Services Debit NE",
    "Cards Services Debit Risk",
    "Cards Services Debit Web",
    "Change Management",
    "Incident Management",
    "Architect; ROBO",
    "IP Email Processing",
    "Items Processing",
    "Mobiliti ASP; Mobiliti Lic",
    "ROBO",
    "Secure Now",
    "Signature",
    "Cleartouch",
    "Architect; DLO LoanDirector",
    "Deposit Essentials",
    "DLO LoanDirector",
    "DNA",
    "XP2",
    "Spreedy",
    "Spectrum",
    "BPM",
    "CUSA",
    "Automated Clearing House",
    "ServicePoint Admin",
    "Source Capture Optimization",
    "Precision",
  ]),
  "Automation Tribe": uniqueDisplayValues([
    "Data & Analytics",
    "Risk Intelligence",
    "Systems and applications",
    "RPA",
    "FraudGuard",
    "Nautilus Essential",
    "Prologue Web",
    "Systems and applications; Quadient",
    "UI/UX",
    "XD Create Digital",
    "Zelle FBPS; TransferNow",
    "Payment Exchange",
  ]),
  "Infrastructure Tribe": uniqueDisplayValues([
    "Signature; Teller; Communicator; AML; FDA; APS; CMS",
    "Client Infrastructure",
    "Enact",
    "Enterprise certificate governance",
    "Enterprise Citrix Engineering and Architecture",
    "Linux",
    "Network Operations Center",
    "Network Security Product (NSP) Firewall",
    "Windows operations",
    "Apigee",
    "Corporate systems",
    "ESF",
    "Fintech LATAM",
    "FTS Project Manager",
    "Signature, Teller, FDA, APS, Communicator, ABT, Rely, CRS, AML, Accounting & taxes",
    "App Market",
    "AppSec Pen Testing",
    "Communicator",
    "eLearning",
    "Premier",
    "Asset & Configuration Management",
    "Scripting; Workflows",
    "Systems and applications",
    "XD Create Digital",
    "Corillian Lic; Mobiliti Lic; Architect",
    "Event & Streaming",
    "FTS Connectivity",
    "Middleware & Containers",
  ]),
  "Development Tribe": uniqueDisplayValues([
    "Corillian ASP",
    "Deposit Essentials",
    "Mobiliti Resubmission App Build",
    "Mobiliti Resubmissions",
    "Mobiliti Retail",
    "Secure Now",
    "XD Configure Digital",
    "Dev Project Management",
    "Digital Banking Platform",
    "Mobiliti Business ASP",
    "Loan Director",
    "Mortgage Director",
    "Premier",
    "Weiland",
    "Corillian ASP; Deposit Essentials",
    "Corillian ASP; Mortgage Director",
    "Corillian ASP; Premier",
    "Mobiliti Business ASP; Digital Banking Platform",
    "Portico; VB Next",
    "Merchants Deposits",
    "XD Create Digital",
    "Portico",
    "VB Next",
  ]),
  "Implementations Tribe": uniqueDisplayValues([
    "CashFlow Central",
    "Zelle Direct; Billpay/RXP Direct; TransferNow",
    "CardHub",
    "Contactless",
    "Precision, Premier",
    "Token",
    "BillPay/RXP; TransferNow",
    "ECM Nautilus; Nautilus Essential",
    "Nautilus Essential; Prologue",
    "TransferNow",
    "Zelle Direct; TransferNow",
    "Zelle FBPS; TransferNow",
    "Zelle FBPS; TransferNow; TCH - FedNow",
    "Zelle VAR",
    "Nautilus Essentials",
    "Mobiliti Business ASP",
    "Zelle VAR; AllData; TransferNow",
    "Deposit Director Flex (DLO)",
    "Deposit Essentials",
    "EMV Contactless",
    "Rapid View; DDRM; Mobile Source Capture",
    "XD Create Digital",
    "Prologue",
  ]),
  "Professional Services": uniqueDisplayValues([
    "Corillian Lic; Mobiliti Lic; Architect",
    "DNA",
    "XD Create Digital",
    "ROBO",
    "Commercial Banking",
    "Corillian Lic; Mobiliti Lic",
    "Corillian Lic; Mobiliti Lic; XD Create Digital",
  ]),
} satisfies Readonly<Record<AiBaselineTribe, readonly string[]>>;

export type ServiceProductName =
  (typeof SERVICES_PRODUCTS_BY_TRIBE)[AiBaselineTribe][number];

export type AiBaselineCatalogEntry = Readonly<{
  tribe: AiBaselineTribe;
  director: DirectorName;
  servicesProducts: readonly string[];
}>;

export const AI_BASELINE_CATALOG = AI_BASELINE_TRIBES.map((tribe) => ({
  tribe,
  director: TRIBE_DIRECTORS[tribe],
  servicesProducts: SERVICES_PRODUCTS_BY_TRIBE[tribe],
})) satisfies readonly AiBaselineCatalogEntry[];

export function isAiBaselineTribe(tribeName: string): tribeName is AiBaselineTribe {
  return AI_BASELINE_TRIBES.includes(tribeName as AiBaselineTribe);
}

export function getDirectorByTribe(tribeName: string): DirectorName | "" {
  return isAiBaselineTribe(tribeName) ? TRIBE_DIRECTORS[tribeName] : "";
}

export function getServicesProductsByTribe(tribeName: string): readonly string[] {
  return isAiBaselineTribe(tribeName) ? SERVICES_PRODUCTS_BY_TRIBE[tribeName] : [];
}
