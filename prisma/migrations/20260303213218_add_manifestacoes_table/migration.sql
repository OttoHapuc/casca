-- CreateTable
CREATE TABLE "ManifestacaoOuvidoria" (
    "id" TEXT NOT NULL,
    "anonimo" BOOLEAN NOT NULL,
    "nome" TEXT,
    "tipo" TEXT NOT NULL,
    "cidadeServico" TEXT NOT NULL,
    "dataOcorrido" TEXT,
    "descricao" TEXT NOT NULL,
    "persiste" TEXT,
    "desejaRetorno" BOOLEAN NOT NULL,
    "meioContato" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pendente',
    "observacaoAdmin" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManifestacaoOuvidoria_pkey" PRIMARY KEY ("id")
);
