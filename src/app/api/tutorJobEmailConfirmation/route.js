import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
	try {
		const { name, to, subject, message } = await request.json();

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
      subject,
      html: `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Learn Sharp  - Confirmation for Tutor Request</title>
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
						<h1 class="text-3xl font-semibold text-gray-800">Learn Sharp  - Confirmation for Tutor Request!</h1>
						<h3>Hello! My name is ${name}.</h3>
						<h3>${message}</h3>
						<h3>I will be waiting to hear from you soon.</h3>
						<h3>Thank you.</h3>
					</div>
				</body>
				</html>
			`,
    };

		// Send the email to the "to" address
		await transporter.sendMail(mailOptionTo);

		return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
	} 
	catch (error) {
		return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 });
	}
}
