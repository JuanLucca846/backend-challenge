-- DropForeignKey
ALTER TABLE "healthproblem" DROP CONSTRAINT "healthproblem_clientId_fkey";

-- AddForeignKey
ALTER TABLE "healthproblem" ADD CONSTRAINT "healthproblem_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
