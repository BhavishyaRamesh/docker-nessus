export enum SortByDirection {
    Ascending = 'ascending',
    Descending = 'descending',
}

export enum FieldType {
    Text,
    Date,
}

export enum TestState {
    Completed = 'COMPLETED',
    NotStarted = 'NOT STARTED',
}

export enum HttpMethod {
    HTTP_METHOD_UNSPECIFIED = 0,
    POST = 1,
    GET = 2,
    HEAD = 3,
    PUT = 4,
    DELETE = 5,
    PATCH = 6,
    OPTIONS = 7,
}
export enum Appointment {
    Rescheduled = 'Appointment Rescheduled Successfully',
    Cancel = 'cancelAppointment reservationId',
    DeleteResponse = 'Response of Delete Appointment',
}
export enum errorMessage {
    NotAllRequiredParams = 'Not all required params are present',
    RequestEmpty = 'Either request or body is an empty object',
    InvalidUserID = 'Invalid User ID',
    InvalidEmail = 'Invalid Email ID',
    InvalidSearchdata = 'Invalid Search By data',
    InvalidPassword = 'Invalid Password',
    EmailSent = 'Email Sent Successfully',
    noDataFound = 'No Data Found',
    addMessage = 'Data Added Successfully',
    cancelMessage = 'Appointment Cancelled',
    updatedMessage = 'Data Updated Successfully',
    deleteMessage = 'Data Deleted Successfully',
    fetchMessage = 'Data Fetched Successfully',
    dateFormat = 'Invalid Date format',
    incorrectPhone = 'Incorrect Phone Number',
    passwordMissMatch = 'Password Miss match',
    sampleDetailsMissing = 'Sample details are missing',
    WrongConfirmationId = 'Please check the confirmationID',
    tokenGenerated = 'Token generated sucessfully',
    tokenNotGenerated = 'Unable to generate token',
    unableAdding = 'Unable to add user please try again',
    accountCreation = 'Account created successfully',
    somethingwentWrong = 'Something went wrong please try again',
    dateRangeExceeded = 'Date Range Should Not Exceed 10 Days',
    checkinsuccess = 'successfully checkedIn',
    otpMessage = 'Unable to send an otp to Your Email',
    crtSamplid = 'Please Pass correct Sample ID',
    dataBaseResponse = "Database hasn't responded",
    inValidStatus = 400,
    invalidcard = "Invalid Card",
    invalidCardNumber = "Invalid CardNumber",
    invalidPaymentMethod = "Invalid PaymentMethod",
    invalidCardName = "Invalid CardName",
    invalidcardDetails ="Invalid Card Details",
    invalidToken = 'Invalid Access Token',
    useridReq = 'User Id is required',
    invalidMail = 'Invalid email address',
    paymentIntent = ' PaymentIntentId not created',
    noEmailINSL = 'Email is not presented in your social Account. Please try with different account',
    noAccountFount= 'Account not found. Please create a new account',
    noApptFound = 'No appointment found',
    latLongErr = 'latitude or longitude fails to match the required pattern',
    invalidParams = 'Invalid params',
    confirmationMail='Confirmation Mail Sent Successfully',
    incorrectApptData = "Appointment has Incorrect Data",
    noTechIdReviewedByreportConfigId = "The QBench <b>Technician ID and Reviewed By and Report ID</b> fields are required in order to release results. Please contact Steve Wilson and Anton Co to get this fixed.",
    noTechIdReviewedBy = "The QBench <b>Technician ID and Reviewed By</b> field is required in order to release results. Please contact Steve Wilson and Anton Co to get this fixed.",
    noTechIdreportConfigId = 'The QBench <b>Technician ID and Report ID</b> field is required in order to release results. Please contact Steve Wilson and Anton Co to get this fixed.',
    noReviewedByreportConfigId = "The QBench <b>Reviewed By and Report ID</b> field is required in order to release results. Please contact Steve Wilson and Anton Co to get this fixed.",
    noTechId = 'The QBench <b>Technician ID</b> field is required in order to release results. Please contact Steve Wilson and Anton Co to get this fixed.',
    noReviewedBy = "The QBench <b>Reviewed By</b> field is required in order to release results. Please contact Steve Wilson and Anton Co to get this fixed.",
    noReportConfigId = "The QBench <b>Report ID</b> field is required in order to Generate the result Report. Please contact Steve Wilson and Anton Co to get this fixed.",
    contactSteveAnton = "Something Went Wrong Please Contact Steve Wilson and Anton Co to get this fixed.",
    userNOtExist = "User doesn't exist",
    qbenchNotExist = "Qbench details doesn't exist",
    LocationNotExist = "Location doesn't exist",
    apptCancelled = "Appointment Cancelled",
    refundReason = 'cancellation',
    errorWhileCancelAppt = 'Error while cancelling appointment, please contact support',
    resultProcessederror = "Can't cancel the appointment with results being processed",
    crtApptid = 'Please Pass correct Appointment ID',
    apptDataMissing = 'Appointment Data is missing',
    docNotFound = 'Document Not Found to Check In QbenchAckID = ',
    noReqInput = 'No Required Input Data for this API'
}