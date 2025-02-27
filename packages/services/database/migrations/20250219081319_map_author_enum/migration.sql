/*
  Warnings:

  - The values [USER,ASSISTANT] on the enum `Author` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Author_new" AS ENUM ('user', 'assistant');
ALTER TABLE "Message" ALTER COLUMN "author" TYPE "Author_new" USING ("author"::text::"Author_new");
ALTER TYPE "Author" RENAME TO "Author_old";
ALTER TYPE "Author_new" RENAME TO "Author";
DROP TYPE "Author_old";
COMMIT;
