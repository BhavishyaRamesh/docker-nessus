export const resetPasswordWeb = function (resetlink) {
  return (`
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
          <table id="bodyTable" width="800" style="margin: 0 auto;">
        <tr>
         <td id="templateBody" style="padding: 0;padding-left: 50px;padding-right: 50px;">
          <table class="mb-table" width="700">
           <tr>
            <td style="background: #f1f1f1;padding: 10px;display: block;">
            
             <table width="100%">
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
               <td style="font-weight: bold;color: #ffffff;background: #2A5F87;padding: 0;padding-left: 26px;padding-right: 26px;padding-top: 25px;
               padding-bottom: 25px;height: 0px;font-size: 25px;text-align: center;" class="text-top">
                Reset Your Password
               </td>
              </tr>
              <tr>
               <td style="height: 25px;line-height: 5px"></td>
              </tr>
        <tr style="font-size: 15px;">
        <td>
          <p style="padding:2px"> Dear User, </p>
          <p style="padding:2px"> Click on below link to reset your password </p>
          <p style="padding:2px"><b> ${resetlink} </b></p>

        </td>
        </tr>
              <tr>
               <td style="height: 36px;">Thanks</td>
              </tr>
             </table>
            </td>
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
`)
}
