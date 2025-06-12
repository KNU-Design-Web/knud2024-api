import { DynamoDBClient, ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const sourceClient = new DynamoDBClient({ region: "us-east-1" });
const targetClient = new DynamoDBClient({ region: "ap-northeast-2" });

const sourceDocumentClient = DynamoDBDocumentClient.from(sourceClient);
const targetDocumentClient = DynamoDBDocumentClient.from(targetClient);

const SOURCE_TABLE = "GuestBookTableV2";
const TARGET_TABLE = "knud-guestbook-db";

async function migrateData() {
    const sourceScanCommand = new ScanCommand({ TableName: SOURCE_TABLE });

    const data = await sourceDocumentClient.send(sourceScanCommand);

    for (const item of data.Items ?? []) {
        await targetDocumentClient.send(
            new PutItemCommand({
                TableName: TARGET_TABLE,
                Item: item,
            })
        );
    }
}

migrateData();
