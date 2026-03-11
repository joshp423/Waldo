-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Targets" (
    "id" SERIAL NOT NULL,
    "imageurl" TEXT NOT NULL,
    "gameid" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    CONSTRAINT "Targets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" SERIAL NOT NULL,
    "gameid" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_username_key" ON "Leaderboard"("username");

-- AddForeignKey
ALTER TABLE "Targets" ADD CONSTRAINT "Targets_gameid_fkey" FOREIGN KEY ("gameid") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_gameid_fkey" FOREIGN KEY ("gameid") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
