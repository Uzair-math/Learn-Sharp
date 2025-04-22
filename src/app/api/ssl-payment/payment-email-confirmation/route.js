import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import formatTimestamp from "@/utils/formatTimestamp";
// TODO
export async function POST(request) {
	try {
		const {
			_id,
			tuitionId,
			transactionID,
			tutor_name,
			tutor_email,
			student_name,
			student_email,
			subject_name,
			class_name,
			payment_amount,
			payment_month,
			updatedAt,
		} = await request.json();

		const paymentDate = formatTimestamp(updatedAt)[0];
		const paymentTime = formatTimestamp(updatedAt)[1];
				
		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.NODEMAILER_EMAIL,
				pass: process.env.NODEMAILER_PASSWORD,
			},
		});

		const studentPaymentNotificationEmail = {
      to: student_email,
      from: '"Learn Sharp " <mamun.bbn.bd@gmail.com>', // sender information
      subject: "Learn Sharp  - Payment Notification",
      html: `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Learn Sharp  - Payment Notification</title>
					<style>
						body {
							font-family: Arial, sans-serif;
							margin: 0;
							padding: 0;
							background-color: #005e6b; /* Teal-900 background */
						}
						.container {
							padding: 20px;
							background-color: #ffffff;
							box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
						}
						h1 {
							color: #333;
						}
						table {
							width: auto;
							border-collapse: collapse;
							margin-top: 20px;
						}
						th, td {
							padding: 10px;
							border: 1px solid #8c8c8c;
						}
						th {
							text-align: center;
							background-color: #d9d9d9;
							color: #000;
						}
						td {
							text-align: left;
							background-color: #f2f2f2;
							width: 400px;
							min-width: 400px;
						}
					</style>
				</head>
				<body>
					<div class="container">
						<h1 class="text-3xl font-semibold text-gray-800">Learn Sharp  - Payment Notification</h1>
						<p>Thank you for selecting Learn Sharp  as your trusted partner for your tutoring requirements. This notification contains crucial information regarding your payment through SSLCommerz, our reputable payment gateway partner. Upon your confirmation, you will receive a confirmation email containing a unique transaction ID mentioned in this email for reference.</p>
						<p class="text-2xl font-semibold text-gray-800">Here are the details of your payment:</p>
						<table>
							<tr>
								<th>Payment ID</th>
								<td>${_id}</td>
							</tr>
							<tr>
								<th>Transaction ID</th>
								<td>${transactionID}</td>
							</tr>
							<tr>
								<th>Tuition ID</th>
								<td>${tuitionId}</td>
							</tr>
							<tr>
								<th>Tutor Name</th>
								<td>${tutor_name}</td>
							</tr>
							<tr>
								<th>Tutor Email</th>
								<td>${tutor_email}</td>
							</tr>
							<tr>
								<th>Subject Name</th>
								<td>${subject_name}</td>
							</tr>
							<tr>
								<th>Class Name</th>
								<td>${class_name}</td>
							</tr>
							<tr>
								<th>Payment Amount</th>
								<td>${payment_amount}</td>
							</tr>
							<tr>
								<th>Payment Month</th>
								<td>${payment_month}</td>
							</tr>
							<tr>
								<th>Payment Date</th>
								<td>${paymentDate}</td>
							</tr>
							<tr>
								<th>Payment Time</th>
								<td>${paymentTime}</td>
							</tr>
						</table>
						<p>We appreciate your trust in Learn Sharp  and look forward to delivering exceptional tutoring services to support your educational journey. Rest assured, your investment in education is a step towards a brighter future.</p>
						<br/>
						<p>Kind Regards,</p>
						<p>The Learn Sharp  Team</p>
					</div>
				</body>
				</html>
			`,
    };
		
		const tutorPaymentNotificationEmail = {
      to: tutor_email,
      from: '"Learn Sharp " <mamun.bbn.bd@gmail.com>', // sender information
      subject: "Learn Sharp  - Payment Notification",
      html: `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Learn Sharp  - Payment Notification</title>
					<style>
						body {
							font-family: Arial, sans-serif;
							margin: 0;
							padding: 0;
							background-color: #005e6b; /* Teal-900 background */
						}
						.container {
							padding: 20px;
							background-color: #ffffff;
							box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
						}
						h1 {
							color: #333;
						}
						table {
							width: auto;
							border-collapse: collapse;
							margin-top: 20px;
						}
						th, td {
							padding: 10px;
							border: 1px solid #8c8c8c;
						}
						th {
							text-align: center;
							background-color: #d9d9d9;
							color: #000;
						}
						td {
							text-align: left;
							background-color: #f2f2f2;
							width: 400px;
							min-width: 400px;
						}
					</style>
				</head>
				<body>
					<div class="container">
						<h1 class="text-3xl font-semibold text-gray-800">Learn Sharp  - Payment Notification</h1>
						<p>We're pleased to inform you that a payment attempt has been made through Learn Sharp 's platform by one of your students named ${student_name} for your tutoring services for "${subject_name}" subject. As a dedicated tutor with Learn Sharp , we want to keep you informed about the transaction details. Upon the confirmation of the payment by ${student_name}, you will receive a confirmation email containing a unique transaction ID mentioned in this email for reference.</p>
						<p class="text-2xl font-semibold text-gray-800">Here are the Transaction Details:</p>
						<table>
							<tr>
								<th>Payment ID</th>
								<td>${_id}</td>
							</tr>
							<tr>
								<th>Transaction ID</th>
								<td>${transactionID}</td>
							</tr>
							<tr>
								<th>Tuition ID</th>
								<td>${tuitionId}</td>
							</tr>
							<tr>
								<th>Student Name</th>
								<td>${student_name}</td>
							</tr>
							<tr>
								<th>Student Email</th>
								<td>${student_email}</td>
							</tr>
							<tr>
								<th>Subject Name</th>
								<td>${subject_name}</td>
							</tr>
							<tr>
								<th>Class Name</th>
								<td>${class_name}</td>
							</tr>
							<tr>
								<th>Payment Amount</th>
								<td>${payment_amount}</td>
							</tr>
							<tr>
								<th>Payment Month</th>
								<td>${payment_month}</td>
							</tr>
							<tr>
								<th>Payment Date</th>
								<td>${paymentDate}</td>
							</tr>
							<tr>
								<th>Payment Time</th>
								<td>${paymentTime}</td>
							</tr>
						</table>
						<p>Your commitment to education and sharing your knowledge is highly appreciated, and we look forward to your continued support in helping our students achieve their academic goals.</p>
						<p>Thank you for being a part of the Learn Sharp  team. We greatly value your contributions to our educational community and look forward to a successful tutoring partnership.</p>
						<br/>
						<p>Kind Regards,</p>
						<p>The Learn Sharp  Team</p>
					</div>
				</body>
				</html>
			`,
    };

		// Send the payment notification to the student
		await transporter.sendMail(studentPaymentNotificationEmail);

		// Send the payment notification to the tutor
		await transporter.sendMail(tutorPaymentNotificationEmail);

		return NextResponse.json({ message: "Email Sent Successfully!" }, { status: 200 });
	} 
	catch (error) {
		return NextResponse.json({ message: "Failed to Send Email!" }, { status: 500 });
	}
}
