-- CreateTable
CREATE TABLE "Ouvidoria" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "planilhaUrl" TEXT,
    "campos" JSONB NOT NULL,
    "tipo" JSONB NOT NULL,
    "meioContato" JSONB NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ouvidoria_pkey" PRIMARY KEY ("id")
);
