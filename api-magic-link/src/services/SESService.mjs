import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import jwt from "jsonwebtoken";

export class SESService {
    constructor(s3Service, configService, email) {
        this.email = email;

        this.s3Service = s3Service;
        this.configService = configService;

        this.sesClient = new SESClient({
            region: this.configService.REGION,
        });
    }

    async signJWT() {
        const isInWhiteList = await this.s3Service.isInWhiteList(this.email);

        if (!isInWhiteList) return null;

        const payload = { email: this.email };
        return jwt.sign(payload, this.configService.JWT_SECRET, { expiresIn: this.configService.JWT_EXPIRES_IN });
    }

    async createMagicLink() {
        const jwtToken = await this.signJWT();
        if (!jwtToken) return null;

        return `${this.configService.EMAIL_MAGIC_LINK_REDIRECT_URL}?token=${jwtToken}`;
    }

    async sendMagicLink() {
        const magicLink = await this.createMagicLink();

        const sendEmailCommandParams = {
            Source: this.configService.EMAIL_SENDER_ADDRESS,
            Destination: { ToAddresses: [this.email] },
            Message: {
                Subject: {
                    Data: "[KNUD 2024] 로그인을 위한 링크입니다",
                    Charset: "utf-8",
                },
                Body: {
                    Text: {
                        Data: `안녕하세요, KNUD 2024입니다.\n\n로그인을 위한 링크를 보내드립니다.\n\n링크: ${magicLink}`,
                        Charset: "utf-8",
                    },
                },
            },
        };

        const command = new SendEmailCommand(sendEmailCommandParams);
        return this.sesClient.send(command);
    }
}
