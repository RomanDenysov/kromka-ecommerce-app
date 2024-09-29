import nodemailer from 'nodemailer'
import {env} from '~/env'

export enum EmailType {
	ORDER = 'objednavka',
	NEWSLETTER = 'newsletter',
	INTERNAL = 'internal',
}

function createTransporter(user: EmailType) {
	const transporter = nodemailer.createTransport({
		host: env.EMAIL_HOST,
		port: 465,
		secure: true,
		auth: {
			user: `${user}@pekarenkromka.sk`,
			pass: env.EMAIL_PASS,
		},
	})

	return transporter
}

export const sendEmail = async (
	user: EmailType,
	to: string | string[],
	subject: string,
	html: string,
) => {
	const transporter = createTransporter(user)

	await transporter.sendMail({
		from: `${user}@pekarenkromka.sk`,
		to,
		subject,
		html,
	})
}
