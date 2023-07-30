/*
  Warnings:

  - You are about to drop the `healthProblem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "healthProblem" DROP CONSTRAINT "healthProblem_clientId_fkey";

-- DropTable
DROP TABLE "healthProblem";

-- CreateTable
CREATE TABLE "healthproblem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "degree" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "healthproblem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "healthproblem" ADD CONSTRAINT "healthproblem_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
