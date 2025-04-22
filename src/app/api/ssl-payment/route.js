// import SSLCommerzPayment from "sslcommerz-lts";
import { NextResponse } from "next/server";
import { uid } from "uid";
const SSLCommerzPayment = require('sslcommerz-lts');
import "dotenv/config";
import connect from "@/utils/db";
import { Payments } from "@/models/Payments";

export async function POST(request) {
	try {

		await connect();

		const {
			tuitionId,
			tutor_name,
			tutor_email,
			payment_amount,
			subject_name,
			class_name,
			student_name,
			student_email,
			student_location,
			student_mobile_number,
			payment_status,
			payment_month,
		} = await request.json();
		// console.log("payment: ", payment);
		const transactionID = uid(25);

		const payment = {
			transactionID: transactionID,
			tuitionId: tuitionId,
			tutor_name: tutor_name,
			tutor_email: tutor_email,
			subject_name: subject_name,
			class_name: class_name,
			student_name: student_name,
			student_email: student_email,
			payment_amount: payment_amount,
			student_mobile_number: student_mobile_number,
			student_location: student_location,
			payment_status: payment_status,
			payment_month: payment_month,
		};

		const newPayment = new Payments(payment);
		const savedPaymentInformation = await newPayment.save();

		const data = {
			total_amount: payment_amount,
			currency: "BDT",
			tran_id: transactionID, // use unique tran_id for each api call
			success_url: `${process.env.EXPRESS_PUBLIC_API_URL}/payment/success/${transactionID}`,
			fail_url: `${process.env.EXPRESS_PUBLIC_API_URL}/payment/fail/${transactionID}`,
			cancel_url: `${process.env.EXPRESS_PUBLIC_API_URL}/payment/cancel/${transactionID}`,
			ipn_url: `${process.env.EXPRESS_PUBLIC_API_URL}/payment/ipn`,
			product_name: subject_name,
			product_category: class_name,
			cus_name: student_name,
			cus_email: student_email,
			cus_phone: student_mobile_number,
			student_location: student_location,
			student_country: "Bangladesh",
			tuitionId: tuitionId,
			tutor_name: tutor_name,
			tutor_email: tutor_email,
			payment_status: payment_status,
			payment_month: payment_month,
			shipping_method: "No",
			ship_name: student_name,
			product_profile: "general",
		};

		const store_id = process.env.SSLCOMMERZ_STORE_ID; 
		const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
		const is_live = false; // true for live, false for sandbox

		const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

		try {
			const apiResponse = await sslcz.init(data);
			const GatewayPageURL = apiResponse.GatewayPageURL;
			// console.log("GatewayPageURL: ", GatewayPageURL);
			return NextResponse.json(
				{ url: GatewayPageURL, payment: savedPaymentInformation },
				{ status: 200 }
			);
		} 
		catch (error) {
			console.error("Error initiating payment: ", error);
			return NextResponse.json(
				{ message: "Failed to initiate payment!" },
				{ status: 500 }
			);
		}

	}
	catch (error) {
		return NextResponse.json(
			{ message: "Failed to initiate payment!" },
			{ status: 500 }
		);
	}
}