-- AlterTable: add soft-delete column to all managed entities
ALTER TABLE "Certificacao" ADD COLUMN "deletadoEm" TIMESTAMP(3);
ALTER TABLE "Cidade" ADD COLUMN "deletadoEm" TIMESTAMP(3);
ALTER TABLE "Anexo" ADD COLUMN "deletadoEm" TIMESTAMP(3);
ALTER TABLE "Classificacao" ADD COLUMN "deletadoEm" TIMESTAMP(3);
