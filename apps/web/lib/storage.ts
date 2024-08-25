import { AwsClient } from "aws4fetch";

class StorageClient {
  private static client: AwsClient | null = null;

  private constructor() {
    // Private constructor so that nobody can create object outside of the class
  }

  static getInstance () {
    if (!this.client) {
      this.client = new AwsClient({
        accessKeyId: "test",
        secretAccessKey: "test",
        region: "auto",
        service: "s3"
      });
    }

    return this.client;
  }

  public async upload(key: string, flie: any) {
    // TODO: add logic to upload a file
  }
}

export const storage = StorageClient.getInstance();