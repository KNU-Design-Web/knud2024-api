export class ConfigService {
    constructor() {
        this.REGION = process.env.AWS_REGION;

        this.BUCKET_NAME = process.env.BUCKET_NAME;
        this.WHITELIST_PATH = "whitelist.json";

        this.EMAIL_SENDER_ADDRESS = process.env.EMAIL_SENDER_ADDRESS;
        this.EMAIL_MAGIC_LINK_REDIRECT_URL = process.env.EMAIL_MAGIC_LINK_REDIRECT_URL;

        this.JWT_SECRET = process.env.JWT_SECRET;
        this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
    }
}
