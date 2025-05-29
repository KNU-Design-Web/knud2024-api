import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export class S3Service {
    static WHITELIST_PATH = "whitelist.json";

    constructor(configService) {
        this.configService = configService;
        this.s3Client = new S3Client({ region: this.configService.REGION });
    }

    async isInWhiteList(email) {
        const getObjectCommandParams = {
            Bucket: this.configService.BUCKET_NAME,
            Key: this.configService.WHITELIST_PATH,
        };

        const command = new GetObjectCommand(getObjectCommandParams);
        const response = await this.s3Client.send(command);
        const body = await response.Body.transformToString("utf-8");

        const whitelist = JSON.parse(body);
        return whitelist.includes(email);
    }
}
