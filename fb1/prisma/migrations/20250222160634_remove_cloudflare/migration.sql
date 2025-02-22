-- CreateTable
CREATE TABLE "PDF" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "pages" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shareId" TEXT NOT NULL,
    "viewId" TEXT NOT NULL,

    CONSTRAINT "PDF_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PDF_shareId_key" ON "PDF"("shareId");

-- CreateIndex
CREATE UNIQUE INDEX "PDF_viewId_key" ON "PDF"("viewId");
