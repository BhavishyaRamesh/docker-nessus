let sgMail = require('@sendgrid/mail');
let TinyURL = require('tinyurl');
import {config} from './config';
import {
    capitalizeFirstLetter,
    encryptString,
} from '../common/reusableFunctions';
import {isDate} from 'lodash';
import {format} from 'date-fns';
import {resetPasswordWeb} from '../../utils/common/mailerTemplate';
import { logRequestInGCP } from './api-middleware';
const sendgridEmailSend = async (
    to: string,
    subject: any,
    html: any,
    bcc: boolean
) => {
    sgMail.setApiKey(config.functionsConfig.sendgrid.key);
    if (bcc) {
        await sgMail.send({
            to: to.toLowerCase(),
            from: {
                email: config.fromEmail,
                name: 'Worksite Labs',
            },
            bcc: 'sysmon@worksitelabs.com',
            subject,
            html,
        });
    } else {
        await sgMail.send({
            to: to.toLowerCase(),
            from: {
                email: config.fromEmail,
                name: 'Worksite Labs',
            },
            subject,
            html,
        });
    }
};
const ConfirmAppointment = (
	params: any
) => {
	let {
		confirmationId,
		appointment,
		isReschedule,
		Des,
		isMinor,
		encryptedURL,
		isParkingAvailable,
		isAirline,
		index,
		last4,
		patientCount,
		amountPaid,
		totalCost,
		discountAmount} = params;
	const Minors =isReschedule? JSON.parse(appointment.Minors):appointment.Minors
	logRequestInGCP(isParkingAvailable,'isParkingAvailable')
	amountPaid = amountPaid ? amountPaid : 0;
	totalCost = totalCost ? totalCost : 0;
	let testingType = appointment.IsAntigen ? ' ANTIGEN ' : 'PCR '
	let payingMethodValid = appointment.PayingMethod === 2
							? `Credit Card ending in ${last4}`
								: appointment.PayingMethod
	let Minor_firstName: any, Minor_lastName: any, Minor_birthDate: any;

	
	if (Minors.length > 0 && isMinor) {
		Minors.map((e: any, i: any) => {
			if (i === index) {
				let minorBday = typeof (e.BirthDate) === "string" ? e.BirthDate : "-"
				Minor_firstName = e.FirstName;
				Minor_lastName = e.LastName;
				Minor_birthDate = isDate(e.BirthDate) ? format(e.BirthDate, config.dateFormat) : minorBday
			}
		});
	}
	return `
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
		<head>
		<title>WORKSITELABS</title>
		<style media="all" type="text/css">
				html, body, div{
					margin: 0;
					padding: 0;
				}
				html,body{
					font-family: Arial, Open Sans, sans-serif !important;
					font-weight: normal;
					font-style: normal;
					font-size: 16px;
					line-height: 22px;
					color: #515151;
					text-decoration: none;
					position: relative;
				}
				body{
					-webkit-font-smoothing: antialiased;
					-webkit-overflow-scrolling: touch;
					overflow-scrolling: touch;
				}
		h1,h2,h3,h4,h5,h6{
		font-weight: bold;
		margin: 20px 0;
		}
				a{
					text-decoration: none;
					transition: All .2s ease-in-out;
				}
				strong,b{
		font-weight: bold;
				}
				i{
					font-style: italic;
				}
				p{
		margin-top: 0;
		margin-left: 0;
		margin-right: 0;
					margin-bottom: 13px;
				}
				ul,ol {
					margin: 10px 0;
				}
				li{
					margin-bottom: 10px;
				}
				table {
					border-spacing: 0;
					border-collapse: collapse;
					padding: 0;
					margin: 0;
					vertical-align: top;
					text-align: left;
				}
				td {
					border: none;
					padding: 0;
					margin: 0;
					vertical-align: top;
				}
				img{
					height: auto;
					vertical-align:bottom;
				}
				#templateContainer{
					position: relative;
				}
		.two-column ul li{
		margin: 0 !important;
		}
		@media (max-width: 600px) {
		#bodyTable,#templateContainer{
			width: 360px !important;
		}
		#templateHeader,#templateBody,#templateFooter{
			padding-left: 20px !important;
			padding-right: 20px !important;
		
		}
		.mb-table{
			width: 360px!important;
		}
		.text-top{
			padding-left: 16px !important;
			padding-right: 16px !important;
		}
		.text-content{
			padding-left: 16px !important;
			padding-right: 16px !important;
		}
		.logo-top{
			height: 42px !important;
		}
		.logo{
			width: 210px !important;
		}
		.logo-bottom{
			height: 40px !important;
		}
		.text-intro h3{
			margin-bottom: 25px !important;
		}
		.text-intro-bottom{
			height: 15px !important;
		}
		.button-none{
			display: none !important;
		}
		.button{
			display: block !important;
			width: 100%;
			margin: 0;
			margin-bottom: 20px;
		}
		.footer-top-height{
			height: 8px !important;
		}
		.footer-bottom-height{
			height: 40px !important;
		}
		}
		@media (max-width: 400px) {
		html,body{
			font-size: 15px;
			line-height: 20px;
		}
		#bodyTable,#templateContainer{
			width: 100% !important;
		}
		.mb-table{
			width: 100% !important;
		}
		.logo{
			width: 195px !important;
		}
		.mb-block{
			display: block !important;
			width: 100% !important;
		}
		}
		.align{
			margin-left: 50px;
		}
			</style>
		</head>
		<body>
			<center>
				<table id="bodyTable" width="600" style="margin: 0 auto;">
		<tr>
			<td id="bodyCell">
			<table id="templateContainer" width="600" style="margin: 0 auto;background: #fff">
			<tr>
			<td id="templateHeader" style="padding: 0;padding-left: 50px;padding-right: 50px;">
				<table class="mb-table" width="500">
				<tr>
				<td style="height: 62px" class="logo-top"></td>
				</tr>
				<tr>
				<td><img src="https://firebasestorage.googleapis.com/v0/b/worksite-labs-ccb7d.appspot.com/o/logo.png?alt=media&token=32b9973a-792d-44f7-a408-e83e141a6bd8" alt="" width="224" class="logo"></td>
				</tr>
				<tr>
				<td style="height: 57px" class="logo-bottom"></td>
				</tr>
				</table>
			</td>
			</tr>
			<tr>
			<td id="templateBody" style="padding: 0;padding-left: 50px;padding-right: 50px;">
				<table class="mb-table" width="500">
				<tr>
				<td style="" class="text-intro">
				<h3 style="font-size: 22px;line-height: 26px;color: #2A5F87;margin: 0;margin-bottom: 35px;">Your appointment has been ${
                    isReschedule ? 're' : ''
                }scheduled</h3>
				<p style="font-weight: bold;margin-bottom: 5px;">Hello ${
                    isMinor
                        ? capitalizeFirstLetter(Minor_firstName || '')
                        : capitalizeFirstLetter(appointment.FirstName || '')
                }!</p>
				<p>
					Your appointment for COVID-19 testing has been confirmed.${
                        appointment?.cPartnerID !== undefined &&
                        appointment?.cPartnerID !== null &&
                        appointment?.cPartnerID !== '' &&
                        appointment?.cPartnerID === 'LLT001'
                            ? ` You will be required to show up at the location below for weekly testing. No additional registration is required. Your one-time registration automatically places you for weekly testing at the location below.`
                            : ''
                    }
				</p>
				</td>
				</tr>
				<tr>
				<td style="height: 25px" class="text-intro-bottom"></td>
				</tr>
				</table>
				<table class="mb-table" width="500">
				<tr>
				<td style="border: 3px solid #2A5F87;display: block;">
				
				<table width="100%">
					<tr>
					<td style="font-weight: bold;color: #ffffff;background: #2A5F87;padding: 0;padding-left: 26px;padding-right: 26px;padding-top: 5px;padding-bottom: 5px;" class="text-top">
					Appointment Details
					</td>
					</tr>
					<tr>
					<td style="height: 29px;"></td>
					</tr>
					<tr>
					<td style="padding: 0;padding-left: 26px;padding-right: 26px;" class="text-content">
                    ${
                        confirmationId === 'NULL'
                            ? `<div>
                            <p style="color: #262626">The confirmation # will be sent in a subsequent email on Sunday.</p>
                        </div>`
                            : `<div>
                            <b style="font-size: 12px;line-height: 22px;color: #1A96DB;">CONFIRMATION #</b>
                            <p style="color: #262626"><b>${confirmationId}</b></p>
                        </div>`
		}
					${appointment?.Location?.isQRCodeSend === 1
			? `<p><img src='${encryptedURL}'/></p><br/>
					<p>Please show this QR code upon check in. If you are unable to view the QR code, please click  <a href="${encryptedURL}">this link.</a> </p>`
                            : ''
                    }
					<b style="font-size: 12px;line-height: 22px;color: #1A96DB;">LOCATION</b>
					<p>
					<b>${appointment.Location?.Name}</b><br>
					${appointment.Location?.Address1} ${appointment.Location?.Address2}<br>
                    ${
                        appointment.Location?.Room !== undefined &&
                        appointment.Location?.Room !== null
                            ? appointment.Location?.Room
                            : ''
                    } 
					</p>
					<p>
						<a href= "${
                            appointment?.Location?.Locationlink !== undefined
                                ? appointment?.Location?.Locationlink
                                : ''
                        }" target="_blank">
						<img src="https://firebasestorage.googleapis.com/v0/b/worksite-labs---dev.appspot.com/o/map.png?alt=media&token=8671b5ef-9f3e-4d6d-8a8d-a773385d1472" width="22" height"30"/>
						<span style="font-size:12px" >Click here to navigate</span>
						</a>
					</p>
					<b style="font-size: 12px;line-height: 22px;color: #1A96DB;">
					DATE
					</b>
					<p style="margin-bottom: 11px;">
						${appointment.Date}
					</p>
					<b style="font-size: 12px;line-height: 22px;color: #1A96DB;">
					TIME
					</b>
					<p style="margin-bottom: 20px;">
					${appointment.Slot_Label ?? ''}
					</p>
					<b style="font-size: 12px;line-height: 22px;color: #1A96DB;">INFORMATION</b>
					<table>
					<tr>
						<td style="height: 8px;"></td>
					</tr>
					<tr>
						<td width="170" style="font-weight: bold;" class="mb-block">Name</td>
						<td width="" class="mb-block">${
                            isMinor
                                ? capitalizeFirstLetter(Minor_firstName || '') +
                                  ` ` +
                                  Minor_lastName
                                : capitalizeFirstLetter(
                                      appointment.FirstName || ''
                                  ) +
                                  ` ` +
                                  appointment.LastName
                        }</td>
					</tr>
					<tr>
						<td style="height: 12px;"></td>
					</tr>
					<tr>
						<td style="font-weight: bold;" class="mb-block">Date of Birth</td>
						<td class="mb-block">${isMinor ? Minor_birthDate : appointment.BirthDate}</td>
					</tr>
					<tr>
						<td style="height: 13px;"></td>
					</tr>
					${
                        isMinor
                            ? ``
                            : `<tr>
							<td style="font-weight: bold;" class="mb-block">Phone Number</td>
							<td class="mb-block"><a href="tel:${appointment.Phone}" style="text-decoration: none;color: #515151;">${appointment.Phone}</a></td>
						</tr>`
                    }         
					<tr>
						<td style="height: 13px;"></td>
					</tr>
					<tr>
						<td style="font-weight: bold;" class="mb-block">Home Address</td>
						<td class="mb-block"><a href="https://goo.gl/maps/kExBL6tcxrqMTZrH6" target="_blank" style="text-decoration: none;color: #515151;">
						${
                            appointment?.IsNotHavePermanentAddress
                                ? `I don't currently have a permanent address`
                                : `${appointment.Address} <br> ${appointment.City}, ${appointment.State} ${appointment.Zipcode}`
                        }
						</a>
						</td>
					</tr>
					</table>
					${isMinor
			? ``
			: Minors?.length > 0
				? `<b style="font-size: 12px;line-height: 22px;color: #1A96DB;">MINORS</b>
							<table>
							${Minors
					?.map(({ FirstName, LastName, BirthDate }: any) => {
						let minorBirthDate = isDate(BirthDate) ? format(BirthDate, config.dateFormat) : typeof (BirthDate) === "string" ? BirthDate : "-"
						return `
								<tr>
								<td width="170" style="font-weight: bold;" class="mb-block">Name</td>
								<td width="" class="mb-block">${capitalizeFirstLetter(
                                    FirstName || ''
                                )} ${LastName}</td>
								</tr>
								<tr>
								<td style="height: 12px;"></td>
								</tr>
								<tr>
								<td style="font-weight: bold;" class="mb-block">Date of Birth</td>
								<td class="mb-block">${minorBirthDate}</td>
								</tr>
								<tr>
								<td style="height: 12px;"></td>
								</tr>                        
								`;
                            }).join('')}
		
							</table>`
                            : ``
                    }
                    <tr>
						<td style="height: 15px;"></td>
					</tr>
					</td>
                    </tr>
                    
					<tr>
					<td style="height: 36px;"></td>
					</tr>
				</table>
				</td>
				</tr>
				</table>
               
                
               
                <div>
                <table class="mb-table" width="500">
				<tr>
					<td style="border: 3px solid #2A5F87;display: block;">
						<table width="100%">
							<tr>
								<td style="font-weight: bold;color: #ffffff;background: #2A5F87;padding: 0;padding-left: 26px;padding-right: 26px;padding-top: 5px;padding-bottom: 5px;"
									class="text-top">
									Billing Details
								</td>
							</tr>
							<tr>
								<td style="height: 29px;"></td>
							</tr>
							<tr>
								<td style="padding: 0;padding-left: 26px;padding-right: 26px;"
									class="text-content">
                                   ${
                                       (appointment.PayingMethod ===
                                           'Credit Card' ||
                                           appointment.PayingMethod ===
                                               'Credit card') &&
                                       appointment.PromoCode !== 'EYEPROD' &&
                                       appointment.PromoCode !== 'EMPLOYEE'
                                           ? `
                                    <div>
									<div>
										<div style="display: flex;" class="mb-block">
											<div class="mb-block" style="margin-right: auto;">
												<div> <b
														style="font-size: 12px;line-height: 22px;color: #1A96DB;">TOTAL
														AMOUNT PAID
													</b>
													<div>$${amountPaid}</div>
													<br />
												</div>
											</div>
											<div class="mb-block" style="margin-right: auto;">
												<div> <b
														style="font-size: 12px;line-height: 22px;color: #1A96DB;">DATE
														PAID
													</b>
													<div>${format(new Date(), config.dateFormat)}</div> 
													<br />
												</div>
											</div>
											<div class="mb-block">
												<div> <b
														style="font-size: 12px;line-height: 22px;color: #1A96DB;">
														PAYMENT METHOD
													</b>
													 <div>${payingMethodValid}</div>
													<br />
												</div>
											</div>
										</div>
									</div>
	
	
									<b
										style="font-size: 12px;line-height: 22px;color: #1A96DB;">SUMMARY</b>
									<div style="background:#EDF7FC;padding:15px;font-size: 12px;">
										<div style="display: flex;">
											<p style="margin-right: auto;">${patientCount || 0}x COVID-19
												${testingType} TEST</p>
											<p>$${totalCost}</p>
										</div>
										${
                                            discountAmount != 0 &&
                                            discountAmount !== undefined &&
                                            discountAmount !== null
                                                ? `
										<div style="display: flex;">
											<p style="margin-right: auto;">Discount amount</p>
											<p>$${discountAmount}</p>
										</div>
										`
                                                : ''
                                        }
										<hr />
										<div style="display: flex;">
											<b style="margin-right: auto;">Amount Charged</b>
											<b>$${amountPaid}</b>
										</div>
									</div>
                      </div>`
                                           : ''
                                   }
									<br />
	
									<div style="display: flex;width:65%">
										<div style="margin-right: auto;"> <b
												style="font-size: 12px;line-height: 22px;color: #1A96DB;">NPI
												#
											</b>
											<div><b>1467030536</b></div>
											<br />
										</div>
										<div> <b
												style="font-size: 12px;line-height: 22px;color: #1A96DB;">CPT
												Code(s)
	
											</b>
											<div><b>U0003,U0005</b></div>
											<br />
										</div>
									</div>
									<div style="display: flex;width:63%">
										<div style="margin-right: auto;"> <b
												style="font-size: 12px;line-height: 22px;color: #1A96DB;">CLIA
												#
											</b>
											<div><b>${appointment?.Location?.CLIA}</b></div>
											<br />
										</div>
										<div style="margin-left: -10px;"> <b
												style="font-size: 12px;line-height: 22px;color: #1A96DB;">ICD-10
												Code
											</b>
											<div><b>Z11.52</b></div>
											<br />
										</div>
									</div>
									<i style="font-size: 12px;line-height: 22px;"><b>NOTICE
											TO INSURANCE COMPANY OF ASSIGNMENT: </b>You are
										instructed to PAY DIRECTLY TO THE ABOVE NAMED SUBSCRIBER
										AND/OR PATIENT for all professional services rendered.
										Reimbursement issued to your member will repressent the
										benefit amount payable for the service and will be attached
										to an Explanation of Benefits (EOB).</i>
								</td>
							</tr>
							<tr>
								<td style="height: 36px;"></td>
							</tr>
						</table>
					</td>
				</tr>
				</table>
                </div>
               
				
				<table class="mb-table" width="500">
				<tr>
				<td style="height: 25px"></td>
				</tr>
				<tr>
				<td>
				<p>Please bring this information and a photo ID to your appointment.</p>
				</td>
				</tr>
				<tr>
				<td style="height: 13px"></td>
				</tr>
				</table>
				${
                    isMinor
                        ? ``
                        : `
					<table class="mb-table" width="500">
					<tr>
					<td style="height: 25px"></td>
					</tr>
					<tr>
					<td width="245" align="center" style="border: 1px solid #2A5F87;box-sizing: border-box;border-radius: 5px;display: inline-block;padding: 0;padding-top: 9px;padding-bottom: 7px;padding-left: 10px;padding-right: 10px;" class="button">
					<a href="https://www.schedulecovidtesting.com/signin" target="_blank" style="font-weight: bold;color: #2A5F87;">Cancel Appointment</a>
					</td>
					<td width="10" class="button-none"></td>
					<td width="245" align="center" style="background: #27AE60;border: 1px solid #27AE60;box-sizing: border-box;border-radius: 5px;display: inline-block;padding: 0;padding-top: 9px;padding-bottom: 7px;padding-left: 10px;padding-right: 10px;" class="button">
					<a href="https://www.schedulecovidtesting.com/signin" target="_blank" style="font-weight: bold;color: #ffffff;">I'd like to reschedule</a>
					</td>
					</tr>
					<tr>
					<td style="height: 24px"></td>
					</tr>
					</table>`
                }
			</td>
			</tr>
		
			${
                isAirline
                    ? `<tr>
			<td>
			<table class="mb-table" width="500">
			<tr  style="padding: 0;padding-left: 50px;padding-right: 50px;">
			<td >
			
				<div class="align">
					<hr style="width:50%;
						height:1px;
						background-color:blue;
						margin-left:0"/>
					<h4> Download the CommonPass app to seamlessly access your results with your Worksite Labs login.</h4>
						
					<div class="box">
					<div>
					<a href=${Des} target="_blank" style="color:#7376F6;font-weight: 530;font-size:15px"><img style="width: 50%" src="https://images.squarespace-cdn.com/content/5f6a19111e0fc3540d49a84e/1602347782111-LZVO8DX8LS9ZK0XC19F0/CommonPass_Logo.png?format=1500w&content-type=image%2Fpng"/></a>
					</div>
					<br/>
					
					<div style=margin-top:50px;">
					<a href="https://play.google.com/store/apps/details?id=org.thecommonsproject.android.commonpass" target="_blank"><img style="width:180px;display: inline;float: left;margin-right: 20px;" src="http://cdn.mcauto-images-production.sendgrid.net/68fec8322c4775ec/1a43b4bb-4bc7-412b-a6c9-359c816de517/300x89.png"/></a>
					<a href="https://apps.apple.com/us/app/commonpass/id1548682047" target="_blank"><img style="width: 180px;" src="http://cdn.mcauto-images-production.sendgrid.net/68fec8322c4775ec/60ae9cde-a8d0-45a9-bd2a-674f2dde42c5/300x89.png"/></a>
					<div style=padding-top:50px;">
					<br/>
					<a href=${Des} target="_blank" style="color:#7376F6;font-weight: 530;font-size:15px">Click here for more information about CommonPass</a>
				</div>
				</div>
				</td>
				</tr>
				</table>
				</td>
				</tr> `
                    : `<div></div>`
            }
			<tr>
			<td id="templateFooter" style="padding: 0;padding-left: 50px;padding-right: 50px;">
				<table class="mb-table footer" width="500">
				<tr>
				<td style="height: 34px;" class="footer-top-height"></td>
				</tr>
				<tr>
				<td align="center">
				<p style="font-size: 12px;line-height: 18px;"><a
					href="mailto:support@worksitelabs.com" style="text-decoration: none;color: #515151;">support@worksitelabs.com</a></p>
				</td>
				</tr>
				<tr>
				<td style="height: 50px;" class="footer-bottom-height"></td>
				</tr>
				</table>
			</td>
			</tr>
			</table>
			</td>
		</tr>
				</table>
			</center>
		</body>
	</html>
	`;
};
const sendConfirmationEmail = async (
	data: any
) => {
	const {
	confirmationId,
	appointment,
	isReschedule,
	isParkingAvailable,
	isAirline,
	last4,
	patientCount,
	amountPaid,
	totalCost,
	discountAmount
	} = data
	const urlShotner = async () => {
		const encryptURL = encryptString(confirmationId);
		const res: any = await TinyURL.shorten(
			`https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=https://admin-dev-b5e92.web.app/dashboard/DayWiseAppointments?Id=${encryptURL ?? confirmationId}`
		).then((response: any) => {
			return response;
		});
		if (res !== null && res !== undefined) {
			let Des =
				appointment.Destination == 'ABW'
					? 'http://commonpass.worksitelabs.com/aruba'
					: 'http://commonpass.worksitelabs.com/hawaii';
			let html: any = '';
			if (
				appointment.RegisteringFor === 'myselfAndMinor' ||
				appointment.RegisteringFor === 'minorOnly'
			) {
				let params: any = {
					confirmationId: confirmationId,
					appointment: appointment,
					isReschedule: isReschedule,
					Des: Des,
					isMinor: false,
					encryptedURL: res,
					isParkingAvailable: isParkingAvailable,
					isAirline: isAirline,
					index: -1,
					last4: last4,
					patientCount: patientCount,
					amountPaid: amountPaid,
					totalCost: totalCost,
					discountAmount: discountAmount
				}
				html = ConfirmAppointment(
					params
					);
					console.log("sendgrid")

				await sendgridEmailSend(
					appointment?.Email,
					`Your appointment has been ${isReschedule ? 're' : ''
					}scheduled`,
					html,
					true
				);
				const Minors = isReschedule? JSON.parse(appointment.Minors):appointment.Minors;
				if (Minors.length > 0) {
					Minors?.map(async (e, i: number) => {
						let email =
							e?.Email !== undefined || e?.Email !== ''
								? e?.Email
								: '';
						if (email) {
							let parameters: any = {
								confirmationId: confirmationId,
								appointment: appointment,
								isReschedule: isReschedule,
								Des: Des,
								isMinor: true,
								encryptedURL: res,
								isParkingAvailable: isParkingAvailable,
								isAirline: isAirline,
								index: i,
								last4: last4,
								patientCount: patientCount,
								amountPaid: amountPaid,
								totalCost: totalCost,
								discountAmount: discountAmount
							}
							html = ConfirmAppointment(
								parameters
							);
							await sendgridEmailSend(
								email,
								`Your appointment has been ${isReschedule ? 're' : ''
								}scheduled`,
								html,
								true
							);
						}
					});
				}
			} else if (appointment.RegisteringFor === 'myself') {
				let datas: any = {
					confirmationId: confirmationId,
					appointment: appointment,
					isReschedule: isReschedule,
					Des: Des,
					isMinor: false,
					encryptedURL: res,
					isParkingAvailable: isParkingAvailable,
					isAirline: isAirline,
					index: -1,
					last4: last4,
					patientCount: patientCount,
					amountPaid: amountPaid,
					totalCost: totalCost,
					discountAmount: discountAmount
				}
				html = ConfirmAppointment(
					datas
				);
				await sendgridEmailSend(
					appointment?.Email,
					`Your appointment has been ${isReschedule ? 're' : ''
					}scheduled`,
					html,
					true
				);
			}
		}
		return null;
	};
	await urlShotner();
};
const sendConfirmationEmailpoc = async (to: string, name: string) => {
    const email = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Remainder</title>
    </head>
    <body>
        Hi ${name}, Your details got successfully updated to qbench.
    </body>
    </html>`;
    sgMail.setApiKey(config.functionsConfig.sendgrid.key);
    await sgMail.send({
        to,
        from: {
            email: config.fromEmail,
            name: 'Worksite Labs',
        },
        bcc: 'sysmon@worksitelabs.com',
        subject: `post pub sub`,
        html: email,
    });
};
export const resetPasswordWebEmail = async (
    emailencrypt: string,
    UserEmail: string,
    dateEncrypt: string
) => {
    try {
        let resetlink = `http://localhost:8080/forgetPassword?Email=${emailencrypt}&Date=${dateEncrypt}`;
        let emailTemplate = resetPasswordWeb(resetlink);
        sgMail.setApiKey(config.functionsConfig.sendgrid.key);
        let message = {
            to: UserEmail,
            from: {
                email: config.fromEmail,
                name: 'Worksite Labs',
            },
            subject: `Reset Password`,
            html: emailTemplate,
        };
        await sgMail.send(message);
    } catch (error) {
        console.log(error);
    }
};
const sendOneTimePasswordNotificationMail = async (
    to: string,
    otp: string,
    name: string,
    id?: string,
    isChangeEmail?: boolean
) => {
    const email = `<html>

  <head>
	  <title>Worksite Labs</title>
  </head>
  <!-- //linear-gradient(to bottom right,#227EB3, #48ABE3); -->
  
  <body
	  style="background-color: #2582B7; background-image: radial-gradient(circle at bottom right,#48ABE3,#227EB3 80%); ">
	  <table
		  style="border:none; margin:0px auto; font-family: Segoe UI,Arial, sans-serif,Verdana,Geneva; background-color: #ffffff; color:  #424242;"
		  border="0" cellspacing="0" cellpadding="0" align="center" width="400">
		  <tbody>
			  <tr>
				  <td valign="top" style="border:1px solid #d2d3d5; padding:10px;">
					  <table border="0" cellspacing="0" cellpadding="0" width="400">
						  <tbody>
							  <tr>
								  <td width="100%" colspan="2" valign="top"
									  style="text-align: center;padding: 15px; width:100%;background-color: #FFFFFF; justify-content: center;height: 40px; align-content: center;">
									  <img src="https://firebasestorage.googleapis.com/v0/b/worksite-labs-ccb7d.appspot.com/o/logo.png?alt=media&token=32b9973a-792d-44f7-a408-e83e141a6bd8"
										  alt="" width="224" class="logo">
								  </td>
							  </tr>
							  <!-- <tr>
								  <td width="100%" colspan="2" valign="top"
									  style="padding: 15px; width:100%;background-color: #FFFFFF; justify-content: center;height: 40px; align-content: center;">
									  <p style="text-align: left;font-size: 15px;color: #202124;">
										Here is your verification information:
									  </p>
								  </td>
							  </tr> -->
							  <tr>
								  <td width="100%" colspan="2" valign="top"
									  style="padding: 10px 15px 10px 15px; width:100%;background-color:#FFFFFF; justify-content: center;height: 40px; align-content: center;">
                                      ${
                                          isChangeEmail
                                              ? `<p style="text-align: left;font-size: 15px;color:#202124;">
                                      ${name}, please click this <a target="_blank" style="font-weight: bold;color: #2A5F87;" href='https://wsl-multitenancy-dev-ac13b.web.app/verifymail/${id}-${isChangeEmail}'> link </a> to confirm your email address change.
                                  </p>`
                                              : `<p style="text-align: left;font-size: 15px;color:#202124;">
										  ${name}, please enter the verification code below during the get appointment
											  process to
											  confirm it’s you.
									  </p>`
                                      }
                                      
									  <p 
										id="code"
										style="text-align: center;font-weight: bold;font-size: 30px; margin: 25px 110px 20px 110px;">
										${otp}
										</p>
								  </td>
							  </tr>
							  <tr>
								<td width="100%" colspan="2" valign="top"
									style="padding: 0px 0px 0px 15px; width:100%;background-color: #FFFFFF; justify-content: center;height: 40px; align-content: center;">
									<p style="text-align: left;font-size: 15px;color: #202124;">You can also verify your account by
                                    ${
                                        isChangeEmail === true
                                            ? `<a target="_blank" style="font-weight: bold;color: #2A5F87;" href='https://wsl-multitenancy-dev-ac13b.web.app/verifymail/${id}-${isChangeEmail}'> Clicking this. </a>`
                                            : `<a target="_blank" style="font-weight: bold;color: #2A5F87;" href='https://wsl-multitenancy-dev-ac13b.web.app/verifymail/${id}'> Clicking this. </a>`
                                    }
											
									</p>
								</td>
							  </tr>
							  <tr>
								  <td width="100%" colspan="2" valign="top"
									  style="padding: 0px 0px 0px 15px; width:100%;background-color: #FFFFFF; justify-content: center;height: 40px; align-content: center;">
									  <p style="text-align: left;font-size: 15px;color: #202124;">
										  This code will expire in 5 minutes.
									  </p>
								  </td>
							  </tr>
							  <tr>
								  <td valign="top"
									  style="width:60%; padding:10px; padding-right:2%; box-sizing:border-box;">
  
									  <P style="text-align: center;">
										  <a style="color: #a9a9a9;" href="mailto:support@worksitelabs.com"
											  target="_blank">
											  support@worksitelabs.com
										  </a>
									  </P>
								  </td>
							  </tr>
						  </tbody>
					  </table>
				  </td>
			  </tr>
		  </tbody>
	  </table>
	  </td>
	  </tr>
	  </tbody>
	  </table>
  </body>
  
  </html>
	`;
    await sendgridEmailSend(to, 'Verification', email, true);
};

const sendCancellationEmail = async (
    appointment: any,
    includeMinor: boolean
) => {
    let email = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
	<title>WORKSITELABS</title>
	<style media="all" type="text/css">
			html, body, div{
				margin: 0;
				padding: 0;
			}
			html,body{
				font-family: Arial, Open Sans, sans-serif !important;
				font-weight: normal;
				font-style: normal;
				font-size: 16px;
				line-height: 22px;
				color: #515151;
				text-decoration: none;
				position: relative;
			}
			body{
				-webkit-font-smoothing: antialiased;
				-webkit-overflow-scrolling: touch;
				overflow-scrolling: touch;
			}
	h1,h2,h3,h4,h5,h6{
	font-weight: bold;
	margin: 20px 0;
	}
			a{
				text-decoration: none;
				transition: All .2s ease-in-out;
			}
			strong,b{
	font-weight: bold;
			}
			i{
				font-style: italic;
			}
			p{
	margin-top: 0;
	margin-left: 0;
	margin-right: 0;
				margin-bottom: 13px;
			}
			ul,ol {
				margin: 10px 0;
			}
			li{
				margin-bottom: 10px;
			}
			table {
				border-spacing: 0;
				border-collapse: collapse;
				padding: 0;
				margin: 0;
				vertical-align: top;
				text-align: left;
			}
			td {
				border: none;
				padding: 0;
				margin: 0;
				vertical-align: top;
			}
			img{
				height: auto;
				vertical-align:bottom;
			}
			#templateContainer{
				position: relative;
			}
	.two-column ul li{
	margin: 0 !important;
	}
	@media (max-width: 600px) {
	#bodyTable,#templateContainer{
		width: 360px !important;
	}
	#templateHeader,#templateBody,#templateFooter{
		padding-left: 20px !important;
		padding-right: 20px !important;
	
	}
	.mb-table{
		width: 360px!important;
	}
	.text-top{
		padding-left: 16px !important;
		padding-right: 16px !important;
	}
	.text-content{
		padding-left: 16px !important;
		padding-right: 16px !important;
	}
	.logo-top{
		height: 42px !important;
	}
	.logo{
		width: 210px !important;
	}
	.logo-bottom{
		height: 40px !important;
	}
	.text-intro h3{
		margin-bottom: 25px !important;
	}
	.text-intro-bottom{
		height: 15px !important;
	}
	.button-none{
		display: none !important;
	}
	.button{
		display: block !important;
		width: 100%;
		margin: 0;
		margin-bottom: 20px;
	}
	.footer-top-height{
		height: 8px !important;
	}
	.footer-bottom-height{
		height: 40px !important;
	}
	}
	@media (max-width: 400px) {
	html,body{
		font-size: 15px;
		line-height: 20px;
	}
	#bodyTable,#templateContainer{
		width: 100% !important;
	}
	.mb-table{
		width: 100% !important;
	}
	.logo{
		width: 195px !important;
	}
	.mb-block{
		display: block !important;
		width: 100% !important;
	}
	}
	.align{
		margin-left: 50px;
	}
		</style>
	</head>
	<body>
		<center>
			<table id="bodyTable" width="600" style="margin: 0 auto;">
	<tr>
		<td id="bodyCell">
		<table id="templateContainer" width="600" style="margin: 0 auto;background: #fff">
		<tr>
		<td id="templateHeader" style="padding: 0;padding-left: 50px;padding-right: 50px;">
			<table class="mb-table" width="500">
			<tr>
			<td style="height: 62px" class="logo-top"></td>
			</tr>
			<tr>
			<td><img src="https://firebasestorage.googleapis.com/v0/b/worksite-labs-ccb7d.appspot.com/o/logo.png?alt=media&token=32b9973a-792d-44f7-a408-e83e141a6bd8" alt="" width="224" class="logo"></td>
			</tr>
			<tr>
			<td style="height: 57px" class="logo-bottom"></td>
			</tr>
			</table>
		</td>
		</tr>
		<tr>
		<td id="templateBody" style="padding: 0;padding-left: 50px;padding-right: 50px;">
			<table class="mb-table" width="500">
			<tr>
			<td style="" class="text-intro">
			<h3 style="font-size: 22px;line-height: 26px;color: #2A5F87;margin: 0;margin-bottom: 35px;">Your appointment has been cancelled</h3>
			<p style="font-weight: bold;margin-bottom: 5px;">Hello ${capitalizeFirstLetter(
                appointment?.FirstName || ''
            )}!</p>
			<p>
				Your appointment for COVID-19 testing has been cancelled. A refund has been issued to the original form of payment. Please note that it can take 10+ days to appear on your statement. If it takes longer please contact your bank for assistance. If you paid with insurance, no further action is necessary as we will not bill your insurance provider for this appointment.
			</p>
			</td>
			</tr>
			<tr>
			<td style="height: 25px" class="text-intro-bottom"></td>
			</tr>
			</table>
			<table class="mb-table" width="500">
			<tr>
			<td style="border: 3px solid #2A5F87;display: block;">
			
			<table width="100%">
				<tr>
				<td style="font-weight: bold;color: #ffffff;background: #2A5F87;padding: 0;padding-left: 26px;padding-right: 26px;padding-top: 5px;padding-bottom: 5px;" class="text-top">
				Appointment Details
				</td>
				</tr>
				<tr>
				<td style="height: 29px;"></td>
				</tr>
				<tr>
				<td style="padding: 0;padding-left: 26px;padding-right: 26px;" class="text-content">
				<b style="font-size: 12px;line-height: 22px;color: #1A96DB;">CONFIRMATION #</b>
				<p style="color: #262626"><b>${appointment?.ConfirmationId}</b></p>
				<b style="font-size: 12px;line-height: 22px;color: #1A96DB;">LOCATION</b>
				<p>
				<b>${appointment.Location?.Name}</b><br>
				${appointment.Location?.Address1} ${appointment.Location?.Address2}
				</p>
				<p>
					<a href= "${
                        appointment?.Location?.Locationlink !== undefined
                            ? appointment?.Location?.Locationlink
                            : ''
                    }" target="_blank">
					<img src="https://firebasestorage.googleapis.com/v0/b/worksite-labs---dev.appspot.com/o/map.png?alt=media&token=8671b5ef-9f3e-4d6d-8a8d-a773385d1472" width="22" height"30"/>
					<span style="font-size:12px" >Click here to navigate</span>
					</a>
				</p>
				<b style="font-size: 12px;line-height: 22px;color: #1A96DB;">
				DATE
				</b>
				<p style="margin-bottom: 11px;">
					${appointment.Date}
				</p>
				<b style="font-size: 12px;line-height: 22px;color: #1A96DB;">
				TIME
				</b>
				<p style="margin-bottom: 20px;">
				${appointment.Slot_Label}
				</p>
				<b style="font-size: 12px;line-height: 22px;color: #1A96DB;">INFORMATION</b>
				<table>
				<tr>
					<td style="height: 8px;"></td>
				</tr>
				<tr>
					<td width="170" style="font-weight: bold;" class="mb-block">Name</td>
					<td width="" class="mb-block">${
                        capitalizeFirstLetter(appointment.FirstName || '') +
                        ` ` +
                        appointment.LastName
                    }</td>
				</tr>
				<tr>
					<td style="height: 12px;"></td>
				</tr>
				<tr>
					<td style="font-weight: bold;" class="mb-block">Date of Birth</td>
					<td class="mb-block">${appointment.BirthDate}</td>
				</tr>
				<tr>
					<td style="height: 13px;"></td>
				</tr>
				
					<tr>
						<td style="font-weight: bold;" class="mb-block">Phone Number</td>
						<td class="mb-block"><a href="tel:${
                            appointment.Phone
                        }" style="text-decoration: none;color: #515151;">${
        appointment.Phone
    }</a></td>
					</tr>
			       
				<tr>
					<td style="height: 13px;"></td>
				</tr>
				<tr>
					<td style="font-weight: bold;" class="mb-block">Home Address</td>
					<td class="mb-block"><a href="https://goo.gl/maps/kExBL6tcxrqMTZrH6" target="_blank" style="text-decoration: none;color: #515151;">
					${
                        appointment.IsNotHavePermanentAddress
                            ? `I don't currently have a permanent address`
                            : `${appointment.Address} <br> ${appointment.City}, ${appointment.State} ${appointment.ZipCode}`
                    }
					</a>
					</td>
				</tr>
				${
                    includeMinor && appointment.Minors?.length > 0
                        ? `<b style="font-size: 12px;line-height: 22px;color: #1A96DB;">MINORS</b>
							<table>
							${appointment.Minors?.map(({FirstName, LastName, BirthDate}) => {
                                let birthDate =
                                    typeof BirthDate === 'string'
                                        ? BirthDate
                                        : '-';
                                let minorBirthDate = isDate(BirthDate)
                                    ? format(BirthDate, config.dateFormat)
                                    : birthDate;
                                return `
								<tr>
								<td width="170" style="font-weight: bold;" class="mb-block">Name</td>
								<td width="" class="mb-block">${capitalizeFirstLetter(
                                    FirstName || ''
                                )} ${LastName}</td>
								</tr>
								<tr>
								<td style="height: 12px;"></td>
								</tr>
								<tr>
								<td style="font-weight: bold;" class="mb-block">Date of Birth</td>
								<td class="mb-block">${minorBirthDate}</td>
								</tr>
								<tr>
								<td style="height: 12px;"></td>
								</tr>                        
								`;
                            }).join('')}
		
							</table>`
                        : ``
                }
				</table>
				</body>
				</html>`;
    await sendgridEmailSend(
        appointment?.Email,
        `Your appointment has been cancelled`,
        email,
        false
    );
};
export default {
    sendConfirmationEmail,
    sendConfirmationEmailpoc,
    sendOneTimePasswordNotificationMail,
    sendCancellationEmail,
};
