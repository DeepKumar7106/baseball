-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "senderID" TEXT NOT NULL,
    "receiverID" TEXT NOT NULL,
    CONSTRAINT "Friendship_senderID_fkey" FOREIGN KEY ("senderID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Friendship_receiverID_fkey" FOREIGN KEY ("receiverID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "winningPlayerID" TEXT,
    CONSTRAINT "Game_winningPlayerID_fkey" FOREIGN KEY ("winningPlayerID") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Players" (
    "playerID" TEXT NOT NULL,
    "gameID" TEXT NOT NULL,

    PRIMARY KEY ("playerID", "gameID"),
    CONSTRAINT "Players_playerID_fkey" FOREIGN KEY ("playerID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Players_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Score" (
    "playerID" TEXT NOT NULL,
    "gameID" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inningNumber" INTEGER NOT NULL,
    "ballsPlayed" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,

    PRIMARY KEY ("playerID", "gameID"),
    CONSTRAINT "Score_playerID_fkey" FOREIGN KEY ("playerID") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Score_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Friendship_senderID_idx" ON "Friendship"("senderID");

-- CreateIndex
CREATE INDEX "Friendship_receiverID_idx" ON "Friendship"("receiverID");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_senderID_receiverID_key" ON "Friendship"("senderID", "receiverID");

-- CreateIndex
CREATE INDEX "Game_id_idx" ON "Game"("id");

-- CreateIndex
CREATE INDEX "Players_playerID_idx" ON "Players"("playerID");

-- CreateIndex
CREATE INDEX "Score_playerID_idx" ON "Score"("playerID");

-- CreateIndex
CREATE INDEX "Score_gameID_idx" ON "Score"("gameID");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");
