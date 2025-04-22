import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
	try {
		const { name, to, subject, message, from } = await request.json();

		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.NODEMAILER_EMAIL,
				pass: process.env.NODEMAILER_PASSWORD,
			},
		});

		const mailOptionTo = {
      to,
      from: '"Learn Sharp " <mamun.bbn.bd@gmail.com>', // sender information
      subject: "Learn Sharp  - Contact Confirmation",
      html: `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Learn Sharp  - Contact Confirmation</title>
					<style>
						/* Add your CSS styles here */
						body {
							font-family: Arial, sans-serif;
							margin: 0;
							padding: 0;
							background-color: #005e6b; /* Teal-900 background */
						}
						.container {
							max-width: 600px;
							margin: 0 auto;
							padding: 20px;
							background-color: #ffffff;
							box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
						}
						h1 {
							color: #333;
						}
						table {
							width: 100%;
							border-collapse: collapse;
							margin-top: 20px;
						}
						th, td {
							padding: 10px;
							text-align: left;
							border-bottom: 1px solid #ddd;
						}
						th {
							background-color: #00796b; /* Teal-600 */
							color: #fff;
						}
						td {
							background-color: #f3f3f3;
						}
					</style>
				</head>
				<body>
					<div class="container">
						<h1 class="text-3xl font-semibold text-gray-800">Learn Sharp  - Contact Confirmation 😊</h1>
						<h2>Thank you so much for contacting us. We will get to you as soon as we can.</h2>
						<h2 class="text-2xl font-semibold text-gray-800">You sent the following email to Learn Sharp :</h2>
						<table>
							<tr>
								<th>Name</th>
								<td>${name}</td>
							</tr>
							<tr>
								<th>Subject</th>
								<td>${subject}</td>
							</tr>
							<tr>
								<th>Email</th>
								<td>${to}</td>
							</tr>
							<tr>
								<th>Message</th>
								<td>${message}</td>
							</tr>
						</table>
					</div>
				</body>
				</html>
			`,
    };
		
		const mailOptionFrom = {
      to: "mamun.bbn.bd@gmail.com",
      from: '"Learn Sharp " <mamun.bbn.bd@gmail.com>', // sender information
      subject: "Learn Sharp  - New Contact",
      html: `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Learn Sharp  - New Contact</title>
					<style>
						/* Add your CSS styles here */
						body {
							font-family: Arial, sans-serif;
							margin: 0;
							padding: 0;
							background-color: #005e6b; /* Teal-900 background */
						}
						.container {
							max-width: 600px;
							margin: 0 auto;
							padding: 20px;
							background-color: #ffffff;
							box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
						}
						h1 {
							color: #333;
						}
						table {
							width: 100%;
							border-collapse: collapse;
							margin-top: 20px;
						}
						th, td {
							padding: 10px;
							text-align: left;
							border-bottom: 1px solid #ddd;
						}
						th {
							background-color: #00796b; /* Teal-600 */
							color: #fff;
						}
						td {
							background-color: #f3f3f3;
						}
					</style>
				</head>
				<body>
					<div class="container">
						<h1 class="text-3xl font-semibold text-gray-800">Learn Sharp  - New Contact</h1>
						<p class="text-lg text-gray-700">You've received a new contact email from ${from}.</p>
						<p class="text-lg text-gray-700">Please contact him soon.</p>
						<table>
							<tr>
								<th>Name</th>
								<td>${name}</td>
							</tr>
							<tr>
								<th>Subject</th>
								<td>${subject}</td>
							</tr>
							<tr>
								<th>Email</th>
								<td>${to}</td>
							</tr>
							<tr>
								<th>Message</th>
								<td>${message}</td>
							</tr>
						</table>
					</div>
				</body>
				</html>
			`,
    };

		// Send the email to the "to" address
		await transporter.sendMail(mailOptionTo);

		// Send the email to the "from" address
		await transporter.sendMail(mailOptionFrom);

		return NextResponse.json({ message: "Email Sent Successfully!" }, { status: 200 });
	} 
	catch (error) {
		return NextResponse.json({ message: "Failed to Send Email!" }, { status: 500 });
	}
}
