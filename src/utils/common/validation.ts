const Joi = require('@hapi/joi');

export const authenticate = (clientId: any, authCode: any) => {
    try {
        const schema = Joi.object()
            .keys({
                clientId: Joi.string().min(3).max(30).required(),
                authCode: Joi.string().min(3).max(30).required(),
            })
            .with(['clientId'], ['authCode']);

        return schema.validate({
            clientId,
            authCode,
        });
    } catch (error: any) {
        return false;
    }
};

export const authenticateApplication = (clientId: any) => {
    try {
        const schema = Joi.object().keys({
            clientId: Joi.string().min(3).max(30).required(),
        });

        return schema.validate({
            clientId: clientId,
        });
    } catch (error: any) {
        return false;
    }
};

export const authenticateUser = (authntoken: any, authenticateUserDTO: any) => {
    try {
        const schema = Joi.object({
            email: Joi.string().pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/),
            authntoken: Joi.string().min(3).max(500).required(),
            password: Joi.string().pattern(isPassword),
        }).with('email', 'password');

        return schema.validate({
            email: authenticateUserDTO.email,
            password: authenticateUserDTO.password,
            authntoken: authntoken,
        });
    } catch (error: any) {
        return false;
    }
};

export const customerSignIn = (customerDTO: any) => {
    try {
        const schema = Joi.object({
            username: Joi.string().min(3).max(500).required(),
            password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
        }).with('username', 'password');

        return schema.validate({
            username: customerDTO.username,
            password: customerDTO.password,
        });
    } catch (error: any) {
        return false;
    }
};

export const formInsert = (form: any) => {
    try {
        const schema = Joi.object({
            Name: Joi.string().min(3).max(500).required(),
            EmailId: Joi.string().required(),
            DOB: Joi.string().required(),
            CompanyName: Joi.string().required(),
        }).with('Name', 'EmailId');

        return schema.validate({
            Name: form.Name,
            EmailId: form.EmailId,
            DOB: form.DOB,
            CompanyName: form.CompanyName,
        });
    } catch (error: any) {
        return false;
    }
};

export const formUpdate = (formDTO: any) => {
    try {
        const schema = Joi.object({
            Name: Joi.string().min(3).max(500).required(),
            EmailId: Joi.string().required(),
            DOB: Joi.string().required(),
            CompanyName: Joi.string().required(),
        }).with('Name', 'EmailId');

        return schema.validate({
            Name: formDTO.Name,
            EmailId: formDTO.EmailId,
            DOB: formDTO.DOB,
            CompanyName: formDTO.CompanyName,
        });
    } catch (error: any) {
        return false;
    }
};

export const formDelete = (formDTO: any) => {
    try {
        const schema = Joi.object().keys({
            FormId: Joi.number.required(),
        });

        return schema.validate({
            FormId: formDTO.FormId,
        });
    } catch (error: any) {
        return false;
    }
};

export const appAuthNHandler = (authntoken: any) => {
    try {
        const schema = Joi.object().keys({
            authntoken: Joi.string().min(3).max(500).required(),
        });
        return schema.validate({
            authntoken: authntoken,
        });
    } catch (error: any) {
        return false;
    }
};
export const authenticateCoordinates = (latitude: any, longitude: any) => {
    try {
        const schema = Joi.object().keys({
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
        });
        return schema.validate({
            latitude: latitude,
            longitude: longitude,
        });
    } catch (error: any) {
        return false;
    }
};

export const authenticateLocationInput = (data: any) => {
    try {
        const schema = Joi.object().keys({
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            CPartnerId: Joi.string().min(3).max(6).required(),
            LocationName: Joi.string().min(3).max(50).required(),
            City: Joi.string().min(3).max(20).required(),
            State: Joi.string().min(1).max(10).required(),
            Country: Joi.string().min(3).max(20).required(),
            Zipcode: Joi.string().min(3).max(20).required(),
            QbenchCustomerId: Joi.number().required(),
            QbenchAssayId: Joi.number().required(),
            GMT: Joi.string().min(3).max(20).required(),
            TimeZone: Joi.string().min(3).max(20).required(),
            PcrTypeTests: Joi.string().min(3).max(200).required(),
        });
        return schema.validate({
            latitude: `${data.Lat}`,
            longitude: `${data.Lng}`,
            CPartnerId: data.CPartnerId,
            LocationName: data.LocationName,
            City: data.City,
            State: data.State,
            Country: data.Country,
            Zipcode: data.Zipcode,
            QbenchCustomerId: data.QbenchCustomerId,
            QbenchAssayId: data.QbenchAssayId,
            GMT: data.GMT,
            TimeZone: data.TimeZone,
            PcrTypeTests: data.PcrTypeTests,
        });
    } catch (error: any) {
        return false;
    }
};

export const authenticateCheckFullSlotInput = (
    locationId: any,
    date: any,
    testType: any
) => {
    try {
        const schema = Joi.object({
            locationId: Joi.number().required(),
            date: Joi.string().min(3).max(20).required(),
            testType: Joi.string().min(3).max(20).required(),
        });
        return schema.validate({
            locationId,
            date,
            testType,
        });
    } catch (error: any) {
        return false;
    }
};

export const authenticateSlotInput = (
    locationId: any,
    date: any,
    startTime: any,
    endTime: any,
    available: any,
    duration: any
) => {
    try {
        const schema = Joi.object({
            locationId: Joi.number().required(),
            date: Joi.string().min(3).max(20).required(),
            startTime: Joi.string().min(3).max(20).required(),
            endTime: Joi.string().min(3).max(20).required(),
            available: Joi.number().required(),
            duration: Joi.string().min(3).max(20).required(),
        });
        return schema.validate({
            locationId,
            date,
            startTime,
            endTime,
            available,
            duration,
        });
    } catch (error: any) {
        return false;
    }
};

export const isUSPhone = /^\(?('\d'{3})\)?[-. ]?('\d'{3})[-. ]?('\d'{4})$/;

export const isValidZIP = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

export const isPassword =
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*\d))|((?=.*[A-Z])(?=.*\d)))(?=.{6,})/;

export const isValidEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const isValidDateFormat = /^\d{2}\/\d{2}\/\d{4}$/;

export const walkUpUrlValidation =
    /^(?:\/bookappointment\b)(?:\/walkup+)(?:\/\d{0,4}.)$/;

export const menuItemValidate = async (formDTO: any) => {
    try {
        if (formDTO?.MenuId) {
            let schema = Joi.object().keys({
                MenuId: Joi.number().required(),
            });
            return schema.validate({
                MenuId: formDTO?.MenuId,
            });
        } else {
            let schema = Joi.object().keys({
                MenuName: Joi.string().min(3).max(100).required(),
            });
            return schema.validate({
                MenuName: formDTO.MenuName,
            });
        }
    } catch (error: any) {
        return false;
    }
};

export const customerMinorDetailsValidate = async (
    formDTO: any,
    type: number
) => {
    try {
        if (type === 0) {
            // GetMinorDetails
            let schema = Joi.object().keys({
                userId: Joi.number().required(),
                minorId: Joi.number().required(),
            });
            return schema.validate({
                userId: formDTO.userId,
                minorId: formDTO.minorId,
            });
        } else if (type === 1) {
            // InsertMinorDetails
            let schema = Joi.object().keys({
                User_Id: Joi.number().required(),
                Email: Joi.string().email().required(),
                BirthDate: Joi.date().raw().required(),
                FirstName: Joi.string().min(3).max(100).required(),
                PassportCountry: Joi.string().min(2).max(100).required(),
                Relationship: Joi.string().min(3).max(100).required(),
                SchoolName: Joi.string().min(3).max(100).required(),
                StudentId: Joi.string().min(3).max(100).required(),
                Notification: Joi.number().required(),
                Sex: Joi.string().min(3).max(100).required(),
            });

            return schema.validate({
                User_Id: formDTO.User_Id,
                Email: formDTO.Email,
                BirthDate: formDTO.BirthDate,
                FirstName: formDTO.FirstName,
                PassportCountry: formDTO.PassportCountry,
                Relationship: formDTO.Relationship,
                SchoolName: formDTO.SchoolName,
                StudentId: formDTO.StudentId,
                Notification: formDTO.Notification,
                Sex: formDTO.Sex,
            });
        } else if (type === 2) {
            // UpdateMinorDetails
            let schema = Joi.object().keys({
                MinorId: Joi.number().required(),
                User_Id: Joi.number().required(),
                Email: Joi.string().email().required(),
                BirthDate: Joi.date().raw().required(),
                FirstName: Joi.string().min(3).max(100).required(),
                PassportCountry: Joi.string().min(2).max(100).required(),
                Relationship: Joi.string().min(3).max(100).required(),
                SchoolName: Joi.string().min(3).max(100).required(),
                StudentId: Joi.string().min(3).max(100).required(),
                Notification: Joi.number().required(),
                Sex: Joi.string().min(3).max(100).required(),
            });

            return schema.validate({
                MinorId: formDTO.MinorId,
                User_Id: formDTO.User_Id,
                Email: formDTO.Email,
                BirthDate: formDTO.BirthDate,
                FirstName: formDTO.FirstName,
                PassportCountry: formDTO.PassportCountry,
                Relationship: formDTO.Relationship,
                SchoolName: formDTO.SchoolName,
                StudentId: formDTO.StudentId,
                Notification: formDTO.Notification,
                Sex: formDTO.Sex,
            });
        } else {
            // DeletedMinorDetails
            let schema = Joi.object().keys({
                MinorId: Joi.number().required(),
                User_Id: Joi.number().required(),
            });
            return schema.validate({
                MinorId: formDTO.MinorId,
                User_Id: formDTO.User_Id,
            });
        }
    } catch (error: any) {
        return false;
    }
};

export const customerUserDetailsValidate = async (
    formDTO: any,
    type: number
) => {
    try {
        if (type === 0) {
            // GetUserDetails
            let schema = Joi.object().keys({
                userid: Joi.number().required(),
            });
            return schema.validate({
                userid: formDTO.userid,
            });
        } else if (type === 1) {
            // InsertUserDetails
            let schema = Joi.object().keys({
                Email: Joi.string().email().required(),
                Address1: Joi.string().min(3).max(200).required(),
                City: Joi.string().min(3).max(50).required(),
                State: Joi.string().min(2).max(50).required(),
                Country: Joi.string().min(3).max(50).required(),
                Zipcode: Joi.string().min(3).max(20).required(),
                BirthDate: Joi.date().raw().required(),
                FirstName: Joi.string().min(3).max(100).required(),
                LastName: Joi.string().min(1).max(100).required(),
            });

            return schema.validate({
                Email: formDTO.Email,
                Address1: formDTO.Address1,
                City: formDTO.City,
                State: formDTO.State,
                Country: formDTO.Country,
                Zipcode: formDTO.Zipcode,
                BirthDate: formDTO.BirthDate,
                FirstName: formDTO.FirstName,
                LastName: formDTO.LastName,
            });
        } else if (type === 2) {
            // UpdateUserDetails
            let schema = Joi.object().keys({
                UserId: Joi.number().required(),
                Email: formDTO.Email,
                Address1: formDTO.Address1,
                City: formDTO.City,
                State: formDTO.State,
                Country: formDTO.Country,
                Zipcode: formDTO.Zipcode,
                BirthDate: formDTO.BirthDate,
                FirstName: formDTO.FirstName,
                LastName: formDTO.LastName,
            });

            return schema.validate({
                UserId: formDTO.UserId,
                Email: formDTO.Email,
                Address1: formDTO.Address1,
                City: formDTO.City,
                State: formDTO.State,
                Country: formDTO.Country,
                Zipcode: formDTO.Zipcode,
                BirthDate: formDTO.BirthDate,
                FirstName: formDTO.FirstName,
                LastName: formDTO.LastName,
            });
        } else {
            // DeletedMinorDetails
            let schema = Joi.object().keys({
                MinorId: Joi.number().required(),
                User_Id: Joi.number().required(),
            });
            return schema.validate({
                MinorId: formDTO.MinorId,
                User_Id: formDTO.User_Id,
            });
        }
    } catch (error: any) {
        return false;
    }
};

export const customerPhoneEmailValidate = async (
    formDTO: any,
    type: number
) => {
    try {
        if (type === 0) {
            let schema = Joi.object().keys({
                UserId: Joi.number().required(),
                phone: Joi.string().min(10).max(12, 'utf8').required(),
            });
            return schema.validate({
                UserId: formDTO.UserId,
                phone: formDTO.phone,
            });
        } else {
            let schema = Joi.object().keys({
                UserId: Joi.number().required(),
                email: Joi.string().email().required(),
            });
            return schema.validate({
                UserId: formDTO.UserId,
                email: formDTO.email,
            });
        }
    } catch (error: any) {
        return false;
    }
};

export const emailValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
        });
        return schema.validate({
            email: formDTO.email,
        });
    } catch (error: any) {
        return false;
    }
};

export const resetPasswordValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            UserId: Joi.number().required(),
            email: Joi.string().email().required(),
            newPassword: Joi.string().pattern(isPassword),
            confirmPassword: Joi.any()
                .valid(Joi.ref('newPassword'))
                .required()
                .options({ language: { any: { allowOnly: 'must match password' } } }),
        });
        return schema.validate({
            UserId: formDTO.UserId,
            email: formDTO.email,
            newPassword: formDTO.newPassword,
            confirmPassword: formDTO.confirmPassword,
        });
    } catch (error: any) {
        return false;
    }
};

export const locationIDValidation = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            locationId: Joi.number().required(),
        });
        return schema.validate({
            locationId: formDTO.locationId,
        });
    } catch (error: any) {
        return false;
    }
};

export const stripeRefundValidation = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            PayingMethod: Joi.number().required(),
            PaymentIntentId: Joi.string().min(3).max(50).required(),
            ConfirmationId: Joi.string().min(3).max(50).required(),
            Reason: Joi.string().min(3).max(200).required(),
            type: Joi.string().min(3).max(50).required(),
        });
        return schema.validate({
            PayingMethod: formDTO.PayingMethod,
            PaymentIntentId: formDTO.PaymentIntentId,
            ConfirmationId: formDTO.ConfirmationId,
            Reason: formDTO.Reason,
            type: formDTO.type,
        });
    } catch (error: any) {
        return false;
    }
};

export const stripeCreatePaymentValidation = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            Amount: Joi.number().required(),
            QbenchCustomerId: Joi.number().required(),
            Name: Joi.string().min(3).max(100).required(),
        });
        return schema.validate({
            Amount: formDTO.Amount,
            QbenchCustomerId: formDTO.Location.QbenchCustomerId,
            Name: formDTO.Location.Name,
        });
    } catch (error: any) {
        return false;
    }
};

export const reservationValidate = async (formDTO: any, type: number) => {
    try {
        if (type === 0) {
            // GetReservation
            let schema = Joi.object().keys({
                userid: Joi.number().required(),
            });
            return schema.validate({
                userid: formDTO.userid,
            });
        } else if (type === 1) {
            // CreateReservation
            let schema = Joi.object().keys({
                slotId: Joi.number().required(),
                numberOfGuests: Joi.number().required(),
                locationId: Joi.number().required(),
                date: Joi.date().raw().required(),
                testType: Joi.string().min(3).max(50).required(),
            });

            return schema.validate({
                slotId: formDTO.slotId,
                numberOfGuests: formDTO.numberOfGuests,
                locationId: formDTO.locationId,
                date: formDTO.date,
                testType: formDTO.testType,
            });
        } else if (type === 2) {
            // UpdateReservation
            let schema = Joi.object().keys({
                reservationId: Joi.number().required(),
                slotId: Joi.number().required(),
                numberOfGuests: Joi.number().required(),
                locationId: Joi.number().required(),
                date: Joi.date().raw().required(),
                testType: Joi.string().min(3).max(50).required(),
            });

            return schema.validate({
                reservationId: formDTO.reservationId,
                slotId: formDTO.slotId,
                numberOfGuests: formDTO.numberOfGuests,
                locationId: formDTO.locationId,
                date: formDTO.date,
                testType: formDTO.testType,
            });
        } else {
            // DeleteReservation
            let schema = Joi.object().keys({
                SlotUpdationId: Joi.number().required(),
            });
            return schema.validate({
                SlotUpdationId: formDTO.SlotUpdationId,
            });
        }
    } catch (error: any) {
        return false;
    }
};

export const confirmationIdValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            confirmationid: Joi.string().min(10).max(50).required(),
        });
        return schema.validate({
            confirmationid: formDTO.confirmationid,
        });
    } catch (error: any) {
        return false;
    }
};

export const discountAmountDetailValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            fromdate: Joi.date().raw().required(),
            todate: Joi.date().raw().required(),
        });
        return schema.validate({
            fromdate: formDTO.fromdate,
            todate: formDTO.todate,
        });
    } catch (error: any) {
        return false;
    }
};

export const insuranceAndStripeValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            fromdate: Joi.date().raw().required(),
            todate: Joi.date().raw().required(),
            searchby: Joi.string().min(3).max(50).required(),
            locationid: Joi.number().required(),
        });
        return schema.validate({
            fromdate: formDTO.fromdate,
            todate: formDTO.todate,
            searchby: formDTO.searchby,
            locationid: formDTO.locationid,
        });
    } catch (error: any) {
        return false;
    }
};

export const countyReportValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            date: Joi.date().raw().required(),
            results: Joi.string().min(3).max(50).required(),
        });
        return schema.validate({
            date: formDTO.date,
            results: formDTO.results,
        });
    } catch (error: any) {
        return false;
    }
};

export const qbenchCustomerIdValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            qbenchcustomerid: Joi.number().required(),
        });
        return schema.validate({
            qbenchcustomerid: formDTO.qbenchcustomerid,
        });
    } catch (error: any) {
        return false;
    }
};

export const paymentCreditCardValidate = async (formDTO: any, type: number) => {
    try {
        if (type === 0) {
            // GetCreditCard
            let schema = Joi.object().keys({
                userid: Joi.number().required(),
            });
            return schema.validate({
                userid: formDTO.userid,
            });
        } else if (type === 1) {
            // InsertCreditCard
            let schema = Joi.object().keys({
                UserId: Joi.number().required(),
                Email: Joi.string().email().required(),
                CardName: Joi.string().min(3).max(50).required(),
                CardNumber: Joi.string().min(3).max(50).required(),
                Cvv: Joi.number().required(),
                ExpiryDate: Joi.string().length(5).required(),
                PaymentMethod: Joi.number().required(),
            });
            return schema.validate({
                UserId: formDTO.UserId,
                Email: formDTO.Email,
                CardName: formDTO.CardName,
                CardNumber: formDTO.CardNumber,
                Cvv: formDTO.Cvv,
                ExpiryDate: formDTO.ExpiryDate,
                PaymentMethod: formDTO.PaymentMethod,
            });
        } else if (type === 2) {
            // UpdateCreditCard
            let schema = Joi.object().keys({
                UserId: Joi.number().required(),
                CardId: Joi.number().required(),
                CardName: Joi.string().min(3).max(50).required(),
                CardNumber: Joi.string().min(3).max(50).required(),
                PaymentMethod: Joi.number().required(),
            });
            return schema.validate({
                UserId: formDTO.UserId,
                CardId: formDTO.CardId,
                CardName: formDTO.CardName,
                CardNumber: formDTO.CardNumber,
                PaymentMethod: formDTO.PaymentMethod,
            });
        } else if (type === 3) {
            // DeleteCreditCard
            let schema = Joi.object().keys({
                UserId: Joi.number().required(),
                CardId: Joi.number().required(),
            });
            return schema.validate({
                UserId: formDTO.UserId,
                CardId: formDTO.CardId,
            });
        }
    } catch (error: any) {
        return false;
    }
};

export const paymentInsuranceValidate = async (formDTO: any, type: number) => {
    try {
        if (type === 0) {
            // GetInsurance
            let schema = Joi.object().keys({
                userid: Joi.number().required(),
            });
            return schema.validate({
                userid: formDTO.userid,
            });
        } else if (type === 1) {
            // InsertInsurance
            let schema = Joi.object().keys({
                UserId: Joi.number().required(),
                Email: Joi.string().email().required(),
                SubscriberFirstName: Joi.string().min(3).max(50).required(),
                SubscriberLastName: Joi.string().min(1).max(50).required(),
                MemberId: Joi.number().required(),
            });
            return schema.validate({
                UserId: formDTO.UserId,
                Email: formDTO.Email,
                SubscriberFirstName: formDTO.SubscriberFirstName,
                SubscriberLastName: formDTO.SubscriberLastName,
                MemberId: formDTO.MemberId,
            });
        } else if (type === 2) {
            // UpdateInsurance
            let schema = Joi.object().keys({
                InsuranceId: Joi.number().required(),
                UserId: Joi.number().required(),
                Email: Joi.string().email().required(),
                SubscriberFirstName: Joi.string().min(3).max(50).required(),
                SubscriberLastName: Joi.string().min(1).max(50).required(),
                MemberId: Joi.number().required(),
            });
            return schema.validate({
                InsuranceId: formDTO.InsuranceId,
                UserId: formDTO.UserId,
                Email: formDTO.Email,
                SubscriberFirstName: formDTO.SubscriberFirstName,
                SubscriberLastName: formDTO.SubscriberLastName,
                MemberId: formDTO.MemberId,
            });
        } else if (type === 3) {
            // DeleteInsurance
            let schema = Joi.object().keys({
                InsuranceId: Joi.number().required(),
                UserId: Joi.number().required(),
            });
            return schema.validate({
                InsuranceId: formDTO.InsuranceId,
                UserId: formDTO.UserId,
            });
        }
    } catch (error: any) {
        return false;
    }
};

export const paymentUnInsuredValidate = async (formDTO: any, type: number) => {
    try {
        if (type === 0) {
            // GetInsured
            let schema = Joi.object().keys({
                userid: Joi.number().required(),
            });
            return schema.validate({
                userid: formDTO.userid,
            });
        } else if (type === 1) {
            // InsertUninsured
            let schema = Joi.object().keys({
                UserId: Joi.number().required(),
                Email: Joi.string().email().required(),
            });
            return schema.validate({
                UserId: formDTO.UserId,
                Email: formDTO.Email,
            });
        } else if (type === 2) {
            // UpdateUninsured
            let schema = Joi.object().keys({
                GovtProofId: Joi.number().required(),
                UserId: Joi.number().required(),
                Email: Joi.string().email().required(),
            });
            return schema.validate({
                GovtProofId: formDTO.GovtProofId,
                UserId: formDTO.UserId,
                Email: formDTO.Email,
            });
        } else if (type === 3) {
            // DeleteUninsured
            let schema = Joi.object().keys({
                GovtProofId: Joi.number().required(),
                UserId: Joi.number().required(),
            });
            return schema.validate({
                GovtProofId: formDTO.GovtProofId,
                UserId: formDTO.UserId,
            });
        }
    } catch (error: any) {
        return false;
    }
};

export const registrationValidate = async (formDTO: any, type: number) => {
    try {
        if (type === 0) {
            // GetInsured
            let schema = Joi.object().keys({
                userid: Joi.number().required(),
            });
            return schema.validate({
                userid: formDTO.userid,
            });
        } else if (type === 1) {
            // InsertUninsured
            let schema = Joi.object().keys({
                UserId: Joi.number().required(),
                Email: Joi.string().email().required(),
            });
            return schema.validate({
                UserId: formDTO.UserId,
                Email: formDTO.Email,
            });
        } else if (type === 2) {
            // UpdateUninsured
            let schema = Joi.object().keys({
                GovtProofId: Joi.number().required(),
                UserId: Joi.number().required(),
                Email: Joi.string().email().required(),
            });
            return schema.validate({
                GovtProofId: formDTO.GovtProofId,
                UserId: formDTO.UserId,
                Email: formDTO.Email,
            });
        } else if (type === 3) {
            // DeleteUninsured
            let schema = Joi.object().keys({
                GovtProofId: Joi.number().required(),
                UserId: Joi.number().required(),
            });
            return schema.validate({
                GovtProofId: formDTO.GovtProofId,
                UserId: formDTO.UserId,
            });
        }
    } catch (error: any) {
        return false;
    }
};

export const verifyemailValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            userId: Joi.number().required(),
            isChangeEmail: Joi.boolean().required(),
        });
        return schema.validate({
            userId: formDTO.userId,
            isChangeEmail: formDTO.isChangeEmail,
        });
    } catch (error: any) {
        return false;
    }
};

export const initiateOTPValidate = async (formDTO: any) => {
    try {
        if (formDTO.validationMethod && formDTO.validationMethod === 'email') {
            let schema = Joi.object().keys({
                email: Joi.string().email().required(),
                isUserOTP: Joi.boolean().required(),
                validationMethod: Joi.string().min(5).max(10).required(),
                isChangeEmail: Joi.boolean().required(),
            });
            return schema.validate({
                email: formDTO.email,
                isUserOTP: formDTO.isUserOTP,
                validationMethod: formDTO.validationMethod,
                isChangeEmail: formDTO.isChangeEmail,
            });
        } else {
            let schema = Joi.object().keys({
                phone: Joi.string().min(10).max(15).required(),
                isUserOTP: Joi.boolean().required(),
                validationMethod: Joi.string().min(5).max(10).required(),
                isChangeEmail: Joi.boolean().required(),
            });
            return schema.validate({
                phone: formDTO.phone,
                isUserOTP: formDTO.isUserOTP,
                validationMethod: formDTO.validationMethod,
                isChangeEmail: formDTO.isChangeEmail,
            });
        }
    } catch (error: any) {
        return false;
    }
};

export const otpValidate = async (formDTO: any) => {
    try {
        if (formDTO.email && formDTO.otp) {
            let schema = Joi.object().keys({
                email: Joi.string().email().required(),
                otp: Joi.string().min(4).max(8).required(),
            });
            return schema.validate({
                email: formDTO.email,
                otp: formDTO.otp,
            });
        } else {
            let schema = Joi.object().keys({
                phone: Joi.string().min(10).max(15).required(),
                otp: Joi.string().min(4).max(8).required(),
            });
            return schema.validate({
                phone: formDTO.phone,
                otp: formDTO.otp,
            });
        }
    } catch (error: any) {
        return false;
    }
};
export const rescheduleAppointmentValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            qbenchId: Joi.number().required(),
            slot: Joi.object().required(),
            date: Joi.string().required(),
            locationid: Joi.number().required(),
            CPartnerID: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            birthDate: Joi.string().required(),
            address: Joi.object().required(),
        });
        return schema.validate({
            qbenchId: formDTO.qbenchId,
            slot: formDTO.slot,
            date: formDTO.date,
            locationid: formDTO.locationid,
            CPartnerID: formDTO.CPartnerID,
            firstName: formDTO.firstName,
            lastName: formDTO.lastName,
            birthDate: formDTO.birthDate,
            address: formDTO.address
        });
    } catch (error: any) {
        return false;
    }
};


export const addOrUndoNoShowValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            isAddNoShow: Joi.boolean().required(),
            sampleId: Joi.array().items(Joi.number().required()),
        });
        return schema.validate({
            isAddNoShow: formDTO.isAddNoShow,
            sampleId: formDTO.sampleId,
        });
    } catch (error: any) {
        return false;
    }
};

export const updateAndReleaseAntigenResultValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            cPartnerID: Joi.string().min(3).max(20).required(),
            locationId: Joi.number().required(),
            result: Joi.string().min(5).max(10).required(),
            sampleId: Joi.number().required(),
            testType: Joi.string().min(5).max(10).required(),
        });
        return schema.validate({
            cPartnerID: formDTO.cPartnerID,
            locationId: formDTO.locationId,
            result: formDTO.result,
            sampleId: formDTO.sampleId,
            testType: formDTO.testType
        });
    } catch (error: any) {
        return false;
    }
};
export const cancelAppointmentValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            sampleId: Joi.number().required(),
            index: Joi.array().min(1).required(),
        });
        return schema.validate({
            sampleId: formDTO.sampleId,
            index: formDTO.index,
        });
    } catch (error: any) {
        return false;
    }
};
export const insertAdminConfigValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            role: Joi.string().min(5).max(8).required(),
            hideandshowcolumn: Joi.array().min(1).required(),
        });
        return schema.validate({
            email: formDTO.email,
            role: formDTO.role,
            hideandshowcolumn: formDTO.hideandshowcolumn,
        });
    } catch (error: any) {
        return false;
    }
};
export const getappointmentdataValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            Confirmation_Id: Joi.string().min(22).required(),
        });
        return schema.validate({
            Confirmation_Id: formDTO.Confirmation_Id,
        });
    } catch (error: any) {
        return false;
    }
};

export const resendConfirmationMailValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            EmailId: Joi.string().email().required(),
            Confirmation_Id: Joi.string().min(22).required(),
        });
        return schema.validate({
            EmailId: formDTO.EmailId,
            Confirmation_Id: formDTO.Confirmation_Id,
        });
    } catch (error: any) {
        return false;
    }
};
export const socialLoginSignInValidate = async (formDTO: any, type: number) => {
    try {
        if (type === 0) {
            let schema = Joi.object().keys({
                email: Joi.string().email().required(),
                id: Joi.string().required(),
                name: Joi.string().required(),
                provider: Joi.string().required(),
                signupType: Joi.string().required(),
            });
            return schema.validate({
                email: formDTO.email,
                id: formDTO.id,
                name: formDTO.name,
                provider: formDTO.provider,
                signupType: formDTO.signupType,
            });
        }
        else if (type === 1) {
            let schema = Joi.object().keys({
                Email: Joi.string().email().required(),
                Address1: Joi.string().min(1).max(200).required(),
                City: Joi.string().required(),
                State: Joi.string().required(),
                Country: Joi.string().required(),
                Zipcode: Joi.string().required(),
                BirthDate: Joi.string().required(),
                FirstName: Joi.string().required(),
                MiddleName: Joi.string().required(),
                LastName: Joi.string().required(),
                socialLoginDetails: Joi.object().required(),
            });
            return schema.validate({
                Email: formDTO.Email,
                Address1: formDTO.Address1,
                City: formDTO.City,
                State: formDTO.State,
                Country: formDTO.Country,
                Zipcode: formDTO.Zipcode,
                BirthDate: formDTO.BirthDate,
                FirstName: formDTO.FirstName,
                MiddleName: formDTO.MiddleName,
                LastName: formDTO.LastName,
                socialLoginDetails: formDTO.socialLoginDetails,
            });
        }

    } catch (error: any) {
        return false;
    }
}

export const daywiseValidate = async (formDTO: any, type: number) => {
    try {
        if (type === 0) {
            let schema = Joi.object().keys({
                ConfirmationId: Joi.string().required()
            });
            return schema.validate({
                ConfirmationId: formDTO.ConfirmationId,
            });
        }
        else if (type === 1) {
            let schema = Joi.object().keys({
                qbenchIds: Joi.array().items(Joi.number().required()),
            });
            return schema.validate({
                qbenchIds: formDTO.qbenchIds,
            });
        } else if (type === 2) {
            let schema = Joi.object().keys({
                id: Joi.number().required(),
                qbenchId: Joi.number().required(),
                expireIn: Joi.number().required(),
                note: Joi.string().required(),
            });
            return schema.validate({
                id: formDTO.id,
                expireIn: formDTO.expireIn,
                note: formDTO.note,
                qbenchId: formDTO.qbenchId,
            })
        } else if (type === 3) {
            let schema = Joi.object().keys({
                UserId: Joi.number().required(),
                firstname: Joi.string().required(),
                lastname: Joi.string().required(),
                dateofbirth: Joi.string().required(),
                email: Joi.string().email().required(),
                Phone: Joi.string().required(),
                streetaddress: Joi.string().required(),
                country: Joi.string().required(),
                state: Joi.string().required(),
                city: Joi.string().required(),
                zipcode: Joi.string().required()
            });
            return schema.validate({
                UserId: formDTO.UserId,
                firstname: formDTO.firstname,
                lastname: formDTO.lastname,
                dateofbirth: formDTO.dateofbirth,
                email: formDTO.email,
                Phone: formDTO.Phone,
                streetaddress: formDTO.streetaddress,
                country: formDTO.country,
                state: formDTO.state,
                city: formDTO.city,
                zipcode: formDTO.zipcode
            });
        } else if (type === 4) {
            let schema = Joi.object().keys({
                date: Joi.string().required()
            })
            return schema.validate({
                date: formDTO.date
            })
        }
    } catch (error) {
        return false
    }
}

export const getPrintSampleLabelsValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            labelId: Joi.string().min(1).max(20).required(),
            entity_dicts: Joi.array().items(
                Joi.object().keys({
                    id: Joi.number().required(),
                    count: Joi.number().required(),
                }).required()
            ).required(),
            timeZone: Joi.string().min(3).max(50).required()
        });
        return schema.validate({
            labelId: formDTO.labelId,
            entity_dicts: formDTO.entity_dicts,
            timeZone: formDTO.timeZone
        });
    } catch (error: any) {
        return false;
    }
};

export const sampleIdValidate = async (formDTO: any) => {
    try {
        let schema = Joi.object().keys({
            sampleId: Joi.number().required()
        });
        return schema.validate({
            sampleId: formDTO.sampleId
        });
    } catch (error: any) {
        return false;
    }
}
export const updateIscheckedInValidate = async (formDTO: any) => {
    try {
        if (formDTO.qbenchackid) {
            let schema = Joi.object().keys({
                qbenchackid: Joi.number().required()
            });
            return schema.validate({
                qbenchackid: formDTO.qbenchackid
            })
        } else {
            let schema = Joi.object().keys({
                qbench: Joi.number().required()
            });
            return schema.validate({
                qbench: formDTO.qbench
            })
        }
    } catch (error: any) {
        return false;
    }
}

export const getResultValidate = async (formDTO: any) => {
    try {
        if (formDTO?.status) {
            let schema = Joi.object().keys({
                emailid: Joi.string().email().required(),
                status: Joi.string().required(),
            });
            return schema.validate({
                emailid: formDTO.emailid,
                status: formDTO.status,
            });
        } else {
            let schema = Joi.object().keys({
                emailid: Joi.string().email().required(),
            });
            return schema.validate({
                emailid: formDTO.emailid,
            });
        }
    } catch (error: any) {
        return false;
    }
};

export const appointmentValidate = async (formDTO: any, type: number) => {
    try {
        if (type === 0) {
            let schema = Joi.object().keys({
                Email: Joi.string().email().required(),
                CPartnerID: Joi.string().required(),
                CPartnerType: Joi.string().required(),
                Slot_Id: Joi.number().required(),
                Slot_Label: Joi.string().required(),
                Slot_LocationId: Joi.number().required(),
                Slot_Date: Joi.date().raw(),
                TestType: Joi.string().required(),
                PayingMethod: Joi.number().required(),
                Address: Joi.string().required(),
                City: Joi.string().required(),
                State: Joi.string().required(),
                Zipcode: Joi.number().required(),
                FirstName: Joi.string().required(),
                LastName: Joi.string().required(),
                Phone: Joi.string().required(),
                Date: Joi.date().raw(),
            });
            return schema.validate({
                Email: formDTO.Email,
                CPartnerID: formDTO.CPartnerID,
                CPartnerType: formDTO.CPartnerType,
                Slot_Id: formDTO.Slot_Id,
                Slot_Label: formDTO.Slot_Label,
                Slot_LocationId: formDTO.Slot_LocationId,
                Slot_Date: formDTO.Slot_Date,
                TestType: formDTO.TestType,
                PayingMethod: formDTO.PayingMethod,
                Address: formDTO.Address,
                City: formDTO.City,
                State: formDTO.State,
                Zipcode: formDTO.Zipcode,
                FirstName: formDTO.FirstName,
                LastName: formDTO.LastName,
                Phone: formDTO.Phone,
                Date: formDTO.Date,
            });
        } else {
            let schema = Joi.object().keys({
                User_Id: Joi.number().required(),
                Appt_Id: Joi.number().required(),
                AcknowledgementId: Joi.string().required(),
                Email: Joi.string().email().required(),
                CPartnerID: Joi.string().required(),
                CPartnerType: Joi.string().required(),
                Slot_Id: Joi.number().required(),
                Slot_Label: Joi.string().required(),
                Slot_LocationId: Joi.number().required(),
                Slot_Date: Joi.date().raw(),
                TestType: Joi.string().required(),
                PayingMethod: Joi.number().required(),
                QbenchId: Joi.number().required(),
                ConfirmationId: Joi.string().required(),
                Address: Joi.string().required(),
                City: Joi.string().required(),
                State: Joi.string().required(),
                Zipcode: Joi.number().required(),
                FirstName: Joi.string().required(),
                LastName: Joi.string().required(),
                Phone: Joi.string().required(),
                Date: Joi.date().raw(),
            });
            return schema.validate({
                User_Id: formDTO.User_Id,
                Appt_Id: formDTO.Appt_Id,
                AcknowledgementId: formDTO.AcknowledgementId,
                Email: formDTO.Email,
                CPartnerID: formDTO.CPartnerID,
                CPartnerType: formDTO.CPartnerType,
                Slot_Id: formDTO.Slot_Id,
                Slot_Label: formDTO.Slot_Label,
                Slot_LocationId: formDTO.Slot_LocationId,
                Slot_Date: formDTO.Slot_Date,
                TestType: formDTO.TestType,
                PayingMethod: formDTO.PayingMethod,
                QbenchId: formDTO.QbenchId,
                ConfirmationId: formDTO.ConfirmationId,
                Address: formDTO.Address,
                City: formDTO.City,
                State: formDTO.State,
                Zipcode: formDTO.Zipcode,
                FirstName: formDTO.FirstName,
                LastName: formDTO.LastName,
                Phone: formDTO.Phone,
                Date: formDTO.Date,
            });
        }
    } catch (error: any) {
        return false;
    }
};