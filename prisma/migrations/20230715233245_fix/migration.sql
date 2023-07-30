/*
  Warnings:

  - You are about to drop the column `healthProblem` on the `client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "client" DROP COLUMN "healthProblem";

-- CreateTable
CREATE TABLE "healthProblem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "degree" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "healthProblem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "healthProblem" ADD CONSTRAINT "healthProblem_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
