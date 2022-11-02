import { Timestamp } from '@google-cloud/firestore';
import { FieldType, TestState } from './dictionaries';
export interface AnyObject {
    [key: string]: any;
}

export interface ClientPartner {
    cPartnerID: string;
    partnerID: string;
    createdDT: string;
    partnerName: string;
    isActive: boolean;
    logo: string;
}

export interface QbenchConsolidationResults {
    id: string;
    sendMessagesAboutTestResults: boolean;
    location: Location;
    appointment_date: string;
    tests: Tests;
    customer_account_id: number;
    slot: Slot;
    address: {
        zipCode: string;
        address: string;
        city: string;
        state: string;
    };
    firstName: string;
    lastName: string;
    middleName?: string;
    birthDate: string;
    email: string;
    phone: string;
    minors: Minor[];
    hasSymptoms: boolean;
    symptoms: string[];
    hasConditions: boolean;
    hadContact: boolean;
    sex: string;
    race: string;
    ethnicity: string;
    departureDateAndTime: string;
    isExpressSameDayTest: boolean;
    paymentIntentId?: string;
    confirmationId?: string;
    qbenchId?: string;
}

export interface DashboardSummary {
    summarydate: string;
    clientpartnerid: string;
    locationid: number;
    location: string;
    slottime: string;
    gender: string;
    appointmentcount: number;
    detectedcount: number;
    notdetectedcount: number;
    femalecount: number;
    malecount: number;
    prefernottostate: number;
}

export interface Location {
  name: string;
  address1: string;
  address2: string;
  qbenchCustomerId: number;
  GMT?: string;
  limsinfo?: {
    label: string;
    type: string;
    orgId: string;
    testId: string;
  };
  locationlink?: string;
  CLIA?: string;
  isQRCodeSend?:boolean;
  isNpDestination?: boolean;
  qbenchExpressAssayId?: number;
  qbenchRapidAssayId?: number;
  qbenchStandardAssayId?: number;
  qbenchAntigenAssayId?:number;
  room?: string;
}

export interface Appointment {
    id: string;
    isCLXHealth: boolean;
    sendMessagesAboutTestResults: boolean;
    location: Location | null;
    date: string | null;
    slot: Slot | null;
    address: {
        zipCode: string;
        address: string;
        city: string;
        state: string;
    };
    firstName: string;
    lastName: string;
    birthDate: string | null;
    email: string;
    phone: string;
    minors: Minor[];
    guardian: {
        firstName: string;
        lastName: string;
        relationship: string;
        phone: string;
        email: string;
    };

    govtID: GovtID[];
    facultyID: string;
    staffID: string;
    fileName: string;
  registeringFor: string;
  hasSymptoms: boolean | null;
  barcode: boolean | null;
  symptoms: string[];
  hasConditions: boolean | null;
  hadContact: boolean | null;
  isPrimary: boolean;
  sex: string | null;
  race: string | null;
  ethnicity: string | null;
  departureDateAndTime: string | null;
  isExpressSameDayTest: boolean;
  payingMethod: string;
  socialSecurityNumber: string;
  driverLicenseNumber?: string;
  middleName?: string;
  paymentIntentId?: string;
  confirmationId?: string;
  qbenchId?: string;
  isDone?: boolean;
  acknowledgementId?: string;
  createddate: string;
  isHACustomer: boolean;
  haCustomer?: boolean | null;
  hasMinors: boolean;
  isParentOrGuardian?: boolean;
  results?: any;
  crelioId?: number;
  passportCountry?: any;
  passportNo?: string;
  destination?: any;
  IsAirline?: boolean;
  airlineCode?: any;
  travelType?: string;
  hasInsurance: boolean | null;
  insurance: {
    id: string;
    email: string;
    insuranceId: string;
    group: string;
    subscriberFirstName: string;
    subscriberLastName: string;
    frontCard: string;
    backCard: string;
    payerList: string;
  };
  isRapidTest?: boolean;
  cPartnerID?: string | null;
  confirmPassword?: string;
  hasAgreement?: boolean;
  hasMarketCommuni?: boolean;
  isINTNameFormat?: boolean;
  isVerified?: boolean;
  licenseBackCard: string | null;
  licenseFrontCard: string | null;
  password?: string;
  rescheduleReservationId?: string;
  reservationCount?: number;
  reservationId?: string | null;
  testSelection?: string;
  userSelect?: boolean;
  district: string;
  school: any;
  studentID: string;
  isNotHavePermanentAddress: boolean;
  schoolTestFor: string;
  couponId: string;
  X_PATIENT_EXTERNAL_ID?: string;
  note?:Object | string;
  isSolvHealth?: boolean;
  isAntigen:boolean|undefined;
  amount?:number;
  discountAmount?:number;
  isWalkUpTest?: boolean;
  promoCode?:string | null;
  isReelHealth?: boolean;
  checkInTime:string;
  GroupNumber?:any;
  BookingIdHash?:string;
}

export interface CrelioAcknowledgement extends Appointment {
    X_PATIENT_EXTERNAL_ID: string;
    X_EXTERNAL_ACCESSION_ID: string;
    sampleId: string;
    billId: number;
    crelioId: number;
}

export interface Form extends Appointment {
    hipaaConfirmed: boolean;
    consentForTesting: boolean;
    commitToAttend: boolean;
    agreeToCancel: boolean;
    confirmationId: string;
    confirmEmail: string;
}

export interface Period {
    label: string;
    startTime: Date;
    available: number;
    index: number;
}

export interface Slot {
  date: string;
  period?: any;
  locationId: number;
  label?: string;
}

export interface Tests {
    results: string;
    state: string;
    date_created: string;
    complete_date_formated: string;
}

export interface Location {
    address1: string;
    addres2: string;
    name: string;
    qbenchCustomerId: number;
    cPartnerID?: any;
}

export interface AppointmentsListParams {
    firstName: string;
    lastName: string;
    middleName?: string;
    confirmationId: string;
    phone: string;
    birthDate: string;
    email: string;
    date: string;
    locationQbenchId: number | null;
    sampleId: number | null;
    thirdPartyAppointments?:string;
    BookingIdHash?:string;
    toggle?:string;
    status?:string;
}

export interface Minor {
    firstName: string;
    lastName: string;
    birthDate: string | null;
    relationship: string;
    sex: string;
    race: string;
    ethnicity: string;
    middleName?: string;
    passportCountry?: string;
    passportNo?: string;
    school?: any;
    studentID?: string;
    schoolTestFor: string;
    email?: string;
    notification: boolean | null | undefined;
}

export interface GovtID {
    id: string;
    email: string;
    frontCard: string | null;
    backCrad: string | null;
}

export interface Insurance {
    id: string;
    email: string;
    insuranceId: string;
    group: string;
    subscriberFirstName: string;
    subscriberLastName: string;
    frontCard: string;
    backCard: string;
    payerList: string;
}

export interface MinorwithSample {  
    firstName: string;
    lastName: string;
    middleName?: string;
    birthDate: string | null;
    relationship: string;
    sampleId: string;
    ackid: string;
    passportCountry?: string;
    passportNo?: string;
    email?: string | null;
    notification: boolean | null | undefined;
    school:any
}

export interface StepsState {
    form: Form;
    showChangeLocationModal: boolean;
    prices: {
        standard: number;
        expedited: number;
    };
    step: number;
    configured: boolean;
}

export interface Value {
    value: string;
    label: string;
}

export interface Test {
    X_INSTRUMENT_ID: null;
    X_KIT_LOT: null;
    X_REVIEWED_DATE: null;
    X_TEST_LOCATION: string;
    assay_id: number;
    batches: [];
    comments: null;
    date_created: string;
    has_report: false;
    id: string;
    last_updated: string;
    panel_id: null;
    report_emailed: false;
    sample_id: string;
    tags: [];
    tech_id: number;
    worksheet_data: string;
    qbdb: string;
    X_REVIEWED_BY: {
        id: string;
        text: string;
    };
    complete_date: string;
    start_date: string;
    results: 'DETECTED' | 'NOT DETECTED' | null;
    state: TestState;
    assay: {
        method: string;
    };
}

export interface Sample {
    X_PATIENT_ACCOUNT_NUMBER: null;
    X_PATIENT_ADDRESS1: string;
    X_PATIENT_ADDRESS2: null;
    X_PATIENT_CITY: string;
    X_PATIENT_SEX: string;
    X_PATIENT_STATE: string;
    X_PATIENT_ZIP_CODE: string;
    accessioning_type_id: number;
    attachment_count: number;
    batches: [];
    comments: null;
    date_created: string;
    has_report: false;
    id_hash: string;
    lab_id: null;
    last_updated: string;
    location: null;
    order_id: string;
    order_request: false;
    partially_complete: false;
    received: false;
    report_emailed: false;
    source_id: null;
    tags: [];
    id: string;
    X_ASSIGNING_AUTHORITY: string;
    X_EXTERNAL_ACCESSION_ID: string;
    X_PATIENT_FIRST_NAME: string;
    X_PATIENT_LAST_NAME: string;
    X_PATIENT_EXTERNAL_ID: string;
    X_PATIENT_DOB: string;
    accessioning_type: {
        id: number;
        value: string;
    };
    tests: Test[];
    time_of_collection: string;
}

export interface QbenchOrderResponse {
    id: number;
    custom_formatted_id: string;
    X_SPECIMEN_COUNT: string;
    samples: Sample[];
    status?: number;
}

export interface Result {
    confirmationId: string;
    testResult: string;
    testMethod: string;
    sampleType: string;
    patientName: string;
    patientDOB: string;
    collectionDate: string;
    collectionLocation: Location | null;
    provider: string;
    reviewedBy: string;
    qbenchId: string;
    completeDate: string;
    specimenCount: string;
    patientId: string;
    sampleId: string;
    accessionId: string;
    technician: string;
}


export interface AppointmentListItem {
  id: string;
  date?: string | null;
  appointmentId?: string;
  slot: Slot | null;
  period: number | null;
  firstName: string;
  lastName: string;
  birthDate: string | null;
  phone: string | null;
  departureDateAndTime: string | null;
  symptoms?: string[];
  hadContact?: boolean | null;
  isExpressSameDayTest: boolean | null;
  results: string | null;
  confirmationId?: string;
  email: string;
  sampleId: string;
  middleName?: string;
  qbenchId?: string;
  crelioId?: string | null;
  billId?: string | null;
  minorIndex: number | null;
  acknowledgementId?: string;
  isRapidTest?: boolean | null;
  travelType?: string | null ;
  destination?: string | null ;
  IsAirline?: string | null ;
  airlineCode?: any | null;
  isCanceled?: boolean;
  collectionmethod?: any;
  IsDestFlag?: boolean;
  X_PATIENT_EXTERNAL_ID?: string;
  location?: any;
  isCheckedIn?: boolean;
  note?: Object | string ;
  payingMethod:any;
  isAntigen:boolean|undefined;
  isRelease:boolean;
  checkInTime: string | null;
  checkInExpTime: string | null;
  isResultReportGenerated:boolean|undefined;
  cPartnerID?:string;
  room?: string;
  isSolvHealth?:boolean;
  isReelHealth?:boolean;
  isCLXHealth?:boolean;
  testSelection?:string | null;
  promoCode?:string;
  noShow?:string
}

export interface Comparables {
    [name: string]: {
        type: FieldType;
        data?: AnyObject; // this potentially contain any data needed for comparison
    };
}

export interface AppointmentwithSample {
    id: string;
    sendMessagesAboutTestResults: boolean;
    location: Location | null;
    date: string;
    slot: Slot | null;
    address: {
        zipCode: string;
        address: string;
        city: string;
        state: string;
    };
    firstName: string;
    lastName: string;
    middleName?: string;
    birthDate: string | null;
    email: string;
    phone: string;
    minors: MinorwithSample[];
    hasSymptoms: boolean | null;
    symptoms: string[];
    hasConditions: boolean | null;
    hadContact: boolean | null;
    sex: string | null;
    race: string | null;
    ethnicity: string | null;
    departureDateAndTime: string | null;
    isExpressSameDayTest: boolean;
    paymentIntentId?: string;
    confirmationId?: string;
    qbenchId?: string;
    isDone?: boolean;
    sampleId: string;
    ackid: string;
    passportCountry?: string;
    passportNo?: string;
    acknowledgementId?: string;
    appointmentId: string;
    registeringFor: string;
    note?: Object | string;
}

export interface AppointmentwithSampleParam {
    firstName: string;
    lastName: string;
    birthDate: string | null;
    sampleId: string;
    middleName?: string;
    qbenchId?: string;
}

export interface AppMaster {
    client_id: string;
    client_secret: string;
}

export interface AppointmentAcknowledgement {
  id: string;
  appointmentId?: string;
  sendMessagesAboutTestResults: boolean;
  location: Location | null;
  date: string | null;
  slot: Slot | null;
  address: {
    zipCode: string;
    address: string;
    city: string;
    state: string;
  };
  firstName: string;
  lastName: string;
  birthDate: string | null;
  email: string;
  phone: string;
  hasSymptoms: boolean | null;
  symptoms?: string[];
  hasConditions?: boolean | null;
  hadContact: boolean | null;
  sex: string | null;
  race: string | null;
  ethnicity: string | null;
  departureDateAndTime: string | null;
  isExpressSameDayTest: boolean;
  middleName?: string;
  paymentIntentId?: string;
  confirmationId?: string;
  qbenchId?: string;
  isDone?: boolean;
  sampleId: string;
  minorIndex: number | null;
  results: string | null;
  acknowledgementId?: string;
  isRapidTest?: boolean;
  travelType?: string | null;
  destination?: any | null;
  IsAirline?: string | null;
  airlineCode?: any | null;
  isCanceled?: boolean;
  accessioning_type_id?: any | null;
  X_PATIENT_EXTERNAL_ID?: string;
  isCheckedIn?: boolean;
  note?: Object | string;
  payingMethod:any;
  isAntigen:boolean|undefined;
  isRelease?:boolean;
  checkInTime: string | null;
  checkInExpTime: string | null;
  isResultReportGenerated:boolean|undefined;
  isSolvHealth?:boolean;
  isReelHealth?:boolean;
  isCLXHealth?:boolean;
  testSelection?:string | null;
  promoCode?:string;
  noShow?:string
}

export interface CrelioAckData extends AppointmentAcknowledgement {
    crelioId: string;
    billId: string;
}

export interface CheckIn {
    phone: string | number;
    bookingNo: string;
}

export interface Reschedule {
    appointmentDate: string;
    billId: string | null;
    appointmentId: string | null;
}

export interface LocationClientPartner extends Location {
    cPartnerID: string;
}
export interface ClientpPartnerWithTenant extends ClientPartner {
    tenantid: string;
}

export interface Register {
    id: string;
    email: string;
    password: string;
    postCode: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    birthDate: string | null;
    phone: string;
    hasMinors: boolean;
    minors: Minor[];
    address: {
        zipCode: string;
        address: string;
        city: string;
        state: string;
    };
    sex: string | null;
    race: string | null;
    ethnicity: string | null;
    // hasInsurance: boolean;
    // insurance: Insurance[];
}

export interface UserDetails {
    email: string;
    password: string;
    postCode: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    birthDate: string | null;
    phone: string;
    hasMinors: boolean;
    minors: Minor[];
    address: {
        zipCode: string;
        address: string;
        city: string;
        state: string;
        country: string;
    };
    sex: string | null;
    race: string | null;
    ethnicity: string | null;
    airline: string | null;
    cPartnerID?: string | null;
    passportCountry: string | null;
    passportNo: string | null;
    destination: string | null;
    IsAirline: boolean;
    airlineCode: any | null;
    travelType: string | null;
    studentID?: string;
    school?: any;
    schoolTestFor?: string;
    isChangeEmail?:boolean;
}

export interface User {
    id: number;
    dateCreated: number;
    username: string;
    password: string;
    email: string;
}

export interface Session {
    id: number;
    dateCreated: number;
    username: string;
    issued: number;
    expires: number;
}

export type PartialSession = Omit<Session, 'issued' | 'expires'>;

export interface EncodeResult {
    token: string;
    expires: number;
    issued: number;
}

export type DecodeResult =
    | {
          type: 'valid';
          session: Session;
      }
    | {
          type: 'integrity-error';
      }
    | {
          type: 'invalid-token';
      };

export type ExpirationStatus = 'expired' | 'active' | 'grace';

export interface TelemedicineProviders {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    username: string;
    createddate: Timestamp;
    updateddate: Timestamp;
    isActive: boolean;
    type: string;
    imageURL: string;
    eventType: string;
}
