import 'dotenv/config';

const config = {
    functionsConfig: {
        sendgrid: {
            key: process.env.SENDGRID_KEY!,
        },
        admin: {
            password: process.env.ADMIN_PASSWORD,
            username: process.env.ADMIN_USER_NAME,
        },
        twilio: {
            sid: process.env.TWILIO_SID,
            messaging_service_sid: process.env.TWILIO_MESSAGING_SERVICE_SID,
            token: process.env.TWILIO_TOKEN,
        },
    },
    collections: {
        airlines: 'airlines',
        country: 'country',
        state: 'state',
        appointments: 'appointments',
        schedules: 'schedules',
        qbenchresult: 'qbenchresults',
        clientpartner: 'clientpartner',
        locations: 'locations',
        dashboardsummary: 'dashboardsummary',
        cancelledappointments: 'cancelledappointments',
        qbenchconsolidationresults: 'qbenchconsolidationresults',
        onetimepassword: 'onetimepassword',
        qbenchacknowledgement: 'qbenchacknowledgement',
        qbenchinprogress: 'qbenchinprogress',
        slots: 'slots',
        appmaster: 'appmaster',
        crelioacknowledgement: 'crelioacknowledgement',
        crelioConsolidationResults: 'crelioConsolidationResults',
        crelioresults: 'crelioResults',
        crelioinprogress: 'crelioinprogress',
        userdetails: 'userdetails',
        logUsCustomer: 'logUsCustomer',
        governmentId: 'governmentId',
        reservation: 'reservation',
        slotsconfigurations: 'slotsconfigurations',
        insurance: 'insurance',
        schedulesrapid: 'schedulesrapid',
        thirdpartyqbenchacknowledgement: 'thirdpartyqbenchacknowledgement',
        thirdpartyappointments: 'thirdpartyappointments',
        thirdpartyqbenchconsolidationresults:
            'thirdpartyqbenchconsolidationresults',
        thirdpartyqbenchresult: 'thirdpartyqbenchresult',
        userRoles: 'userRoles',
        allRoles: 'allRoles',
        services: 'services',
        telemedicineappointments: 'telemedicineappointments',
        config: 'config',
        couponCodeMaster: 'couponCodeMaster',
        userCoupon: 'userCoupon',
        jotFormConfig: 'jotFormConfig',
        jotFormData: 'jotFormData',
        minorAppointment: 'minorAppointment',
        adminConfig: 'adminConfig',
        eventTest: 'eventTest',
        editslots: 'editslots',
        npdestinations: 'npdestinations',
        inventorytracker: 'inventorytracker',
        inventoryauditlog: 'inventoryauditlog',
        schedulewalkup: 'schedulewalkup',
        nonschedulertest: 'nonschedulertest',
        partialCancelledAppointment: 'partialCancelledAppointment',
        telemedicineproviders: 'telemedicineproviders',
        vaccine: 'vaccine',
        studentDetails: 'studentDetails',
        staffdetails: 'staffdetails',
        reportAccess: 'reportAccess',
        employeeTesting: 'employeeTesting',
        thirdpartylocation: 'thirdpartylocation',
        healthaffiliates: 'healthaffiliates',
        bookOrder:'bookOrder'
    },
    googleCloudQueue: {
        project: 'wsl-multitenancy-dev-ac13b',
        location: 'us-central1',
    },
    googleCloudQueueName: {
        qbenchData: 'qbenchOrderPoc',
        crelioOrder: 'crelioOrderTask',
        createQbenchOrder:'createQbenchOrders',
        insertQbenchAcknowledgement:'insertQbenchAcknowledgement',
        insuranceReport:'create-insurance-report'
    },
    apiName: {
        qbenchData: '/qbench',
        // qbenchData: '/sendGrid',
        crelioData: '/crelio'
    },
    topicName: {
        createQbenchOrder_microServices:'projects/wsl-poc/topics/createQbenchOrder',
        order_microService: 'projects/wsl-poc/topics/Order',
        notificationscreateOrder:'projects/wsl-poc/topics/Notification',
        insertQbenchAck:'projects/wsl-poc/topics/insertQbenchAcknowledgement',
        payment_microService: 'projects/wsl-poc/topics/Payment-MicroService',
        notifications:'projects/wsl-poc/topics/Notification',
        lims:'projects/wsl-poc/topics/Lims'
    },

    googleLocation:{
        key:'AIzaSyC_UwZ_y9gHtsdkwICipK90eJiK1Ico7sY',
        query:'worksite+labs',
        type:'worksite labs'
    },
    fromEmail: 'test@schedulecovidtesting.com',
    schedule: {
        startTime: '6:00a',
        endTime: '10:00p',
        periodDuration: 30,
    },
    crelio_dev: {
        host: 'https://us.livehealth.solutions/',
        token: '6ecbb624-8c9e-11eb-84bd-02b76e173c41/',
        orgID: 195903,
        testID: 3742754,
    },
    dateFormat: 'LL/dd/yyyy',
    dateTimeFormat: 'LL/dd/yyyy hh:mm a',

    encryption: {
        secretKey: '9vApoNk5GUHDnIrM',
    },
    JWT: {
        secret: 'Test',
        expiresIn: '8h',
    },

    mysql: {
        host: '35.238.129.216',
        name: 'wsl-multitenancy-dev-ac13b:us-central1:wsl-multitenancy-dev',
        database: 'wsl_dev',
        user: 'root',
        password: 'WSL@2022',
        port: 3306,
        connectionTimeout: 300000,
        requestTimeout: 300000,
        pool: {
            max: 100,
            min: 0,
            idleTimeoutMillis: 60000,
        },
        options: {
            encrypt: true,
            enableArithAbort: true,
        },
        parseJSON: true,
    },
    locations: [
        { qbenchCustomerId: 2 },
        { qbenchCustomerId: 3 },
        { qbenchCustomerId: 4 },
        { qbenchCustomerId: 5 },
        { qbenchCustomerId: 6 },
        { qbenchCustomerId: 7 },
        { qbenchCustomerId: 8 },
        { qbenchCustomerId: 9 },
        { qbenchCustomerId: 10 },
        { qbenchCustomerId: 11 },
        { qbenchCustomerId: 12 },
        { qbenchCustomerId: 13 },
        { qbenchCustomerId: 14 },
        { qbenchCustomerId: 15 },
        { qbenchCustomerId: 16 },
        { qbenchCustomerId: 17 },
        { qbenchCustomerId: 18 },
        { qbenchCustomerId: 19 },
        { qbenchCustomerId: 20 },
        { qbenchCustomerId: 21 },
        { qbenchCustomerId: 22 },
        { qbenchCustomerId: 23 },
        { qbenchCustomerId: 24 },
        { qbenchCustomerId: 25 },
        { qbenchCustomerId: 26 },
        { qbenchCustomerId: 27 },
        { qbenchCustomerId: 28 },
        { qbenchCustomerId: 30 },
        { qbenchCustomerId: 31 },
        { qbenchCustomerId: 32 },
        { qbenchCustomerId: 33 },
        { qbenchCustomerId: 35 },
        { qbenchCustomerId: 36 },
        { qbenchCustomerId: 39 },
        { qbenchCustomerId: 40 },
        { qbenchCustomerId: 41 },
        { qbenchCustomerId: 42 },
        { qbenchCustomerId: 46 },
        { qbenchCustomerId: 47 },
        { qbenchCustomerId: 48 },
        { qbenchCustomerId: 49 },
        { qbenchCustomerId: 50 },
        { qbenchCustomerId: 51 },
        { qbenchCustomerId: 52 },
        { qbenchCustomerId: 53 },
        { qbenchCustomerId: 54 },
        { qbenchCustomerId: 55 },
        { qbenchCustomerId: 56 },
        { qbenchCustomerId: 57 },
        { qbenchCustomerId: 58 },
        { qbenchCustomerId: 60 },
        { qbenchCustomerId: 62 },
        { qbenchCustomerId: 63 },
        { qbenchCustomerId: 66 },
        { qbenchCustomerId: 67 },
        { qbenchCustomerId: 71 },
        { qbenchCustomerId: 72 },
        { qbenchCustomerId: 73 },
        { qbenchCustomerId: 76 },
    ],
    thirdPartyLocations: [153, 154, 155],
    destination_list: ['TCA', 'KNA', 'ATG', 'BRB', 'CHN', 'MAF', 'JPN'],
    reservationStatus: {
        status: {
            '1': {
                code: 1,
                status: 'PENDING',
                type: 'schedule',
            },
            '2': {
                code: 2,
                status: 'PROCESSING',
                type: 'schedule',
            },
            '3': {
                code: 3,
                status: 'COMPLETED',
                type: 'schedule',
            },
            '4': {
                code: 4,
                status: 'NOT_INITIATED',
                type: 'manage',
            },
            '5': {
                code: 5,
                status: 'PROCESSING',
                type: 'manage',
            },
            '6': {
                code: 6,
                status: 'COMPLETED',
                type: 'manage',
            },
        },
    },
    refersion: {
        start: 'https://tracking.refersion.com/start',
        affiliate_click: 'https://tracking.refersion.com/affiliate_click',
        checkout: 'https://tracking.refersion.com/checkout',
        secKey: 'sec_7b0fe4152536e19e0045',
        key: 'pub_b3bef110179795a4e663',
        cartId: 'cus_KZgrO2Kefc6E1q',
    },
    slotIndex: {
        schedule: [
            '6:00 AM',
            '6:30 AM',
            '7:00 AM',
            '7:30 AM',
            '8:00 AM',
            '8:30 AM',
            '9:00 AM',
            '9:30 AM',
            '10:00 AM',
            '10:30 AM',
            '11:00 AM',
            '11:30 AM',
            '12:00 PM',
            '12:30 PM',
            '1:00 PM',
            '1:30 PM',
            '2:00 PM',
            '2:30 PM',
            '3:00 PM',
            '3:30 PM',
            '4:00 PM',
            '4:30 PM',
            '5:00 PM',
            '5:30 PM',
            '6:00 PM',
            '6:30 PM',
        ],
        rapid: [
            '6:00 AM',
            '7:00 AM',
            '8:00 AM',
            '9:00 AM',
            '10:00 AM',
            '11:00 AM',
            '12:00 PM',
            '01:00 PM',
            '02:00 PM',
            '3:00 PM',
            '4:00 PM',
            '5:00 PM',
            '6:00 PM',
        ],
    },
    twilio: {
        accountSid: 'AC83a03d332d3dc13697d2074ba459638b',
        apiKey: 'SK6849ec5bc0721171fcbbd92ebabb07d9',
        apiSecret: 'CekBZy6m7SsbfM9NHfLa4J6oBbhtjdX9',
    },
    cloudRunBaseURL: 'https://wsl-arch-poc-la2j6ijlpq-uc.a.run.app',
    firebaseURL:
        'https://us-central1-wsl-multitenancy-dev-ac13b.cloudfunctions.net/',
    affilateServices: {
        jwt: {
            secret: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            expiresIn: '1800s',
            authCode: "ynrc2f9h7dpyd4ybyyfxm68t799xqa",
            client_id: "F155F57A9CAADFF39EE56C128E13C"
        },
        affilateList:["isPrimary"],
    },
    checkFullSlotValidation: 7
};

export { config };
